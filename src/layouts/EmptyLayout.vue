<template>
    <div class="empty-layout">
        <header class="header">
            <TheMainNavbar />
        </header>
        
        <div class="empty-layout__inner">
            <div class="empty-layout__header">
                <SvgIcon nameId="header-arrow" @click="backLinkHandler" />
                <h1 class="empty-layout__title">{{__(route.meta.title)}}</h1>
            </div>
            <router-view></router-view>
        </div>
        
    </div>
</template>

<style lang="scss">
    @include b(empty-layout){
        
        @include e(header){
            text-align: center;

        }

        @include e(title){
            font-weight: 700;
            font-size: 18px;
            line-height: 34px;
            color: var(--black);
            
        }
        @include e(inner){
            max-width: 37%;
            margin: 0 auto;
            position: relative;
            padding-top: 50px;
            display: flex;
            flex-direction: column;
            gap: 25px;
        }
    }

    @include b(icon) {
        &__header-arrow{
            width: 35px;
            height: 35px;
            position: absolute;
            left: 0;
            cursor: pointer;
        }
    }
</style>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { SvgIcon, TheMainNavbar } from "~/components";

const route = useRoute()
const router = useRouter()

function backLinkHandler() {
    router.go(-1)
}

</script>