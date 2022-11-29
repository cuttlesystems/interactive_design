<template>
    <nav class="main-navbar">
        <div class="main-navbar__icon" v-if="!allowedBurgerPages.includes(route.name)">
            <SvgIcon nameId="burger" @click="burgerHandler" />
        </div>
        <div v-else></div>

        <div class="main-navbar__right">

            <div class="modal-options" v-click-outside="botsOutsideClick">
                <div class="modal-options__inner" @click="botsToggleHandler">
                    <p class="modal-options__title">{{ __(currentBot?.name || 'Выберите бота') }}</p>
                    <SvgIcon nameId="down-arrow" id="down-arrow" />
                </div>
                <ul class="modal-options__list" v-if="bots.length && isShow.bots">
                    <li class="modal-options__item" v-for="bot of bots" :key="bot.id" @click.stop="selectCurrentBot(bot)">{{bot.name}}</li>
                </ul>
            </div>
            
            <svg class="main-navbar__right-breadcrumbs" width="1" height="32" viewBox="0 0 1 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" x2="0" y1="0" y2="32" stroke="#E4E9F2" stroke-width="2"/>
            </svg>

            <SvgIcon nameId="magnifier" />
            
            <svg class="main-navbar__right-breadcrumbs" width="1" height="32" viewBox="0 0 1 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" x2="0" y1="0" y2="32" stroke="#E4E9F2" stroke-width="2"/>
            </svg>

            <SvgIcon nameId="bell" />

            <svg class="main-navbar__right-breadcrumbs" width="1" height="32" viewBox="0 0 1 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" x2="0" y1="0" y2="32" stroke="#E4E9F2" stroke-width="2"/>
            </svg>

            <div class="main-navbar__user">
                <div class="modal-options__inner" @click.stop="toggleProfileHandler">
                    <p>{{currentUser.username}}</p>
                    <SvgIcon nameId="down-arrow" id="down-arrow__user" />
                </div>

                <ul class="modal-options__list modal-options__list--user" v-if="isShow.user">
                    <li class="modal-options__item" >
                        <router-link :to="{ name: 'profile' }">
                            {{__('Личный кабинет')}}
                        </router-link>
                    </li>
                    <li class="modal-options__item" >{{__('Выйти')}}</li>
                </ul>
            </div>

        </div>
    </nav>
</template>

<script setup lang="ts">

// cannot assign ref to context Svg nameId 

import { computed, onMounted, reactive, Ref, ref } from 'vue'
import { useStore } from '~/store'
import { SvgIcon } from '~/components'
import { MutationTypes } from '~/store/modules/mutations-types'
import { ActionTypes } from '~/store/modules/action-types';
import { useRoute } from 'vue-router';

import { BotsState } from '~/store/modules/bots-reducer'

const store = useStore();
const route = useRoute()
let bots = ref([])

const isShow = reactive({
    user: false,
    bots: false
})
const arrowDown = ref()
const arrowDownUser = ref()

const currentBot = ref()

const allowedBurgerPages = ['create-bot']



// methods

function botsToggleHandler (ev) {
    
    if(ev.target?.classList?.contains('icon__down-arrow')) {
        arrowDown.value = ev.target
    }
    console.log(arrowDown.value, '123')
    if(!isShow.bots) {
        (arrowDown.value! as SVGElement)?.classList?.add('arrow-rotate')
    }else {
        (arrowDown.value! as SVGElement)?.classList?.remove('arrow-rotate')
    }
    isShow.bots = !isShow.bots
}
function botsOutsideClick(ev) {
    if(arrowDown.value?.classList?.contains('arrow-rotate')){
        (arrowDown.value! as SVGElement).classList.remove('arrow-rotate')
        isShow.bots = false
    }
    if(arrowDownUser.value?.classList.contains('arrow-rotate')){
        arrowDownUser.value.classList.remove('arrow-rotate')
        isShow.user = false
    }
    
}
function selectCurrentBot(bot) {
    (arrowDown.value! as SVGElement)?.classList?.remove('arrow-rotate')
    currentBot.value = bot;
    isShow.bots = false;
    store.commit(MutationTypes.SET_CURRENT_BOT, bot);
}

function toggleProfileHandler (ev) {
    if(!isShow.user){
        arrowDownUser.value.classList.add('arrow-rotate')
        
    }else {
        arrowDownUser.value.classList.remove('arrow-rotate')
    }
    isShow.user = !isShow.user
}

function burgerHandler(ev){
    store.commit(MutationTypes.SET_IS_EXPAND_SIDEBAR, !store.state.isExpandSideBar)
}

// Computed
const currentUser = computed(() => store.state.authReducer.currentUser);

//LifeCycleHooks

onMounted(() => {
    store.dispatch('botsReducer/' + ActionTypes.GET_BOTS_LIST).then((res) => {
        bots.value = res
    })
    
    arrowDown.value = document.querySelector('#down-arrow');
    arrowDownUser.value = document.querySelector('#down-arrow__user');

    store.dispatch('authReducer/' + ActionTypes.INITIALIZE_USER);

    if(bots.value.length){
        currentBot.value = bots.value[0]
        store.commit(MutationTypes.SET_CURRENT_BOT, bots.value[0]) 
    }

})


</script>

<style lang="scss">

    @include b(main-navbar){
        height: 100%;
        display: flex;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        max-width: 95%;
        
        @include e(icon){
            
        }
        @include e(list){

        }
        @include e(user) {
            display: flex;
            
            font-weight: 600;
            font-size: 16px;
            line-height: 30px;
            color: #222B45;
            padding-left: 24px;
            position: relative;
            & .modal-options__inner{
                border: none;
            }
            & ul li:first-child {
                padding: 0;
                
            }
            a {
                display: block;
                padding: 15px 16px;
            }
        }

        @include e(right){
            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: none;

            & &-breadcrumbs {
                width: auto;
                height: auto;
                cursor: initial;
                margin: 0;
            }
            & > svg {
                margin: 0 12px;
                
            }
            p {
            }
        }

        svg {
            max-width: 30px;
            height: 30px;
            cursor: pointer;
        }
        
    }

    @include b(modal-options) {
        position: relative;

        @include e(inner) {
            display: flex;
            border: 1px solid #E4E9F2;
            border-radius: 6px;
            justify-content: space-between;
            padding-left: 12px;
            margin-right: 16px;
            cursor: pointer;
        }

        @include e(list){
            filter: drop-shadow(0px 16px 30px rgba(34, 43, 69, 0.2));
            border-radius: 8px;
            left: -3px;
            top: 35px;
            background: #FFFFFF;
            font-family: 'Open Sans';
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            position: absolute;
            z-index: 2;
            @include m(user) {
                left: -70px;
                top: 32px;
            }
        }

        @include e(item){
            cursor: pointer;
            border-bottom: 1px solid #E4E9F2;
            padding: 15px 16px; 
            width: 100%;
            a {
                color: inherit;
                width: 100%;
            }
            a:hover,&:hover {
                color: #3DBCCC;
            }
            &:last-child {
                border-bottom: none;
            }
        }

        @include e(title){
            font-weight: 400;
            font-size: 14px;
            line-height: 33px;
        }

    }

    @include b(icon) {
        @include e(down-arrow){
            transition: transform .2s cubic-bezier(0.4, 0.01, 0.45, 1.11);
        }
    }

    .arrow-rotate {
        transform: rotate(180deg);
    }
    
</style>