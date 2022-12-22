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
import { notify } from '@kyvg/vue3-notification';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '~/store';
import { ActionTypes } from '~/store/modules/action-types';
import { MutationTypes } from '~/store/modules/mutations-types';

const route = useRoute();
const router = useRouter();
const store = useStore();

function saveTemplateHandler(ev) {  // RESET ALL STATES CONSTRUCTOR

    store.commit('messagesReducer/' + MutationTypes.RESET_STATE);
    store.dispatch('botsReducer/' + ActionTypes.GENERATE_BOT_FILES, route.query.id).then((res) => {

        if(res?.status === 200){

            return notify({
                group: 'app',
                type: 'success',
                text: 'Бот успешно сгенерирован'
            });

        }

        return Promise.reject(res)

    }).catch(() => {

        notify({
            group: 'app',
            type: 'error',
            title: 'Ошибка',
        })

    })
    
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