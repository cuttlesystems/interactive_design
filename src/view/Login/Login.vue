<template>
    <div class="login">

        <div class="login__inner">
            <form @submit.prevent="submitHandler" class="form">
                <h1 class="form__title">Добро пожаловать <br />на БОТ-систему</h1>
                
                <div class="form__field-box">
                    <input type="text" name="username" class="form__input" placeholder="Введите логин" 
                        v-model="state.username"
                        @blur="v$.username.$touch"
                        />
                    <div class="form__input--error" v-if="v$.username.$dirty && v$.username.required.$invalid">{{ 'Поле не должно быть пустым' }}</div>
                    <div class="form__input--error" v-if="v$.username.$dirty && v$.username.maxLengthValue.$invalid">{{ `Максимальное количество символов ${v$.username.maxLengthValue.$params.max}` }}</div>
                </div>

                <div class="form__field-box">
                    
                    <!-- <input type="password" name="password" class="form__input" placeholder="Введите пароль"
                        :eyeIcon="true"
                        v-model="state.password" 
                        @blur="v$.password.$touch"
                        /> -->
                    <Input 
                        :notAllowValidation="true"
                        :eyeIcon="true"
                        :value="state.password"
                        @onChange="(val) => state.password = val"
                        placeholder="Введите пароль"
                    />
                    <div class="form__input--error" v-if="v$.password.$dirty && v$.password.required.$invalid">{{ 'Поле не должно быть пустым' }}</div>
                    <!-- <div class="form__input--error" v-if="v$.password.$dirty && v$.password.firstCharacter.$invalid">{{ 'Ошибка валидации' }}</div> -->
                    <div class="form__input--error" v-if="errors.loginField">{{ errors.loginField }}</div>
                </div>

                <DarkSwitcher />

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
        

        a {
            color: inherit;
            font-weight: 400;
            font-size: 14px;
            transition: .2s;
        }
        a:hover {
            color: #3DBCCC;
        }
        @include e(inner){
            padding: 20px 40px;
            box-shadow: 0px 16px 30px rgba(34, 43, 69, 0.2);
            background: #FFFFFF;
            border-radius: 22px;
        }
    }
    @include b(form){

        @include e(field-box){
            position: relative;
            margin: 25px 0;
            &:nth-child(3){
                margin-bottom: 50px;
            }
        }

        @include e(title){

            font-weight: 400;
            font-size: 24px;
            line-height: 36px;
            text-align: center;
            max-width: 250px;
            margin: auto;
            
        }

        @include e(input){
            width: 100%;
            position: relative;
            background: #fff;
            
            border: 1px solid rgba(204, 204, 204, 0.35);
            border-radius: 16px;

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
                font-size: 14px;
                text-align: right;
                margin-left: auto;
                position: absolute;
                bottom: -20px;
                right: 0;
                &:not(:nth-child(2)){
                    bottom: -40px;
                }
            }
        }

        @include e(btn){

            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 12px;
            border-radius: 16px;    
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