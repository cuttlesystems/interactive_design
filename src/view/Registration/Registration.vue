<template>
    <div class="login registration">
        <div class="login__inner">
            <form @submit.prevent="submitHandler" class="form" autocomplete="off">
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
                <!-- <div class="form__input--error" v-if="v$.password.$dirty && v$.password.required.$invalid">{{ 'Поле не должно быть пустым' }}</div> -->
                <div class="form__input--error error-match" v-if="v$.email.$invalid">{{ __("Введите валидный email") }}</div>
                <div class="form__input--error error-match" v-if="v$.confirmPassword.$invalid">{{ __("Ошибка повторение пароля") }}</div>
                <DarkSwitcher />
                <button type="submit" class="form__btn">
                    <span v-if="isLoaded">{{__('Отправить')}}</span>
                    <div class="loader" v-else />
                </button>
            </form>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { notify } from "@kyvg/vue3-notification";
import useVuelidate from "@vuelidate/core";
import { required, sameAs, email } from "@vuelidate/validators";
import { computed, onMounted, onUpdated, reactive, ref } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { DarkSwitcher, Input } from "~/components";
import { useStore } from "~/store";
import { ActionTypes } from "~/store/modules/action-types";

const store = useStore()
const router = useRouter()



const state = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const isLoaded = ref(true)

const rules = {
    email: { email },
    confirmPassword: { sameAs: sameAs(computed(() => state.password)) }
}
const v$ = useVuelidate(rules, state);


async function submitHandler() {

    const isValidData = await v$.value.$validate();

    console.log(isValidData, 'ISVALID')
    console.log(v$.value.email.$invalid)

    if(state.username && state.email && state.password && isValidData){
        isLoaded.value = false;
        store.dispatch('authReducer/' + ActionTypes.REGISTRATION, state)
            .then(() => {
                router.push({
                    name: 'login'
                })
            }).catch((err) => {
                
                notify({
                    group: 'app',
                    type: 'error',
                    title: err.response.data.username[0],
                })
            })
            .finally(
                () => {
                    isLoaded.value = true;
                    
                }
            )
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
        
    .error-match {
        position: unset;
    }

</style>