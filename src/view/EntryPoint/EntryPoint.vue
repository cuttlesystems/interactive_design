<template>

    <div class="entry-point">
        <div class="entry-point__inner">

            <div class="entry-point__top">
                <p>
                    <router-link :to='{name: "registration"}'>{{__('Регистрация')}}</router-link>
                </p>
                <p>
                    <router-link :to='{name: "login"}'>{{__('Войти в кабинет')}}</router-link>
                </p>
            </div>

            <div class="entry-point__bottom">
                <router-view></router-view>
            </div>

        </div>
    </div>

</template>

<script lang="ts" setup>




</script>

<style lang="scss">
    
    @include b(entry-point) {

        display: flex;
        justify-content: center;
        align-items: flex-start;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 7%;
        left: 0;

        @include e(inner) {
            max-width: 31.9%;
        }

        @include e(top) {

            display: flex;
            background: #ffffff;
            border-radius: 22px;
            text-align: center;
            margin-bottom: 20px;

            & p {
                
                padding: 30px 0;
                font-family: 'Product Sans';
                
                font-size: 18px;
                line-height: 24px;

                & .router-link-active{
                    opacity: 1;
                }
                
                & a {
                    font-family: 'Product Sans';
                    color: #292A2F;
                    opacity: 0.3;
                    padding: 0 60px;
                    font-weight: 400;
                }  

                &:first-child a {
                    border-right: 1px solid #CCCCCC;
                }
                
                    
            }
            
        }

        @include e(bottom){



        }

    }

</style>