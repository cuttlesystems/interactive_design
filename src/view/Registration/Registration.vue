<template>
    <div class="login registration">
        <div class="login__inner">
            <form @submit.prevent="submitHandler" class="form">
                <h1 class="form__title">Добро пожаловать <br />на БОТ-систему</h1>
                
                <div class="form__field-box">
                    
                    <Input 
                        :notAllowValidation="false"
                        :eyeIcon="false"
                        :value="state.username"
                        @onChange="(val) => state.username = val"
                        placeholder="Введите ваш логин"
                    />
                    <!-- <div class="form__input--error" v-if="v$.password.$dirty && v$.password.required.$invalid">{{ 'Поле не должно быть пустым' }}</div> -->
                    <!-- <div class="form__input--error" v-if="v$.password.$dirty && v$.password.firstCharacter.$invalid">{{ 'Ошибка валидации' }}</div> -->
                    <!-- <div class="form__input--error" v-if="errors.loginField">{{ errors.loginField }}</div> -->
                </div>
                <!-- <input type="text" name="email" class="form__input" placeholder="Введите email" 
                    v-model="state.email"
                    /> -->
                <div class="form__field-box">
                    <Input 
                        :eyeIcon="false"
                        :value="state.email"
                        @onChange="(val) => state.email = val"
                        placeholder="Введите ваш email"
                    />
                </div>
                
                <div class="form__field-box">
                    <Input 
                        :eyeIcon="true"
                        :value="state.password"
                        @onChange="(val) => state.password = val"
                        placeholder="Введите ваш пароль"
                    />
                </div>
                <div class="form__field-box">
                    <Input 
                        :eyeIcon="true"
                        :value="state.confirmPassword"
                        @onChange="(val) => state.confirmPassword = val"
                        placeholder="Повторите ваш пароль"
                    />
                </div>

                <!-- <input type="password" name="password" class="form__input" placeholder="Введите пароль"
                    v-model="state.password" 
                    /> -->
                <!-- <div class="form__input--error" v-if="v$.password.$dirty && v$.password.required.$invalid">{{ 'Поле не должно быть пустым' }}</div>
                <div class="form__input--error" v-if="v$.password.$dirty && v$.password.firstCharacter.$invalid">{{ 'Ошибка валидации' }}</div>
                <div class="form__input--error" v-if="errors.loginField">{{ errors.loginField }}</div> -->
                <DarkSwitcher />
                <input type="submit" class="form__btn" />
            </form>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";
import { computed, onMounted, reactive } from "vue";
import { DarkSwitcher, Input } from "~/components";
import { useStore } from "~/store";
import { ActionTypes } from "~/store/modules/action-types";

const store = useStore()

onMounted(() => {
    // alert('validate && main page')
    // alert('  ')
})

const state = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const rules = computed(() => ({
    password: sameAs(state.confirmPassword)
}))

const v$ = useVuelidate(rules, state)

async function submitHandler() {
    
    console.log(v$.value)
    console.log(await v$.value.$validate(), 'isVALIDs')
    debugger

    if(state.username && state.email && state.password){
        store.dispatch('authReducer/' + ActionTypes.REGISTRATION, state)
    }
    
}

</script>

<style lang="scss">


    .registration .form__field-box {
        
        margin-bottom: 0;

        &:first-child {
            margin: 0;
        } 

        & .form__input--error {
            bottom: -20px;
        }

        & .login__inner{
            padding: 20px 40px;
        }

    }

     
        
    
</style>