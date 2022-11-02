<template>
    <div class="scrollable-area">
        <div ref="flowchart" class="flowchart flowchart-container">

            <svg class="flowchart-temporary-link-layer" :style="{display:'none'}">
                <line x1="90" y1="94.42500305175781" x2="148.20001220703125" y2="132.8000030517578" stroke-dasharray="6,6" stroke-width="4" stroke="black" fill="none"></line>
            </svg>

        </div>
    </div>
</template>

<script lang="ts" setup>

import { ref, Ref, onMounted } from 'vue'

import ManageConstructorMap from '@cs/manageChartFlow'

const flowchart: Ref<HTMLElement | null> = ref(null)

onMounted(() => {

    const controlMap = new ManageConstructorMap(flowchart.value as HTMLDivElement)
    console.log(controlMap)
    // controlMap.initialize
    

})


</script>

<style lang="scss">

    @include b(scrollable-area){
        background: repeating-linear-gradient(45deg,#eee,#eee 10px,#e5e5e5 10px,#e5e5e5 20px);
        padding: 10px;
        position: relative;
        transition: all 90ms ease-in-out 45ms;
        transform: translateZ(0);
        overflow: hidden;
        width: calc(100vw - 100px);
        height: calc(100vh - 75px);
    }
    @include b(flowchart-container){
        position: relative;
        backface-visibility: initial !important;
        background-color: #eaf9f9;
    }
    @include b(flowchart){
        height: 6000px;
        width: 6000px;
        cursor: all-scroll !important;
        opacity: 1;
        overflow: hidden;

        transform: matrix(1, 0, 0, 1, 185.6, 39.2);
        transform-origin: 50% 50%;
        transition: none 0s ease 0s;
    }

</style>