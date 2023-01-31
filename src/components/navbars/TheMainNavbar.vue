<template>
    <nav class="main-navbar">
        <!-- <div class="main-navbar__icon" v-if="!allowedBurgerPages.includes(String(route.name))">
            <SvgIcon nameId="cuttle__system-icon" @click="burgerHandler" />
        </div>
        <div v-else></div> -->
        <div></div>

        <div class="main-navbar__right">

            <!-- <div class="modal-options" >
                <div class="modal-options__inner" @click="botsToggleHandler">
                    <p class="modal-options__title">{{ __(currentBot?.name || 'Выберите бота') }}</p>
                    <SvgIcon nameId="down-arrow" id="down-arrow" />
                </div>
                <ul class="modal-options__list" v-if="bots.length && isShow.bots">
                    <li class="modal-options__item" v-for="bot of bots" :key="bot.id" @click.stop="selectCurrentBot(bot)">{{bot.name}}</li>
                </ul>
            </div> -->
            
            <!-- <svg class="main-navbar__right-breadcrumbs" width="1" height="32" viewBox="0 0 1 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" x2="0" y1="0" y2="32" stroke="#E4E9F2" stroke-width="2"/>
            </svg>

            <SvgIcon nameId="magnifier" />
            
            <svg class="main-navbar__right-breadcrumbs" width="1" height="32" viewBox="0 0 1 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" x2="0" y1="0" y2="32" stroke="#E4E9F2" stroke-width="2"/>
            </svg>

            <SvgIcon nameId="bell" />

            <svg class="main-navbar__right-breadcrumbs" width="1" height="32" viewBox="0 0 1 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" x2="0" y1="0" y2="32" stroke="#E4E9F2" stroke-width="2"/>
            </svg> -->

            <DarkSwitcher />

            <div class="main-navbar__user">
                
                <div class="modal-options__inner" @click.stop="toggleProfileHandler" v-click-outside="botsOutsideClick">
                    <!-- <p>{{currentUser?.username}}</p> -->
                    <SvgIcon nameId="user" />
                    <SvgIcon nameId="arrow-down__user" id="down-arrow__user" />
                </div>

                <ul class="modal-options__list modal-options__list--user" v-if="isShow.user">
                        
                    <li class="modal-options__item" >
                        <SvgIcon nameId="user-profile" />
                        <router-link :to="{ name: 'profile' }">
                            {{__('Мой профиль')}}
                        </router-link>
                    </li>

                    <li class="modal-options__item" @click="quitHandler" >
                        <SvgIcon nameId="Logout" />
                        {{__('Выйти')}}
                    </li>

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
import { useRoute, useRouter } from 'vue-router';

import { BotsState, SingleBotType } from '~/store/modules/bots-reducer'
import LocalStorageService from '~/utils/LocalStorageService';
import { DarkSwitcher } from '../globals';

const store = useStore();
const route = useRoute();
const router = useRouter();
let bots: Ref<Array<SingleBotType>> = ref([])

const isShow = reactive({
    user: false,
})
// const arrowDown = ref()
const arrowDownUser = ref()

const currentBot = ref()


const storage = LocalStorageService.getService();


// methods
//                          
// function botsToggleHandler (ev) {
    
//     if(ev.target?.classList?.contains('icon__down-arrow')) {
//         arrowDown.value = ev.target
//     }
    
//     if(!isShow.bots) {
//         (arrowDown.value! as SVGElement)?.classList?.add('arrow-rotate')
//     }else {
//         (arrowDown.value! as SVGElement)?.classList?.remove('arrow-rotate')
//     }
//     isShow.bots = !isShow.bots
// }
function botsOutsideClick(ev) {
    // if( arrowDown.value?.classList?.contains('arrow-rotate') ){
    //     (arrowDown.value! as SVGElement).classList.remove('arrow-rotate')
    //     isShow.bots = false
    // }
    if( arrowDownUser.value?.classList.contains('arrow-rotate') ){
        arrowDownUser.value.classList.remove('arrow-rotate')
        isShow.user = false
    }
    
}

