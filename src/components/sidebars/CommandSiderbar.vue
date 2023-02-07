<template>
    <div ref="commandSidebar" class="command-sidebar messenger-flowchart-sidebar" v-click-outside="outsideClickHandler">

        <div class="tab-content scrollable-area">

            <h5 class="sidebar-options-title sidebar-only">
                {{__('Команды')}}
            </h5>

            <div class="sidebar-options-title__field">
                <!-- <div>
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
                </button> -->
            </div>

            <form ref="optionsForm" class="sidebar-form" @submit.prevent="commandAppendHandler">

                <div class="sidebar-form__options">
                    
                    <Input
                        :placeholder="__('Введите название команды')"
                        :value="newCommandName"
                        @onChange="commandNameHandler"
                        :notAllowValidation="false"
                    />
                    <Input
                        :placeholder="__('Введите описание команды')"
                        :value="newDescription"
                        @onChange="(value) => newDescription = value"
                        :notAllowValidation="false"
                    />
                    <button 
                        type="submit"
                        class="sidebar-form__append"  
                        >
                        
                        {{__(isEditCommand ? 'Изменить' : 'Добавить')}}
                    </button>

                    <ul v-if="commandList.length" class="sidebar-form__options-list">
                        <li class="sidebar-form__options-item--title sidebar-form__options-item">
                            <span>{{__('Название команды')}}</span>
                            <span>{{__('Описание команды')}}</span>
                            <span></span>
                        </li>
                        <li v-for="command of commandList" 
                        :key="command.id" 
                        class="sidebar-form__options-item">
                            <span>{{command.command}}</span>
                            <span>{{command.description}}</span>
                            <div class="sidebar-form__options-item--tools">
                                <span class="edit__title" @click="commandEditHandler(command)">
                                    {{__('Редактировать')}}
                                </span>
                                <SvgIcon nameId="delete" @click.stop.prevent="commandDeleteHandler(command)" />
                            </div>
                        </li>
                    </ul>

                </div>

            </form>

            <!-- <div class="first-message">

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

            </div> -->

        </div>

        <!-- <div class="sidebar-options-foot">
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
        </div> -->

    </div>
</template>

<script setup lang="ts">

import { computed, onMounted, ref, Ref } from "vue"
import { ActionTypes } from "~/store/modules/action-types"
import { useRoute } from "vue-router";
import { useStore } from "~/store";
import useVuelidate from "@vuelidate/core";
import { Input } from "../inputs";
import { SvgIcon } from "../globals";
import { MutationTypes } from "~/store/modules/mutations-types";
import { notify } from "@kyvg/vue3-notification";


// HOOKS
const store = useStore()
const v$ = useVuelidate()
const route = useRoute()

// STATE 
const commandList: Ref<Array<unknown>> = computed(() => store.state.commandReducer.commandList)
const newCommandName = ref('')
const newDescription = ref('')
const isEditCommand = ref(false)

const shadowLayer: Ref<  HTMLDivElement | null > = ref(null)
const commandSidebar: Ref<  HTMLDivElement | null > = ref(null)



// LIFECYCLE
onMounted(() => {
    
    shadowLayer.value = document.querySelector('.shadow__layer')
    store.dispatch( 'commandReducer/' + ActionTypes.GET_LIST_COMMAND, route.query.botId )

})

// METHODS

function outsideClickHandler({ target }) {
    
    if(!target.classList.contains('white__btn') && commandSidebar.value?.classList.contains('command-sidebar__open')) {

        commandSidebar.value?.classList.remove('command-sidebar__open');
        (shadowLayer.value as HTMLDivElement ).style.display = 'none';
        store.commit('messagesReducer/' + MutationTypes.IS_BLOCK_SIDEBAR, false);

        resetState();
        
    }


}

function commandEditHandler(com) {  // FLAG OR  CHECK LIST

    newCommandName.value = com.command
    newDescription.value = com.description
    store.commit( 'commandReducer/' + MutationTypes.SET_CURRENT_COMMAND, com)

    isEditCommand.value = true
    // store.dispatch( 'commandReducer/' + ActionTypes.UPDATE_COMMAND, command )

}

function commandNameHandler( value ){

    newCommandName.value = value

}

function commandDeleteHandler(command) {

    store.dispatch( 'commandReducer/' + ActionTypes.DELETE_COMMAND, command).catch(() => {
        notify({
            group: 'app',
            type: 'error',
            title: 'Ошибка',
        })
    })

}

async function commandAppendHandler( ev ) {

    const isValid = await v$.value.$validate()
    
    if(isValid){

        if( isEditCommand.value ){

            store.dispatch('commandReducer/' + ActionTypes.UPDATE_COMMAND, {
                command: newCommandName.value,
                description: newDescription.value
            }).then((res) => {

                if( res.status === 200 ) {

                    notify({
                        group: 'app',
                        type: 'success',
                        title: 'Изменения успешно внесены',
                    })
                    resetState()

                }

            })

        } else {
                
            store.dispatch( 'commandReducer/' + ActionTypes.CREATE_COMMAND, {

                command: newCommandName.value,
                description: newDescription.value

            }).then((res) => {

                resetState()

            }) 

        }


    }

}

function resetState () {
    newCommandName.value = '';
    newDescription.value = '';
    v$.value.$reset();
}


</script>

<style lang="scss">
    @include b(command-sidebar){
        @include e(open){
            width: 500px;
            max-width: 90%;
            overflow: visible;
        }

        & .sidebar-form__append{
            margin-top: 5px;
            cursor: pointer;
            margin-bottom: 25px;
        }

        & .sidebar-form__options-item{

            display: grid;
            grid-template-columns: 1fr 1fr .2fr;

            & span:nth-child(2) {
                text-align: center;
            }
            
            &:first-child {
                border: none;
                background: transparent;
                color: #8F9BB3;
                font-weight: 700;
                font-size: 14px;
                line-height: 16px;
                
            }

            @include m(tools){
                
                display: flex;
                gap: 15px;

                & .edit__title{
                    color: #8F9BB3;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 23px;
                    cursor: pointer;
                }
            }

        }
        
    }
    
    
</style>