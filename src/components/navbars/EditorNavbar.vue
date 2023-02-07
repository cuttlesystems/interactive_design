<template>

    <header class="constructor-header">

        <div class="container">
        
            <div class="constructor-header__inner">

                <div class="constructor-header__inner-tools">
                    <SvgIcon class="icon__only-icon" 
                            nameId="back-btn"
                            @click="handleBackArrow" 
                        />
                    <span>{{currentBot.name}}</span>
                </div>

                <DarkSwitcher />
                
                <div class="constructor-header__inner-right">
                    <button class="white__btn" @click="commandHandler">{{__('Комманды')}}</button>
                    <button class="white__btn" @click="saveTemplateHandler">
                        {{__('Сохранить')}}
                    </button>
                </div>

            </div>

        </div>
        
    </header>

</template>

<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification';
import { computed, onMounted, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '~/store';
import { ActionTypes } from '~/store/modules/action-types';
import { MutationTypes } from '~/store/modules/mutations-types';
import { DarkSwitcher, SvgIcon } from '../globals';
const route = useRoute();
const router = useRouter();
const store = useStore();
// REFERENCE
const commandSidebar: Ref<null | HTMLDivElement> = ref(null)
const shadowLayer: Ref<null | HTMLDivElement> = ref(null)

// COMPUTED
const currentBot = computed(() => store.state.botsReducer.currentBot)


//  LIFECYCLE

onMounted(() => {

    commandSidebar.value = document.querySelector('.command-sidebar')
    shadowLayer.value = document.querySelector('.shadow__layer')

})


// METHODS

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

function commandHandler(){
    
    if( (shadowLayer.value?.style.getPropertyValue('display') == 'none' 
        || shadowLayer.value?.style.getPropertyValue('display') == '') 
        ){

        commandSidebar.value?.classList.toggle('command-sidebar__open');
        (shadowLayer.value as HTMLDivElement ).style.display = 'block';
        store.commit('messagesReducer/' + MutationTypes.IS_BLOCK_SIDEBAR, true)

    } else {

        commandSidebar.value?.classList.toggle('command-sidebar__open');
        (shadowLayer.value as HTMLDivElement ).style.display = 'none';
        store.commit('messagesReducer/' + MutationTypes.IS_BLOCK_SIDEBAR, false)

    }

}

function handleBackArrow() {
    router.go(-1)
}


</script>

<style lang="scss">
    
    @include b(constructor-header) {
        box-shadow: 0 4px 10px #00000026;
        background-color: #ffffff;
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

            &-tools {

                display: flex;
                align-items: center;
                gap: 12px;

                & svg {
                    cursor: pointer;
                }

                & span {
                    color: #292A2F;
                    font-weight: 400;
                    font-size: 20px;
                    line-height: 24px;
                }
            }

        }

        @include e(inner-right) {
            display: flex;
            gap: 25px;
        }

    }

</style>