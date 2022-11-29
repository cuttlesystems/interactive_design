<template>
    <div class="main-page">
        <div class="container">
            MainPage

            <button class="blue__btn" @click="createBotHandler">
                <SvgIcon nameId="plus" />
                {{__('Создать Бота')}}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { SvgIcon } from "~/components";
import { useStore } from "~/store";
import { MutationTypes } from "~/store/modules/mutations-types";

const store = useStore();
const router = useRouter()

function createBotHandler() {

    store.commit(MutationTypes.SET_CURRENT_LAYOUT, 'EmptyLayout')
    router.push({
        name: 'create-bot'
    })
}


</script>

<style lang="scss">

@include b(icon){
    &__plus {
        width: 20px;
        height: 20px;
    }
}
    
</style>