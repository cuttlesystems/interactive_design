<template>
    <div class="main-page">
        <div class="container">
            
            <div class="main-page__tools">
                <button class="green__btn" @click="structureBotHandler">
                    <SvgIcon nameId="enter" />
                {{__('Структура бота')}}
                </button>

                <button class="blue__btn" @click="createBotHandler">
                    <SvgIcon nameId="plus" />
                    {{__('Создать Бота')}}
                </button>

                <button class="blue__btn" @click="startBotHandler">
                    <!-- <SvgIcon nameId="plus" /> -->
                    {{__('ЗАПУСТИТЬ Бота')}}
                </button>

                <button class="blue__btn" @click="stopBotHandler">
                    <!-- <SvgIcon nameId="plus" /> -->
                    {{__('ОСТАНОВИТЬ Бота')}}
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
import { ActionTypes } from "~/store/modules/action-types";
import { MutationTypes } from "~/store/modules/mutations-types";

const store = useStore();
const router = useRouter();
const currentBotId =  computed(() => store.getters['botsReducer/getCurrentBotId'])


function structureBotHandler(){
    
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

const startBotHandler = () => {

    if(currentBotId.value){
        
        store.dispatch('botsReducer/' + ActionTypes.BOT_TOGGLER, {
            botId: currentBotId.value,
            type: 'start'
        }).then(() => {
            notify({
                group: 'app',
                type: 'success',
                title: 'Бот успешно запущено',
            })
        }).catch(() => {
            notify({
                group: 'app',
                type: 'error',
                title: 'Ошибка',
            })
        })

    } else {
        
        notify({
            group: 'app',
            type: 'error',
            title: 'Выберите бота',
        })
    }

    

}

const stopBotHandler = () => {
    if(currentBotId.value){
        store.dispatch('botsReducer/' + ActionTypes.BOT_TOGGLER, {
            botId: currentBotId.value,
            type: 'stop'
        }).then(() => {
            notify({
                group: 'app',
                type: 'success',
                title: 'Бот успешно остановлен',
            })

        }).catch(() => {
            notify({
                group: 'app',
                type: 'error',
                title: 'Ошибка',
            })
        })
    }else {
        notify({
            group: 'app',
            type: 'error',
            title: 'Выберите бота',
        })
    }

    
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