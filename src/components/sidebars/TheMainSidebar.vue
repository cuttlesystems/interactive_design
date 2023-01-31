<template>
    <div :class="[isExpandSideBar ? 'expand' : '','main-sidebar']" >

        <div class="main-sidebar__top" @click="iconHandler" v-if="!allowedBurgerPages.includes(String(route.name))">
            <SvgIcon nameId="simple-gram" />
        </div>

        <div class="main-sidebar__bottom">

            <h5 class="main-sidebar__title" v-if="isExpandSideBar">
                {{__("Ваши боты")}}
            </h5>
    
            <ul class="main-sidebar__list">
                
                <li class="main-sidebar__item" v-for="bot of bots" :key="bot.id">
                    <router-link 
                        :to="{
                            name: 'bot',
                            query: {
                                botId: bot.id
                            }
                    }">
                        <!-- <SvgIcon :nameId="route.name === 'main' ? 'home--blue': 'home'" /> -->
                        <img src="../../assets/img/bot-image.png" alt="Bot">
                        <span v-if="isExpandSideBar" class="main-sidebar__text">{{bot.name}}</span>
                        <SvgIcon v-if="isExpandSideBar" :nameId="isActiveLink(bot)" />
                    </router-link>
                </li>

                <li class="main-sidebar__item" @click="createBotHandler">
                    <a>
                        <img src="../../assets/img/plus.png" alt="Create">
                        <span class="main-sidebar__text">
                            {{__('Новый проект')}}
                        </span>
                        <div></div>
                    </a>
                </li>
                
                <!-- <li class="main-sidebar__item">
                    <router-link :to="{name: 'tree', params: {
                        treeId: 1
                    }}">
                        <SvgIcon :nameId="route.name === 'tree' ? 'list--blue' : 'list'" />
                        <span class="main-sidebar__text">{{__('Tree')}}</span>    
                    </router-link>
                </li> -->
                <!-- SET ICON BLUE -->
                <!-- <li class="main-sidebar__item">                 
                    <router-link :to="{name: 'profile'}">
                        <SvgIcon nameId="wallet" />
                        <span class="main-sidebar__text">Page 3</span>
                    </router-link>
                </li>
                <li class="main-sidebar__item">
                    <router-link :to="{name: 'profile'}">
                        <SvgIcon nameId="application" />
                        <span class="main-sidebar__text">Page 4</span>
                    </router-link>
                </li>
                <li class="main-sidebar__item">
                    <router-link :to="{name: 'profile'}">
                        <SvgIcon nameId="info" />
                        <span class="main-sidebar__text">Page 5</span>
                    </router-link>
                </li> -->
            </ul>

        </div>
        
        
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, Ref, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "~/store";
import { ActionTypes } from "~/store/modules/action-types";
import { SingleBotType } from "~/store/modules/bots-reducer";
import { MutationTypes } from "~/store/modules/mutations-types";
import { SvgIcon } from "../globals";

//              HOOK
const store = useStore()
const route = useRoute()
const router = useRouter()

//              STATE
const isExpandSideBar = ref(false)
const allowedBurgerPages = ref(['create-bot'])
const bots: Ref<Array<unknown>> = ref([])


onMounted(() => {

    store.dispatch('botsReducer/' + ActionTypes.GET_BOTS_LIST).then((data) => {
        
        bots.value = data;

        if(data.length){

            store.commit( 'botsReducer/' + MutationTypes.SET_CURRENT_BOT, data[0] );

        }

    })
    
})

//              METHODS

function iconHandler() {

    isExpandSideBar.value = !isExpandSideBar.value

}

function isActiveLink ( bot ) {
    return route.query?.botId == bot.id ? 'active-page' : 'inactive-page'
}

function createBotHandler() {

    store.commit(MutationTypes.SET_CURRENT_LAYOUT, 'EmptyLayout')

    router.push({
        name: 'create-bot'
    })

}







    
</script>

<style lang="scss">

    @include b(main-sidebar){

        width: 71px;
        height: 100%;
        display: table-cell;
        vertical-align: top;

        transition: .5s;
        background: var(--sidebar-bg);
        box-shadow: 8px 0px 16px rgba(143, 155, 179, 0.16);
        
        &:not(.expand) {
            a {
                padding: 10px 0;
                justify-content: center;
            }
        }

        @include e(title) {
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;

            color: rgba(255, 255, 255, 0.4);
            margin: 40px 26px 7px;

            opacity: 0.5;
        }

        @include e(top) {
            padding: 16px 81px 16px 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            cursor: pointer;
        }

        @include e(bottom) {
           
        }

        &.expand {
            width: 300px;
            & a > svg {
                width: 9px;
                height: 9px;
            }
            & span {
                display: block;
            }
        }

        @include e(list) {

            display: flex;
            flex-direction: column;

            font-weight: 400;
            font-size: 20px;
            line-height: 24px;
            overflow-y: auto;
            
            color: rgba(255, 255, 255, 0.4);

        }

        @include e(item){
            
            & a {
                padding: 10px 26px;
                
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;

                color: inherit;

                &:focus {
                    background: rgba(255, 255, 255, 0.1);
                }
            }
            & span {
                display: none;
                transition: .5s;
            }

            &:last-child {
                & a {
                    gap: 0;
                    cursor: pointer;
                    & span {
                        color: #4DAAFF;
                    }
                }
            }
            
        }

        @include e(text) {
            text-overflow: ellipsis;
            overflow: hidden; 
            width: 160px; 
            height: 1.2em; 
            white-space: nowrap;
        }
    }

    @include b(icon){
        @include e(simple-gram) {
            display: block;
            width: 194px;
            height: 33px;
            
        }
    }
   
</style>