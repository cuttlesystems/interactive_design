<template>

    <header class="constructor-header">

        <div class="container">
        
            <div class="constructor-header__inner">
                <div class="constructor-header__inner-tools">
                    
                </div>
                <button class="white__btn" @click="saveTemplateHandler">
                    {{__('Сохранить')}}
                </button>
            </div>

        </div>
        
    </header>

</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter()

function saveTemplateHandler(ev) {  // RESET ALL STATES CONSTRUCTOR

    
    router.go(-1);
}


</script>

<style lang="scss">
    
    @include b(constructor-header) {
        box-shadow: 0 4px 10px #00000026;
        background-color: #0097b7;
        color: #fff;
        min-height: 75px;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        
        & .container{
            padding: 0;
        }

        @include e(inner) {
            display: flex;
            justify-content: space-between;

        }
    }

</style>