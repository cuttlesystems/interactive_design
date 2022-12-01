<template>
    <div class="login">
        <div class="login__inner">
            <form @submit.prevent="submitHandler" class="form">
                <h1 class="form__title">Welcome to <br />Cuttle System</h1>
                
                <input type="text" name="username" class="form__input" placeholder="Введите логин" 
                    v-model="state.username"
                    />
                <input type="text" name="email" class="form__input" placeholder="Введите email" 
                    v-model="state.email"
                    />
                <!-- <div class="form__input--error" v-if="v$.username.$dirty && v$.username.required.$invalid">{{ 'Поле не должно быть пустым' }}</div>
                <div class="form__input--error" v-if="v$.username.$dirty && v$.username.maxLengthValue.$invalid">{{ `Максимальное количество символов ${v$.username.maxLengthValue.$params.max}` }}</div> -->

                <input type="password" name="password" class="form__input" placeholder="Введите пароль"
                    v-model="state.password" 
                    />
                <!-- <div class="form__input--error" v-if="v$.password.$dirty && v$.password.required.$invalid">{{ 'Поле не должно быть пустым' }}</div>
                <div class="form__input--error" v-if="v$.password.$dirty && v$.password.firstCharacter.$invalid">{{ 'Ошибка валидации' }}</div>
                <div class="form__input--error" v-if="errors.loginField">{{ errors.loginField }}</div> -->

                <input type="submit" class="form__btn" />
            </form>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue-demi";
import { useStore } from "~/store";
import { ActionTypes } from "~/store/modules/action-types";

const store = useStore()
const state = reactive({
    username: '',
    email: '',
    password: ''
})

function submitHandler() {
    if(state.username && state.email && state.password){
        store.dispatch('authReducer/' + ActionTypes.REGISTRATION, state)
    }
}

</script>

<style lang="scss">
    
</style>