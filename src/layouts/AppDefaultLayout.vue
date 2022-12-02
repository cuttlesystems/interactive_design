<template>
    <header class="constructor-header">
      
     
    </header>
    <div class="constructor-container">
        <TheSidebar @getSelectedConstructor="getSelectedConstructor" />
        <main class="flowchart-column constructor-container__item">
            <slot :selectedConstructor="selectedConstructor" 
                  :isMoved="isMoved"
                  :mousePosition="mousePosition"
                  />
        </main>
    </div>
    
</template>

<script setup lang="ts">

import { TheSidebar } from '~/components'
import {useMouse} from '@cs/useMouse'
import { isRef, reactive, ref, watch } from '@vue/runtime-core'
import { useEventListener } from '~/composables/useEventListener'


const selectedConstructor = ref()
let   isMoved             = ref(false)
const mousePosition = reactive({
    mouseMoveXPosition: 0,
    mouseMoveYPosition: 0
})
    
// let { mouseMoveXPosition, mouseMoveYPosition } = useMouse();

function getSelectedConstructor( selectedItem ){            // mouseup fired before click

    // selectedConstructor.value = selectedItem;

}

// watch(
//     [ selectedConstructor, mouseMoveXPosition, mouseMoveYPosition ],
//     ([s, x, y],[prevS, prevX, prevY]) => {
//         // create
//         if(s && (x !== prevX || y !== prevY)) {
//             console.log('first')

//         }

//     },
//     {flush: 'post'}
// )



function mouseDownHandler(ev: MouseEvent & {target: HTMLElement}) {

    // if( ev.target!.classList.contains('structure-elements__item') ) {
        selectedConstructor.value = ev.target;
        addEventListener('mousemove', mouseMoveHandler)
    // }
    
}

function mouseMoveHandler(ev: MouseEvent) {

    mousePosition.mouseMoveXPosition = ev.pageX;
    mousePosition.mouseMoveYPosition = ev.pageY;
    
    console.log('fired')
    
    if(selectedConstructor.value.classList.contains('structure-elements__item')){
        isMoved.value = true;
    }
    
}

function mouseUpHandler(ev: MouseEvent) {

    isMoved.value = false;
    removeEventListener('mousemove', mouseMoveHandler)
}

// clean up

useEventListener({ target: window, event: 'mousedown', cb: mouseDownHandler })
useEventListener({ target: window, event: 'mouseup', cb: mouseUpHandler })


</script>

<style lang="scss">

@include b(constructor-header) {
    box-shadow: 0 4px 10px #00000026;
    background-color: #0097b7;
    color: #fff;
    min-height: 75px;
    user-select: none;
}
@include b(constructor-container) {
    position: relative;
    display: table;
    height: calc(100vh - 75px);
    width: 100%;
    overflow: hidden;
    @include e(item){
        height: calc(100vh - 75px);
        display: table-cell;
        vertical-align: top;
        transition: all 90ms ease-in-out 45ms;
    }
}
@include b(toolbar){
    width: 100px;
    z-index: 2;
    user-select: none;
}
@include b(flowchart-column){
    position: relative;
    width: calc(100vw - 100px);
}

</style>