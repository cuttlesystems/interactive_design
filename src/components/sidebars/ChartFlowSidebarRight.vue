<template>
    <div ref="flowChartSideBar" class="messenger-flowchart-sidebar">

        <div class="tab-content scrollable-area">

            <h5 class="sidebar-options-title sidebar-only">
                {{__('Сообщение')}}
            </h5>
            <div class="sidebar-options-title__field">
                <div>
                    <Input 
                        :disabled="notEditMessageName"
                        :placeholder="__('Введите название сообщений')"
                        :value="newMessageName"
                        @onChange="newMessageNameHandler"
                    /> 
                    <span class="edit__title" @click="editHandler">
                        {{__('Редактировать')}}
                    </span>
                </div>
                <button
                    :disabled="notEditMessageName || !newMessageName"
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
                        :notAllowValidation="notAllowValidation"
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

            <div class="first-message">

                <span>{{__('Стартовый сообщение')}}: </span>

                <label class="is__first-message">

                    <input type="checkbox" @change="setAsFirstMessage" :checked="isFirstMesssage" :disabled="!EDIT_CONSTRUCTOR_FORM" />

                    <SvgIcon nameId="checkmark"></SvgIcon>

                </label>

            </div>

            <div class="keyboard-type">
                    <span class="keyboard-type__title">{{__('Тип клавиатуры')}}:</span>
                    
                    <label class="keyboard-type__item"  v-for="keyboard of keyboards" :key="keyboard.id">

                        <span>{{keyboard.name}}</span>

                        <input type="radio" name="keyboard-type__group" :value="keyboard.name" v-model="keyboardComputed" />

                        <SvgIcon nameId="radio-btn"></SvgIcon>
                        
                    </label>
            </div>

            <div class="upload-file" ref="uploadContainer">

                <label for="upload-file__input" class="upload-file__label">

                    <SvgIcon nameId="attachment" />

                    <span>
                        {{__('Прикрепить файл')}}
                    </span>

                </label>

                <input id="upload-file__input" type="file" @change="uploadHandler"  />

                <div v-if="uploadResult" class="image-container">

                    <img :src="uploadResult" />

                    <svg @click="deleteImageHandler" class="image-container__close" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.17495 5.99999L10.7583 2.42499C10.9152 2.26807 11.0034 2.05524 11.0034 1.83333C11.0034 1.61141 10.9152 1.39858 10.7583 1.24166C10.6014 1.08474 10.3885 0.996582 10.1666 0.996582C9.9447 0.996582 9.73187 1.08474 9.57495 1.24166L5.99995 4.82499L2.42495 1.24166C2.26803 1.08474 2.0552 0.996582 1.83328 0.996582C1.61136 0.996582 1.39854 1.08474 1.24162 1.24166C1.0847 1.39858 0.996539 1.61141 0.996539 1.83333C0.996539 2.05524 1.0847 2.26807 1.24162 2.42499L4.82495 5.99999L1.24162 9.57499C1.16351 9.65246 1.10151 9.74463 1.05921 9.84618C1.0169 9.94773 0.995117 10.0566 0.995117 10.1667C0.995117 10.2767 1.0169 10.3856 1.05921 10.4871C1.10151 10.5887 1.16351 10.6809 1.24162 10.7583C1.31908 10.8364 1.41125 10.8984 1.5128 10.9407C1.61435 10.983 1.72327 11.0048 1.83328 11.0048C1.94329 11.0048 2.05221 10.983 2.15376 10.9407C2.25531 10.8984 2.34748 10.8364 2.42495 10.7583L5.99995 7.17499L9.57495 10.7583C9.65242 10.8364 9.74459 10.8984 9.84614 10.9407C9.94768 10.983 10.0566 11.0048 10.1666 11.0048C10.2766 11.0048 10.3855 10.983 10.4871 10.9407C10.5886 10.8984 10.6808 10.8364 10.7583 10.7583C10.8364 10.6809 10.8984 10.5887 10.9407 10.4871C10.983 10.3856 11.0048 10.2767 11.0048 10.1667C11.0048 10.0566 10.983 9.94773 10.9407 9.84618C10.8984 9.74463 10.8364 9.65246 10.7583 9.57499L7.17495 5.99999Z" fill="#8F9BB3"/>
                    </svg>

                </div>

            </div>

        </div>

        <div class="sidebar-options-foot">
            <button 
            :disabled="allowApplyForm"
            :style="{cursor: allowApplyForm ?  'not-allowed': 'pointer'}"
            class="green__btn-success" 
            @click.prevent="completeForm">
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

