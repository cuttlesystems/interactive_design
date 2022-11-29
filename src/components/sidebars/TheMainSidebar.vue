<template>
    <div :class="[store.state.isExpandSideBar ? 'expand' : '','main-sidebar']" >
        <ul class="main-sidebar__list">
            <li class="main-sidebar__item">
                <router-link :to="{name: 'main'}">
                    <SvgIcon :nameId="route.name === 'main' ? 'home--blue': 'home'" />
                    <span class="main-sidebar__text">{{__('Главная')}}</span>
                </router-link>
            </li>
            <li class="main-sidebar__item">
                <router-link :to="{name: 'tree', params: {
                    treeId: 1
                }}">
                    <SvgIcon :nameId="route.name === 'tree' ? 'list--blue' : 'list'" />
                    <span class="main-sidebar__text">Page 2</span>    
                </router-link>
            </li>
            <!-- SET ICON BLUE -->
            <li class="main-sidebar__item">                 
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
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, watch } from "vue-demi";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "~/store";
import { SvgIcon } from "../globals";

const store = useStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
    console.log(route.name, 'n')
    console.log(router)
    
})




    
</script>

<style lang="scss">
    @include b(main-sidebar){
        width: 65px;
        height: 100%;
        display: table-cell;
        vertical-align: top;

        transition: .5s;
        background: #FFFFFF;
        box-shadow: 8px 0px 16px rgba(143, 155, 179, 0.16);

        &.expand {
            width: 240px;
            & span {
                display: block;
            }
        }

        @include e(list) {
            display: flex;
            flex-direction: column;
            font-weight: 600;
            font-size: 14px;
            line-height: 18px;
            color: #222B45;
        }
        @include e(item){
            
            & svg {
                width: 25px;
                height: 25px;
            }

            & a {
                padding: 20px;
                border-bottom: 1px solid #E4E9F2;
                display: flex;
                gap: 12px;
                align-items: center;
                color: inherit;
            }
            & span {
                display: none;
                transition: .5s;
            }
            .router-link-active {
                color: #3DBCCC;
            }
            
        }
    }
   
</style>