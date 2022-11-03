<template>
    <div class="scrollable-area">
        <div ref="flowchart" class="flowchart flowchart-container">
            
            <div class="flowchart-operators-layer unselectable">

            </div>

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

        transform: matrix(1, 0, 0, 1, 0, 0);
        transform-origin: 50% 50%;
        transition: none 0s ease 0s;
    }

    @include b(flowchart-operators-layer){
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
    @include b(flowchart-operator){
        position: absolute;
        z-index: 1;
        width: 180px;
        padding: 4px;
        border: 1px solid #fff;
        box-shadow: 0 2px 6px #00000026;
        background: #fff;
        pointer-events: initial;
        border-radius: 4px;
        text-align: center;
        margin-bottom: 50px;
        
    }
    @include b(op-error){
        border-color: #d4696a;
        box-shadow: 0 0 0 2px #d4696a;
    }

    @include b(flowchart-operator-title){
        padding: 2px 5px;
        font-weight: 700;
        background: #D35448;
        color: #fff;
        border-radius: 2px;
        cursor: move;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    @include b(flowchart-operator-body){
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            justify-content: center;
            cursor: move;
            min-height: 60px;
            color: #777;
            padding: 4px 16px;
            font-size: 15px;
            line-height: 1.3;
            word-break: break-word;
    }
    @include b(flowchart-operator-outputs){
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        max-width: 170px;
    }
    @include b(flowchart-operator-connector-set){
        flex-grow: 1;
    }
    @include b(flowchart-operator-connector){
        position: relative;
        width: 100%;
        padding-top: 1px;
        padding-bottom: 1px;
        margin-left: -4px;
    }
    @include b(flowchart-operator-connector-small-arrow) {
        width: 12px;
        height: 12px;
        position: absolute;
        left: calc(50% - 6px);
        background: #009FC1;
        border-radius: 50%;
        box-shadow: 0 0 0 3px #fff, 0 0 0 4px #fff, 0 5px 6px #00000080;
        pointer-events: none;
        z-index: 3;
    }
    

</style>