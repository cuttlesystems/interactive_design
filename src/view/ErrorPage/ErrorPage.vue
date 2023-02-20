<template>
    <div class="bot-page">
        <div class="bot-page__inner">

            <div class="bot-page__top">
                <div class="bot-page__title-field">
                    <SvgIcon nameId="bot-icon" />
                    <span></span>
                </div>
                <p class="bot-page__inform">
                   
                </p>
            </div>

            <div class="bot-page__content-area">

                <div>
                    <img src="../../assets/img/warn.png" alt="Warning">
                    <h1>{{__('Connection lost ')}}</h1>
                </div>

                <span class="lost__checker">{{__('Check internet connection')}}</span>

            </div>

            <div class="bot-page__bottom">

                <div class="main-page__tools" >
                    
                    
                    <!-- <button class="blue__btn" @click="createBotHandler">
                        <SvgIcon nameId="plus" />
                        {{__('Создать Бота')}}
                    </button> -->
                    <div>
                        
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { SvgIcon } from "~/components";


</script>

<style lang="scss" scoped>

    .bot-page__inner {
        width: 100%;
    }

    .bot-page__content-area {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F0EBEB;
        
        position: relative;

        & div {
            display: flex;
            gap: 15px;
        }

        & h1 {
            font-weight: 400;
            font-size: 32px;
            line-height: 39px;
        }

        & .lost__checker {
            position: absolute;
            bottom: 5%;
            left: 37%;
        }

    }

</style>