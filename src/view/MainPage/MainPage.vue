<template>
    <div class="main-page">
        <div class="container">
            MainPage
            <div class="main-page__tools">
                <button class="green__btn" @click="structureBotHandler">
                    <SvgIcon nameId="enter" />
                {{__('Структура бота')}}
                </button>

                <button class="blue__btn" @click="createBotHandler">
                    <SvgIcon nameId="plus" />
                    {{__('Создать Бота')}}
                </button>
            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { notify } from "@kyvg/vue3-notification";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { SvgIcon } from "~/components";
import { useStore } from "~/store";
import { MutationTypes } from "~/store/modules/mutations-types";

const store = useStore();
const router = useRouter()

function structureBotHandler(){
    const currentBotId =  computed(() => store.getters['botsReducer/getCurrentBotId'])
    
    if(currentBotId.value){
        router.push({
        name: 'chart',
        query:{    
            id: currentBotId.value
        },
    })
    }else {
        notify({
            group: 'app',
            type: 'error',
            title: 'Выберите бота',
        })
    }
    
}

function createBotHandler() {

    store.commit(MutationTypes.SET_CURRENT_LAYOUT, 'EmptyLayout')
    router.push({
        name: 'create-bot'
    })
}


</script>

<style lang="scss">

@include b(main-page) {

    @include e(tools) {
        display: flex;
        margin-top: 25px;
        gap: 30px;
    }
    
}

@include b(icon){
    &__plus {
        width: 20px;
        height: 20px;
    }
    &__enter{
        width: 20px;
        height: 20px;
    }
}
    
</style>