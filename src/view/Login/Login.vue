<template>
    <div class="login">
        <div class="login__inner">
            <form @submit.prevent="submitHandler" class="form">
                <h1 class="form__title">Welcome to <br />Cuttle System</h1>

                <input type="text" name="username" class="form__input" placeholder="Введите логин" 
                    v-model="state.username"
                    @blur="v$.username.$touch"
                    />
                <div class="form__input--error" v-if="v$.username.$dirty && v$.username.required.$invalid">{{ 'Поле не должно быть пустым' }}</div>
                <div class="form__input--error" v-if="v$.username.$dirty && v$.username.maxLengthValue.$invalid">{{ `Максимальное количество символов ${v$.username.maxLengthValue.$params.max}` }}</div>

                <input type="password" name="password" class="form__input" placeholder="Введите пароль"
                    v-model="state.password" 
                    @blur="v$.password.$touch"
                    />
                <div class="form__input--error" v-if="v$.password.$dirty && v$.password.required.$invalid">{{ 'Поле не должно быть пустым' }}</div>
                <div class="form__input--error" v-if="v$.password.$dirty && v$.password.firstCharacter.$invalid">{{ 'Ошибка валидации' }}</div>
                <div class="form__input--error" v-if="errors.loginField">{{ errors.loginField }}</div>

                <input type="submit" class="form__btn" />
            </form>
        </div>
    </div>
</template>

<script src="./Login.ts" lang="ts">

/*      
*       middlewarePipline -> vuex -> interceptors DAL layer -> Global feat to mixin --> api
*       ChartFlow   ---  nginx
*       
        customRef() track, trigger
*/

</script>

<style lang="scss">
    @include b(login){
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        @include e(inner){
            padding: 32px;
            box-shadow: 0px 16px 30px rgba(34, 43, 69, 0.2);
            border-radius: 8px;
            font-size: 16px;
            line-height: 16px;
            max-width: 405px;
            width: 100%;
        }
    }
    @include b(form){
        @include e(title){
            font-weight: 700;
            font-size: 22px;
            text-align: center;
            max-width: 250px;
            margin: auto;
            line-height: 31px;
        }
        @include e(input){
            width: 100%;
            position: relative;
            background: #fff;
            margin: 10px 0;
            border-radius: 6px;
            border: 1px solid #E4E9F2;
            padding: 10px 16px;
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            &:focus{
                outline: none;
            }
            &:hover{
                border: 1px solid #E4E9F2;
            }
            @include m(error) {
                color: #ac1c00;
                font-size: 13px;
                text-align: right;
                margin-left: auto;
                /*position: absolute;*/
                bottom: -20px;
                right: 0;
            }
        }
        @include e(btn){

            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 12px;
            border-radius: 4px;
            background-color: #3DBCCC;
            border: 1px solid transparent;
            outline: none;
            cursor: pointer;
            flex-wrap: wrap;
            box-sizing: border-box;
            color: #fff;

            margin: 20px 0;
        }
    }
</style>