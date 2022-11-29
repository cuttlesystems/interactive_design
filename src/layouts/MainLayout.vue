<template>

    <header class="header">
        <TheMainNavbar />
    </header>

    <div class="constructor-container">
        <TheMainSidebar />

        <main class="flowchart-column constructor-container__item main-page__wrapper">
            <!-- mousePosition, isMoved, selectedConstructor -->
            <slot               
                
            />
        </main>
    </div>

</template>


<script setup lang="ts">
import { TheMainSidebar } from '~/components'
import { TheMainNavbar } from '~/components'


</script>


<style lang="scss">

    .header {
        background: #FFFFFF;
        box-shadow: 0px 8px 16px rgba(143, 155, 179, 0.16);
    }
    .main-page__wrapper{
        background: #F1F4F9;
    }
    .constructor-container{
        box-shadow: 0px 8px 16px rgba(143, 155, 179, 0.16);
    }

</style>