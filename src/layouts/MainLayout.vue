<template>

    <div class="constructor-container"
        :style="{
            height: route.name !== 'chart' && '100vh'
        }"
    >

        <TheMainSidebar />

        <div class="constructor-container__content">
            <header class="header">
                <TheMainNavbar />
            </header>
            <main class="flowchart-column constructor-container__item main-page__wrapper">
                <!-- mousePosition, isMoved, selectedConstructor -->
                <slot               
                    
                />
            </main>
        </div>

    </div>

</template>


<script setup lang="ts">
import { useRoute } from 'vue-router'
import { TheMainSidebar } from '~/components'
import { TheMainNavbar } from '~/components'

const route = useRoute()

</script>


<style lang="scss">

    .header {
        background: #FFFFFF;
        box-shadow: 0px 8px 16px rgba(143, 155, 179, 0.16);
    }
    .main-page__wrapper{
        background: var(--main-bg);
    }
    .constructor-container{
        
        box-shadow: 0px 8px 16px rgba(143, 155, 179, 0.16);
        table-layout: fixed;

        &__content{
            height: 100%;
            display: table-cell;
        }
    }

</style>