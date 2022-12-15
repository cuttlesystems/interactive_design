<template>
    <div ref="flowChartSideBar" class="messenger-flowchart-sidebar">
        <div class="tab-content scrollable-area">

            <h5 class="sidebar-options-title sidebar-only">
                {{__('Сообщение')}}
            </h5>
            <div class="sidebar-options-title__field">
                <Input 
                    :disabled="notEditMessageName"
                    :placeholder="__('Введите название сообщений')"
                    :value="newMessageName"
                    @onChange="newMessageNameHandler"
                /> 
                <button
                    :disabled="notEditMessageName"
                    :style="{ opacity: notEditMessageName ? 0.5 : 1 }"
                    class="sidebar-form__append"  
                    @click="setMessageNameHandler">
                    {{__('Установить название сообщений')}}
                </button>
            </div>
            <form ref="optionsForm" class="sidebar-form not-allowed">

                <div class="sidebar-form__options">
                    <ul v-if="optionsListTemp.length || EDIT_CONSTRUCTOR_FORM" class="sidebar-form__options-list">
                        <li v-for="option of (EDIT_CONSTRUCTOR_FORM ? currentMessage.current_variants : optionsListTemp)" 
                        :key="option.id" 
                        class="sidebar-form__options-item">
                            <span>{{__(option.text)}}</span>
                            <SvgIcon nameId="delete" @click.stop.prevent="optionDeleteHandler(option)" />
                        </li>
                    </ul>
                    <Input
                        :disabled="notAllowedTypeOptions" 
                        :placeholder="__('Введите название варианта')"
                        :value="newOptionName"
                        @onChange="optionOnChangeHandler"
                    />
                    <button 
                        :disabled="notAllowedTypeOptions"
                        :style="{ opacity: notAllowedTypeOptions ? 0.5 : 1 }"
                        class="sidebar-form__append"  
                        @click.prevent="addNewOption" title="Заполните сначало название сообщений">
                        {{__('Добавить')}}
                    </button>
                </div>

            </form>

        </div>
        <div class="sidebar-options-foot">
            <button class="green__btn-success" @click.prevent="completeForm">
                {{__('Применить')}}
            </button>
            <button :disabled="!EDIT_CONSTRUCTOR_FORM" :style="{cursor: EDIT_CONSTRUCTOR_FORM ?  'pointer': 'not-allowed'}" class="red__btn" @click.prevent="deleteConstructorHandler">
                {{__('Удалить')}}
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>    // FIX RESET STATE && BLOCK BUTTON NOT ALLOWED CLASS
import useVuelidate from "@vuelidate/core";
import { computed, onMounted, onUpdated, Ref, ref, unref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "~/store";
import { ActionTypes } from "~/store/modules/action-types";
import { MutationTypes } from "~/store/modules/mutations-types";
import { Input } from "../inputs";
import { notify } from "@kyvg/vue3-notification";
import { SvgIcon } from "../globals";

// HOOKS
const store = useStore()
const v$ = useVuelidate()
const route = useRoute()

// STATE
const newOptionName = ref('')
const newMessageName = ref('')

const EDIT_CONSTRUCTOR_FORM = computed(() => store.state.messagesReducer.EDIT_CONSTRUCTOR_FORM) 
const optionsListTemp = computed(() => store.state.messagesReducer.optionsListTemp)
const newMessage = computed(() => store.state.messagesReducer.newMessage)                   // TEMP CONSTRUCTOR

const currentMessage = computed(() => store.getters[`messagesReducer/getCurrentMessage`])   // AFTER FETCH

const notAllowedTypeOptions = ref(true);
const notEditMessageName = ref(false)

//NODE
const flowChartSideBar = ref();
const optionsForm: Ref< null | HTMLFormElement > = ref(null)
const shadowLayer: Ref<HTMLDivElement | null> = ref(null)

//LIFE CYCLE
onMounted(() => {
    
    
    shadowLayer.value = document.querySelector('.shadow__layer');
    console.log('displayed')
});

//WATCHERS

watch(() => currentMessage,     // SET INITIALS
    (curVal, preVal) => {
        if(EDIT_CONSTRUCTOR_FORM.value){
            newMessageName.value = currentMessage.value.text;
            afterSetMessageName();
        }
    },
    {
        deep: true
    }
)

// METHODS
const newMessageNameHandler = (val) => {
    
    newMessageName.value = val

}
function optionOnChangeHandler(val) {
    
    newOptionName.value = val

}

function addNewOption() {   // Message ID Validate

    if(newOptionName.value){    // OPTION MESSAGE
        store.dispatch('messagesReducer/' + ActionTypes.CREATE_NEW_OPTION, newOptionName.value);    // CURRENT MESSAGE
        
        // newOptionName.value = '';
        v$.value.$reset();
    }
    
}
function setMessageNameHandler() {

    if(!notEditMessageName.value){

        v$.value.$touch();

        if(newMessageName.value && !EDIT_CONSTRUCTOR_FORM.value){
    
            store.dispatch('messagesReducer/' + ActionTypes.CREATE_MESSAGE, {
                            botID: route.query.id,
                            messageCred: {
                                text:  newMessageName.value,
                                coordinate_x: newMessage.value!.coordinate_x,
                                coordinate_y: newMessage.value!.coordinate_y
                            }
                    }).then((res) => {
                        
                        afterSetMessageName()
                        
                    }).catch((err) => {
                        notify({
                            group: 'app',
                            type: 'error',
                            title: 'Ошибка',
                        });
                        throw new Error(err)
                    })
    
        } else if(EDIT_CONSTRUCTOR_FORM.value) {

            store.dispatch( 'messagesReducer/' + ActionTypes.UPDATE_CONSTRUCTOR, {
                ...currentMessage.value,
                text: newMessageName.value,
            }).then((res) => {
                
                afterSetMessageName();

            }).catch((err) => {
                notify({
                    group: 'app',
                    type: 'error',
                    title: 'Ошибка',
                })
                throw new Error(err)
            })

        }

    }

}

function afterSetMessageName () {
    notAllowedTypeOptions.value = false;
    optionsForm.value!.classList.remove('not-allowed');
    // NOT ALLOW CREATE NEW MESSAGE
    notEditMessageName.value = true;
}

function resetAllState () {
    flowChartSideBar.value.classList.toggle('opened-sidebar');
    
    newMessageName.value = '';
    newOptionName.value = '';
    (shadowLayer.value as HTMLDivElement).style.display = 'none';

    notAllowedTypeOptions.value = true;
    notEditMessageName.value = false;
    store.commit('messagesReducer/' + MutationTypes.RESET_CURRENT_MESSAGE);         // ALSO RESET NEW MESSAGE

    optionsForm.value!.classList.remove('not-allowed');
    v$.value.$reset();
    store.commit('messagesReducer/' + MutationTypes.IS_BLOCK_SIDEBAR, false);
    store.commit('messagesReducer/' + MutationTypes.RESET_TEMP_OPTIONS_LIST);
    store.commit('messagesReducer/' + MutationTypes.EDIT_CONSTRUCTOR_FORM, false);
    
    document.querySelector('.op-error')?.classList.remove('op-error');
}

async function completeForm(ev) { // COMPLETE FLOW
    const isValid = await v$.value.$validate()
    if(isValid) {

        // store.commit('messagesReducer/' + MutationTypes.SET_NEW_MESSAGE, newMessageName.value);
        
        resetAllState()
    }
    
}

function deleteConstructorHandler() {   // TRACK THAT CURRENT MESSAGE DO NOT MIX UP WHEN FIRST CREATED

    store.dispatch( 'messagesReducer/' + ActionTypes.DELETE_CONSTRUCTOR, currentMessage.value.id)
        .then((res) => {

            resetAllState();

        }).catch(() => {
            resetAllState();
            notify({
                group: 'app',
                type: 'error',
                title: 'Ошибка',
            })
        })
    
}

function optionDeleteHandler(option) {
    store.dispatch('messagesReducer/' + ActionTypes.DELETE_OPTION, option)
}


</script>

<style lang="scss">

     /* SIDEBAR LAYER */
    .sidebar-options-title__field{
        margin-bottom: 25px;
    }
    @include b(messenger-flowchart-sidebar) {
        background: #f5f7f7;
        -webkit-box-shadow: 0 1px 2px rgb(0 0 0 / 12%);
        box-shadow: 0 1px 2px rgb(0 0 0 / 12%);
        z-index: 1001;
        -webkit-transition: all 90ms ease-in-out 45ms;
        transition: all 90ms ease-in-out 45ms;
        width: 0;
        max-width: 0;
        position: fixed;
        height: calc(100vh - 75px);
        right: 0;
        overflow: hidden;
        top: 75px;
        padding-bottom: 65px;

        &.opened-sidebar{
            width: 500px;
            max-width: 90%;
            overflow: visible;
        }

        & .scrollable-area{
            background: #f5f7f7;
            max-height: 100%;
            overflow-y: auto;
            position: relative;
            padding: 12px 28px 20px;
            width: 100%;
            height: calc(100vh - 75px );
            z-index: 15;
        }

        .sidebar-options-title{
            text-transform: uppercase;
            font-weight: 700;
            color: #1cacb4;
            padding-bottom: 7px;
            border-bottom: 2px solid rgba(28,172,180,.6);
            margin-top: 5px;
            margin-bottom: 20px;
            font-size: 13px;
        }

        .sidebar-options-foot{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 12px 28px;
            
            display: flex;
            justify-content: space-between;
        }

        .sidebar-form{
            margin-bottom: 0;
            &.not-allowed button {
                cursor: not-allowed !important;
            }
            &__options-list{
                margin: -1px 0 0;
            }
            &__options-item {
                margin: 0 0 -1px;
                border: 1px solid #d6e3e3;
                color: #333;
                width: 100%;
                text-align: left;
                padding: 8px 10px 10px;
                background-color: #fbfcfc;
                font-size: 12px;
                -webkit-transition-duration: .25s;
                transition-duration: .25s;
                position: relative;
                word-wrap: break-word;
                max-width: 100%;

                display: flex;
                justify-content: space-between;

                & svg {
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                }
            }
            
            &__append {
                    display: block;
                    width: 100%;
                    text-align: center;
                    font-size: 15px;
                    border: 1px dashed #d6e3e3;
                    border-radius: 0 0 4px 4px;
                    -webkit-box-shadow: none;
                    box-shadow: none;
                    font-weight: 400;
                    color: #688fa1;
                    outline: 0;
                    background-color: #fbfcfc;
                    -webkit-transition-duration: .25s;
                    transition-duration: .25s;
                    padding-bottom: 12px;
                    padding-top: 10px;
                    margin-top: -1px;
                    &:hover:active {
                        color: #5c6a70;
                        background-color: transparent;
                        border-color: #8aafaf;
                    }
            }
        }
    }
</style>