/*
    keyboard_type -> RKB, IKB -> radio
    start_message -> messageId
    
*/

// HOOKS
const store = useStore()
const v$ = useVuelidate()
const route = useRoute()

// STATE
const newOptionName = ref('')
const newMessageName = ref('')

const fileUpload: Ref<Blob | null> = ref(null)
const uploadResult = ref(null)

const EDIT_CONSTRUCTOR_FORM = computed(() => store.state.messagesReducer.EDIT_CONSTRUCTOR_FORM) 
const optionsListTemp = computed(() => store.state.messagesReducer.optionsListTemp)
const newMessage = computed(() => store.state.messagesReducer.newMessage)                   // TEMP CONSTRUCTOR

const currentMessage = computed(() => store.getters[`messagesReducer/getCurrentMessage`])   // AFTER FETCH
const isFirstMesssage = computed(() => store.state.botsReducer.currentBot.start_message == currentMessage.value?.id)

const notAllowedTypeOptions = ref(true)
const notEditMessageName = ref(false)


//NODE
const flowChartSideBar = ref();
const optionsForm: Ref< null | HTMLFormElement > = ref(null)
const shadowLayer: Ref< HTMLDivElement | null > = ref(null)
const uploadContainer: Ref< HTMLDivElement | null > = ref(null)
const notAllowValidation = ref(true)
// const closeIconSVGElement = ref()

const keyboards = ref([
    {
        id: 1,
        name: 'IKB'
    },
    {
        id: 2,
        name: 'RKB'
    }]);

const keyboardType = ref(null);

const keyboardComputed = computed( {
    get: () => keyboardType.value || currentMessage.value?.keyboard_type || 'IKB',
    set: (val) => {
        keyboardType.value = val
    }
})

const allowApplyForm = computed(() => {
    if(EDIT_CONSTRUCTOR_FORM.value) {
        return false
    }
    return !notEditMessageName.value
})




//LIFE CYCLE
onMounted(() => {
    
    
    shadowLayer.value = document.querySelector('.shadow__layer');
    console.log('displayed')
});

//WATCHERS

watch(() => currentMessage,     // SET INITIALS
    (curVal, preVal) => {
        if(EDIT_CONSTRUCTOR_FORM.value){

            uploadResult.value = currentMessage.value?.photo;

            newMessageName.value = currentMessage.value.text;
            afterSetMessageName();
        }
    },
    {
        deep: true
    }
)

// watch(() => fileUpload.value,
//     () => {
        
//         closeIconSVGElement.value = document.querySelector('.image-container__close')

//         if(closeIconSVGElement.value) {
//             closeIconSVGElement.value.addEventListener('click', deleteImageHandler)
//         }

//     }
// )

// METHODS
const newMessageNameHandler = (val) => {
    
    newMessageName.value = val

}
function optionOnChangeHandler(val) {
    
    newOptionName.value = val

}

