<template>
    <div class="create-bot bot-page">
        <div class="create-bot__inner bot-page__inner content-area">
            <h1 class="create-bot__title">
                {{__("Создать бота")}}
            </h1>
            <Input 
                :label="__('Имя Бота')"
                :value="unref(formData.name)"
                @onChange="(val) => formData.name = val"
                placeholder="Введите имя бота"
            />
            <Input 
                :label="__('Токен Бота')"
                :value="unref(formData.token)"
                @onChange="(val) => formData.token = val"
                placeholder="Введите имя бота"
            />
            <Input 
                :label="__('Описание Бота')"
                :value="unref(formData.description)"
                @onChange="(val) => formData.description = val"
                placeholder="Введите имя бота"
            />
            <button class="blue__btn create-bot__btn" @click="completeFormData">{{__('Создать бота')}}</button>
        </div>
    </div>
</template>

<style lang="scss">
    @include b(create-bot){

        @include e(inner){
            width: 100%;

            display: flex;
            flex-direction: column;

            gap: 30px;
        }

        @include e(title) {
            font-weight: 500;
            font-size: 30px;
            line-height: 38px;

            color: var(--clear-white-text);
        }

        @include e(btn){
            align-self: center;
            width: 70%;
        }
        
        & .custom-input__label {
            font-weight: 400;
            font-size: 18px;
            line-height: 23px;
        }

        & .custom-input__label {
            margin-left: 0;
        }

        & .create-bot__btn {
            width: 100%;
            font-weight: 500;
            font-size: 15px;
            line-height: 23px;
            padding: 13px 0;
        }

        & .bot-page__inner {
            height: auto;
        }

    }

</style>



<script setup lang="ts">    //      FIX(WHEN GO BACK CURRENT BOT WILL BE RESETED)
import { onMounted, reactive, unref } from "vue";
import { Input } from "~/components";
import { notify } from "@kyvg/vue3-notification";
import useVuelidate from "@vuelidate/core";
import { useStore } from "~/store";
import { ActionTypes } from "~/store/modules/action-types";

const v$ = useVuelidate()
const store = useStore()

const formData = reactive({
    name: '',
    token: '',
    description: ''
})

// onMounted(() => {
//     store.dispatch('messagesReducer/'+ActionTypes.GET_MESSAGE_LIST, 8)
// })


async function completeFormData() {
    const isValid = await v$.value.$validate();

    if(isValid){
        try{
            const res = await store.dispatch('botsReducer/' + ActionTypes.CREATE_BOT, formData)
            if(res.status === 201){
                notify({
                    group: 'app',
                    type: 'success',
                    title: '123',
                    text: 'Бот успешно создан'
                })
            }
            
        }catch(er){
            console.log(er)
        }

        
    }
    
    

}


</script>



