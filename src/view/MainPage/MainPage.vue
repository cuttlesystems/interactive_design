<template>
    <div ref="mainPage" class="main-page">
            
            <!-- <SvgIcon class="bg-icon" :nameId="isDark ? 'main-bg-dark' : 'main-bg-white'" /> -->
            <div v-if="!isDark" class="flash-bg"></div>

            <div class="main-page__inner">

                <router-view></router-view>
                
                <!-- <div class="main-page__tools">
                    <button class="green__btn" @click="structureBotHandler">
                        <SvgIcon nameId="enter" />
                        {{__('Структура бота')}}
                    </button> -->
    
                    <!-- <button class="blue__btn" @click="createBotHandler">
                        <SvgIcon nameId="plus" />
                        {{__('Создать Бота')}}
                    </button> -->
                    <!-- <div>
                        <button class="blue__btn" @click="startBotHandler">
                            {{__('ЗАПУСТИТЬ Бота')}}
                        </button>
        
                        <button class="blue__btn" @click="stopBotHandler">
                            {{__('ОСТАНОВИТЬ Бота')}}
                        </button>
                    </div>

                </div> -->

            </div>
            
    </div>
</template>

<script setup lang="ts">

import { computed, onMounted, Ref, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { SvgIcon } from "~/components";
import { useStore } from "~/store";
import { ActionTypes } from "~/store/modules/action-types";
import { MutationTypes } from "~/store/modules/mutations-types";

//                  HOOKS
const store = useStore(); 
const router = useRouter();

//                  STATE
const mainPage: Ref<HTMLDivElement | null> = ref(null)

//                  COMPUTED
const isDark = computed(() => store.state.darkMode)



//                  WACTHERS
watch(isDark,
    () => {
        changeBackground()
    }
)
//                  METHODS
function changeBackground() {
    if(isDark.value) mainPage.value!.style.background = `bottom / contain no-repeat url(${require("~/assets/icons/black-bg-picture.png")})`;
    else mainPage.value!.style.background = `bottom / contain no-repeat url(${require("~/assets/icons/white-bg-picture.png")})`;
}
//                  LIFECYCLE
onMounted(() => {
    changeBackground()
})

// function createBotHandler() {

//     store.commit(MutationTypes.SET_CURRENT_LAYOUT, 'EmptyLayout')

//     router.push({
//         name: 'create-bot'
//     })

// }




</script>

<style lang="scss">



@include b(main-page) {
    
    width: 100%;
    height: 100%;

    position: relative;

    background: bottom / contain no-repeat  url("../../assets/icons/white-bg-picture.png");

    @include e(inner){
        z-index: 5;
        position: relative;
        width: 100%;
        height: 100%;
    }

    @include e(tools) {
        display: flex;
        gap: 30px;
        justify-content: space-between;
        & button {
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
        }
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
 
.flash-bg {
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(241,241,241, 0.96)
}

</style>