function addNewOption() {   // Message ID Validate

    if(newOptionName.value){    // OPTION MESSAGE
        store.dispatch('messagesReducer/' + ActionTypes.CREATE_NEW_OPTION, newOptionName.value).catch((err) => {
            notify({
                group: 'app',
                type: 'error',
                title: 'Ошибка',
            })
        })
        
        // newOptionName.value = '';
        newOptionName.value = '';
        v$.value.$reset();
    }
    
}
function setMessageNameHandler() {          // NOT HANDLED EFFECT WHEN CREATED IT DOUBLED

    

    if(!notEditMessageName.value){

        
        v$.value.$touch();
        
        const data = new FormData()

        if(fileUpload && !EDIT_CONSTRUCTOR_FORM.value){

            data.append('coordinate_x', newMessage.value!.coordinate_x.toString())
            data.append('coordinate_y', newMessage.value!.coordinate_y.toString())

        } else {

            for( const [key,value] of Object.entries(currentMessage.value) ) {
                if( typeof value !== 'object' && typeof value !== null && 'photo' != key ){
                    data.append(key, typeof value !== 'string' ? (value as number)?.toString() : value )
                }
            }

        }

        data.append('photo', fileUpload.value!)
        data.append('text', newMessageName.value)
        data.append('keyboard_type', keyboardComputed.value)
        

        if(newMessageName.value && !EDIT_CONSTRUCTOR_FORM.value){
    
            store.dispatch('messagesReducer/' + ActionTypes.CREATE_MESSAGE, {
                            botID: route.query.id,
                            messageCred: fileUpload.value 
                                ? data
                                : {
                                    text:  newMessageName.value,
                                    coordinate_x: newMessage.value!.coordinate_x,
                                    coordinate_y: newMessage.value!.coordinate_y,
                                    keyboard_type: keyboardComputed.value,
                                }
                    }).then((res) => {

                        store.commit('messagesReducer/' + MutationTypes.EDIT_CONSTRUCTOR_FORM, true);
                        
                        afterSetMessageName();
                        
                    }).catch((err) => {
                        notify({
                            group: 'app',
                            type: 'error',
                            title: 'Ошибка',
                        });
                        throw new Error(err)
                    })
    
        } else if(EDIT_CONSTRUCTOR_FORM.value) {
            
            uploadResult.value ? delete currentMessage.value.photo : currentMessage.value.photo = null;

            store.dispatch( 'messagesReducer/' + ActionTypes.UPDATE_CONSTRUCTOR, fileUpload.value 
                ? data
                : {
                    ...currentMessage.value,
                    text: newMessageName.value,
                    keyboard_type: keyboardComputed.value,
                    
                }
            ).then((res) => {
                
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
function toggleEditMessage () {
    notAllowedTypeOptions.value = true;
    optionsForm.value!.classList.add('not-allowed');
    notEditMessageName.value = false;

}

function resetAllState () {

    keyboardType.value = null;
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
    
    // closeIconSVGElement.value?.parentElement?.remove();
    // closeIconSVGElement.value = null;
    fileUpload.value = null;
    uploadResult.value = null;
}

async function completeForm(ev) { // COMPLETE FLOW
    const isValid = await v$.value.$validate()
    if(isValid || notAllowValidation.value) {

        // store.commit('messagesReducer/' + MutationTypes.SET_NEW_MESSAGE, newMessageName.value);
        
        resetAllState()
    }
    
}

function deleteConstructorHandler() {   // TRACK THAT CURRENT MESSAGE DO NOT MIX UP WHEN FIRST CREATED

    store.dispatch( 'messagesReducer/' + ActionTypes.DELETE_CONSTRUCTOR, currentMessage.value.id)
        .then((res) => {

            const unifiedLinks = currentMessage.value.current_variants.concat(currentMessage.value.next_variants);

            unifiedLinks.forEach( ( link ) => {

                deleteLink(link)

                return link
            })

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
        .then((res) => {

            if(res.status === 204) { 
                
                deleteLink(option)
                
            }

        })
}

function editHandler(ev) {
    
    toggleEditMessage();

}

function deleteLink(option) {

    const pathEl = document.querySelector(`#fc_path_${option.id}_g`)
    if( pathEl ) {
        pathEl.parentElement?.remove();
        fileUpload.value = null
    }
}



// MAKE FIRST MESSAGE
function setAsFirstMessage(ev) {

    if( ev.currentTarget.checked ) {

        store.dispatch( 'botsReducer/' + ActionTypes.UPDATE_BOT).catch(err => {
            notify({
                group: 'app',
                type: 'error',
                title: 'Ошибка',
            })
        })

    } else {
        store.dispatch( 'botsReducer/' + ActionTypes.UPDATE_BOT, true).catch(err => {
            notify({
                group: 'app',
                type: 'error',
                title: 'Ошибка',
            })
        })
    }

}

//          UPLOAD FILE

function deleteImageHandler( { currentTarget } ) {  // SET NULL PHOTO PATCH
    // closeIconSVGElement.value = null
    fileUpload.value = null
    uploadResult.value = null
    // currentTarget.parentElement.remove()

}

function uploadHandler({ target : { files } }) {

    // const img = document.createElement("img")

    const reader = new FileReader()

    if( !files.length ){
        return
    }

    reader.onload = function ( { target: { readyState, result } } : Event & { target: { result: string, readyState: number } } & any ) {
        
        if(readyState === 2){

            // uploadContainer.value!.insertAdjacentHTML('beforeend', `
            // <div class="image-container">
            //     <img src="${result}" />
            //     <svg class="image-container__close" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            //         <path d="M7.17495 5.99999L10.7583 2.42499C10.9152 2.26807 11.0034 2.05524 11.0034 1.83333C11.0034 1.61141 10.9152 1.39858 10.7583 1.24166C10.6014 1.08474 10.3885 0.996582 10.1666 0.996582C9.9447 0.996582 9.73187 1.08474 9.57495 1.24166L5.99995 4.82499L2.42495 1.24166C2.26803 1.08474 2.0552 0.996582 1.83328 0.996582C1.61136 0.996582 1.39854 1.08474 1.24162 1.24166C1.0847 1.39858 0.996539 1.61141 0.996539 1.83333C0.996539 2.05524 1.0847 2.26807 1.24162 2.42499L4.82495 5.99999L1.24162 9.57499C1.16351 9.65246 1.10151 9.74463 1.05921 9.84618C1.0169 9.94773 0.995117 10.0566 0.995117 10.1667C0.995117 10.2767 1.0169 10.3856 1.05921 10.4871C1.10151 10.5887 1.16351 10.6809 1.24162 10.7583C1.31908 10.8364 1.41125 10.8984 1.5128 10.9407C1.61435 10.983 1.72327 11.0048 1.83328 11.0048C1.94329 11.0048 2.05221 10.983 2.15376 10.9407C2.25531 10.8984 2.34748 10.8364 2.42495 10.7583L5.99995 7.17499L9.57495 10.7583C9.65242 10.8364 9.74459 10.8984 9.84614 10.9407C9.94768 10.983 10.0566 11.0048 10.1666 11.0048C10.2766 11.0048 10.3855 10.983 10.4871 10.9407C10.5886 10.8984 10.6808 10.8364 10.7583 10.7583C10.8364 10.6809 10.8984 10.5887 10.9407 10.4871C10.983 10.3856 11.0048 10.2767 11.0048 10.1667C11.0048 10.0566 10.983 9.94773 10.9407 9.84618C10.8984 9.74463 10.8364 9.65246 10.7583 9.57499L7.17495 5.99999Z" fill="#8F9BB3"/>
            //     </svg>
            // </div>
            // `);

            uploadResult.value = result;

            fileUpload.value = files[0];

        }

    }

    reader.readAsDataURL(files[0])

}




</script>

<style lang="scss">

     /* SIDEBAR LAYER */
    .sidebar-options-title__field{
        margin-bottom: 25px;
        position: relative;
        .edit__title {
            position: absolute;
            right: 23px;
            top: 15px;
            color: #688fa1;
            font-size: 13px;
            cursor: pointer;
        }
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

    .first-message{
        margin: 25px 0;
        display: flex;
        justify-content: end;
        padding-right: 25px;

        span {
            font-family: 'Product Sans';
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;
            color: #8F9BB3;
            margin-right: 15px;
        }

        .is__first-message {
            font-size: 22px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            position: relative;
            
            
            &::after{
                content: '';
                display: block;
                border-radius: 4px;
                width: 20px;
                height: 20px;
                background: #fff;
                cursor: pointer;
                position: absolute;
                left: 0;
                top: 0;
            }
            input {
                position: absolute;
                display: block;
                opacity: 0;
                cursor: pointer;
                height: 0;
                width: 0;
            }
            .icon__checkmark {
                background: #3DBCCC;
                border-radius: 4px;
                width: 20px;
                height: 20px;
                cursor: pointer;
                position: absolute;
                left: 0;
                right: 0;
                z-index: 22;
    
                display: none;
            }
            & input:checked ~ .icon__checkmark {
                display: block;
            }
        }

    }

    .keyboard-type {
        display: flex;
        justify-content: end;
        margin: 25px 0;
        &__item {
            font-size: 22px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            position: relative;
            display: flex;
            justify-content: end;

            & span {
                margin: 0 25px;
            }
            
            &::after {
                content: '';
                display: block;
                border: 1px solid #E4E9F2;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                background: #F7F9FC;
                cursor: pointer;
                position: absolute;
                right: 0;
                top: 0;
            }
            [type="radio"] {
                position: absolute;
                display: block;
                opacity: 0;
                cursor: pointer;
                height: 0;
                width: 0;
                &:checked ~ .icon__radio-btn {
                    display: block;
                }
            }
            .icon__radio-btn{
                border-radius: 4px;
                width: 20px;
                height: 20px;
                cursor: pointer;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 22;
    
                display: none;
            }
            
        }
        span {
            font-family: 'Product Sans';
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;
            color: #8F9BB3;
            
        }
        
    }

    @include b(upload-file){
        text-align: right;
        
        & input[type="file"] {
            display: none;
        }

        @include e(label){
            cursor: pointer;

            & .icon__attachment {
                width: 20px;
                height: 20px;
            }

            & span {
                color: #3DBCCC;
                
                position: relative;
                bottom: 5px;
                font-family: 'Product Sans';
                font-weight: 700;
                font-size: 14px;
                line-height: 16px;
            }
        }


    }
    
    @include b(image-container){

        background: #F7F9FC;
        border-radius: 6px;
        position: relative;
        width: 150px;
        margin: 10px 20px 0 auto;

        & svg {
            cursor: pointer;
            position: absolute;
            width: 20px;
            height: 20px;

            right: 5px;
            top: 5px;
        }

    }

</style>