// SELECT CURRENT BOT

// function selectCurrentBot(bot) {
//     (arrowDown.value! as SVGElement)?.classList?.remove('arrow-rotate')
//     currentBot.value = bot;
//     isShow.bots = false;
//     // store.commit(MutationTypes.SET_CURRENT_BOT, bot);
// }

function toggleProfileHandler (ev) {

    if(!isShow.user){

        arrowDownUser.value.classList.add('arrow-rotate')
        
    } else {

        arrowDownUser.value.classList.remove('arrow-rotate')

    }

    isShow.user = !isShow.user

}

// TOGGLER BURGER
// function burgerHandler(ev){
//     store.commit(MutationTypes.SET_IS_EXPAND_SIDEBAR, !store.state.isExpandSideBar)
// }

function quitHandler(ev) {

    storage.reset();
    store.commit('authReducer/' + MutationTypes.SET_USER_CREDENTIALS, '');
    router.push( { name: 'login' } );
    

}

// Computed
const currentUser = computed(() => store.state.authReducer.currentUser);

//LifeCycleHooks

onMounted(() => {

    // store.dispatch('botsReducer/' + ActionTypes.GET_BOTS_LIST).then((res) => {

    //     bots.value = res;

    //     if(bots.value.length){

    //         // if( (store.state.currentBot as SingleBotType).id ) {
                
    //         //     // currentBot.value = store.state.currentBot

    //         // } else {

    //         //     currentBot.value = bots.value[0];

    //         //     // store.commit( MutationTypes.SET_CURRENT_BOT, bots.value[0] );

    //         // }

    //     }
    // })
    
    // arrowDown.value = document.querySelector('#down-arrow');
    arrowDownUser.value = document.querySelector('#down-arrow__user');

    store.dispatch('authReducer/' + ActionTypes.INITIALIZE_USER);

})


</script>

<style lang="scss">

    @include b(main-navbar){

        height: 100%;
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
                & .icon__user {
                    width: 34px;
                    height: 34px;
                }
            }

            & ul li:first-child {
            }

            a {
                display: block;
            }

        }

        @include e(right){

            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: none;
            
            & .switch-dark-wrapper {
                margin-top: 0;
            }

            & &-breadcrumbs {
                width: auto;
                height: auto;
                cursor: initial;
                margin: 0;
            }
            & > svg {
                margin: 0 12px;
                
            }
        }

        
    }

    @include b(modal-options) {

        position: relative;

        @include e(inner) {

            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 5px;

            cursor: pointer;
        }

        @include e(list){

            filter: drop-shadow(0px 16px 30px rgba(34, 43, 69, 0.2));
            border-radius: 8px;
            left: -3px;
            top: 35px;
            background: #FFFFFF;
            font-family: 'Product Sans';
            font-weight: 400;
            font-size: 18px;
            line-height: 22px;
            position: absolute;
            z-index: 22;

            &::before {

                content: "";
                position: absolute;
                width: 0;
                height: 0;
                border-width: 10px;
                border-style: solid;
                border-color: transparent #FFFFFF transparent transparent;
                top: -19px;
                left: 142px;
                transform: rotate(92deg);
            }

            @include m(user) {
                left: -110px;
                top: 61px;
            }
            
        }

        @include e(item){

            cursor: pointer;
            border-bottom: 1px solid #E4E9F2;
            width: 100%;

            display: flex;
            align-items: center;
            justify-content: start;
            gap: 7px;
            padding: 15px;

            & svg {
                width: 34px;
                height: 34px;
            }

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

    /* @include b(icon) {
        @include e(down-arrow){
            // transition: transform .2s cubic-bezier(0.4, 0.01, 0.45, 1.11);
        }
    } */

    .arrow-rotate {
        transform: rotate(180deg);
    }
    @include b(icon) {
        @include e(arrow-down__user) {
            width: 12px;
            height: 7px;
            cursor: pointer;
        }
    }
</style>