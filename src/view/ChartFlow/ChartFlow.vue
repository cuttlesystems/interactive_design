<template>
    <div class="scrollable-area">
        <div ref="flowchart" class="flowchart flowchart-container">
            
            <div v-if="constructorList.length" class="flowchart-operators-layer unselectable">
            
                <div v-for="(item) of constructorList" :key="item.name" class="flowchart-operator operator-trigger op-error"
                    :class="[item.className]" 
                    :style="{
                        'top': `${ item.top || mouseMoveYPosition }px`,
                        'left': `${ item.left || mouseMoveXPosition }px`,
                        }"
                    :data-name="item.name"
                >
                    <div class="flowchart-operator-inputs">
                        <div class="flowchart-operator-connector-set">
                            <div class="flowchart-operator-connector">
                                <div class="flowchart-operator-connector-label"></div>
                                <div class="flowchart-operator-connector-arrow"></div>
                                <div class="flowchart-operator-connector-small-arrow"></div>
                            </div>
                        </div>
                    </div>
                    <div class="flowchart-operator-title">{{item.name}}</div>
                    <div class="flowchart-operator-body">
                        <p>Выберите контент письма</p>
                    </div>
                    <div class="flowchart-operator-outputs">
                        <div class="flowchart-operator-connector-set">
                            <div class="flowchart-operator-connector">
                                <div class="flowchart-operator-connector-label"></div>
                                <div class="flowchart-operator-connector-arrow"></div>
                                <div class="flowchart-operator-connector-small-arrow"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- <div class="flowchart-operator operator-trigger op-error">
                    <div class="flowchart-operator-title">Email</div>
                    <div class="flowchart-operator-body">
                        <p>Выберите контент письма</p>
                    </div>
                    <div class="flowchart-operator-outputs">
                        <div class="flowchart-operator-connector-set">
                            <div class="flowchart-operator-connector">
                                <div class="flowchart-operator-connector-small-arrow"></div>
                            </div>
                        </div>
                    </div>
                </div> -->
                    
            </div>

            <svg ref="constrolLinkLayer" class="flowchart-links-layer">
                
            </svg>

            <svg class="flowchart-temporary-link-layer" :style="{display:'none'}">
                <line x1="90" y1="94.42500305175781" x2="148.20001220703125" y2="132.8000030517578" stroke-dasharray="6,6" stroke-width="4" stroke="black" fill="none"></line>
            </svg>

        </div>
    </div>
</template>

<script lang="ts" setup>
/*
*       1) child can mutate parent's state by object/array nested prop || fire emit in child and let parent perform mutation (cb)
        2) initial state and perform

        kebab-kase -> camelCase

        Custom Input <CustomInput v-model="modelValue" || v-model:modelValue="modelValue"> -> emit('update:modelValue') :value="modelValue"  simplify -> use computed get && set
        emits: { ... }  validate () => true/false
        inside @input = " $event "
*/

/*
    get chartflow position right way, after initialize set static
    single move card flow

    x1,y1  curveX1,curveY1 curveX2,curveY2  x2,y2

    polygon
    g
    mask

    define input connector -
    canvas*

    x1,y1   x1 == curveX1, y1 + 100 === curveY1 &&  x2 === curveX2, y2 - 100 === curveY2  x2,y2

    x1,y1 -> path x1,y1 curveX1,curveY1
    x2,y2 -> path curveX2,curveY2 x2,y2
    
*/

interface ComponentPropsType {
    selectedConstructor: any;
    isMoved            : any;
    mousePosition      : any;
}

interface EmitsType {
    // (e: 'change', id: number): void
    // (e: 'update', value: string): void
}

import { ref, Ref, onMounted, onUnmounted, onUpdated, watch, isReactive, toRefs, computed, reactive, unref, isRef } from 'vue'
import { useRoute } from 'vue-router';

import { ManageConstructorMap, ManageCardConstructor, chartFlowPosition, ManageLinks } from '~/composables'
import { constructorPosition } from '~/composables/manageCardConstructor';
import { useStore } from '~/store';
import { ActionTypes } from '~/store/modules/action-types';

//  HOOKS
const store = useStore()
const route = useRoute()
//

const props = withDefaults(defineProps<ComponentPropsType>(), {
    selectedConstructor: {},
    isMoved: false,
    mousePosition: {
        mouseMoveXPosition: 0,
        mouseMoveYPosition: 0
    }
})

const flowchart: Ref<HTMLElement | null> = ref(null);
const flowChartPosition: Ref<DOMRect  | null> = ref(null);
const controlMap = ref({});
const controlConstructor = ref({});
const controlLink = ref({});
const constrolLinkLayer = ref({});


const constructorList: Ref<Array<{
    name: string,
    top?: number,
    left?: number,
    className?: string
}>> = ref([]);

// const { mouseMoveXPosition, mouseMoveYPosition } = toRefs(props.mousePosition)

watch(() => props.isMoved,(moved,prevModev) => {
    console.log('moved', props.isMoved)
    if( props.selectedConstructor.classList.contains( 'structure-elements__item' )){

        if(props.isMoved){

            console.log('inside moved')
            const idxConstructor = constructorList.value.findIndex((el) => el.name === props.selectedConstructor.dataset.name)
            if( idxConstructor === -1 ){
                constructorList.value.push({
                    name: props.selectedConstructor.dataset.name,
                    className: props.selectedConstructor.dataset.name === 'Email' ? 'op-message' : '',
                })
            }else {
                // exist
                constructorList.value[ idxConstructor ]['exist'] = true
            }
            

        } else if(!props.isMoved) {

            constructorList.value.forEach((constructor) => {

                if(props.selectedConstructor.dataset.name === constructor.name){
                    
                    constructor.top  = unref(mouseMoveYPosition);
                    constructor.left = unref(mouseMoveXPosition);
                }
                return constructor
            })
        }
    }
    console.log(constructorList.value, 'last val')
})

watch(() => props.selectedConstructor, (selectedConstr,prevSelectedConstr) => {
    console.log('indeside selectedConstr')
    if(props.selectedConstructor.classList.contains('flowchart-operator')){
        
        // new ManageCardConstructor( );           // props.selectedConstructor as HTMLDivElement, props.mousePosition, props.isMoved 
        
    }

})

const mouseMoveXPosition = computed(() => {
        if((chartFlowPosition.x + 110) <= props.mousePosition.mouseMoveXPosition && !chartFlowPosition.isClicked){
            return props.mousePosition.mouseMoveXPosition - (chartFlowPosition.x + 110)
        }
        return 0
})
const mouseMoveYPosition = computed(() => {
        if((chartFlowPosition.y + 85) <= props.mousePosition.mouseMoveYPosition && !chartFlowPosition.isClicked){
            return props.mousePosition.mouseMoveYPosition - (chartFlowPosition.y + 85)
        }
        return 0
})


watch(() => constructorPosition,
    (curVal) => {
        constructorList.value.forEach((constr) => {
            if(constr.name === curVal.currentConstructor){
                constr.top = curVal.y;
                constr.left = curVal.x;
            }
        })
    },
    {
        deep: true
    }
)

watch(() => chartFlowPosition,
    () => {
        
    },
    {
        deep: true
    }
)

// let pageX,pageY

// addEventListener('mousemove', mouseMoveHandler)

// function mouseMoveHandler (ev) {
//     pageX = ev.pageX;
//     pageY = ev.pageY;
// }


// const emits = defineEmits([''])     // pass name emit -> cb

onMounted(() => {
    
    flowChartPosition.value  = flowchart.value!.getBoundingClientRect();

    controlMap.value         = new ManageConstructorMap( flowchart.value as HTMLDivElement );

    controlConstructor.value = new ManageCardConstructor( constrolLinkLayer.value as SVGElement );

    controlLink.value        = new ManageLinks( constrolLinkLayer.value as SVGElement, chartFlowPosition );


    console.log( flowChartPosition.value );
    console.log( controlMap.value );
    console.log( controlLink.value, 'link' );
    // controlMap.initialize

    store.dispatch('messagesReducer/' + ActionTypes.GET_MESSAGE_LIST, route.params.id)

})



// onUpdated(() => {

//     console.log('updated')

// }),

onUnmounted(() => {
    (controlMap.value as ManageConstructorMap).moveBlockEl.removeEventListener('mousedown',(controlMap.value as ManageConstructorMap).onMouseDownId );
    removeEventListener('mouseup',( controlMap.value as ManageConstructorMap).onMouseUpId );

    removeEventListener('mousedown', ( controlConstructor.value as ManageCardConstructor).mouseDownId );
    removeEventListener('mouseup', ( controlConstructor.value as ManageCardConstructor).mouseUpId );

    removeEventListener('mouseup', (controlLink.value as ManageLinks).onMouseDownId);
    removeEventListener('mousedown', (controlLink.value as ManageLinks).onMouseUpHandlerId);
})



// Manage Constructor Flow

/*
    (mousedown | click) select constructor attach mousemove
    check whether mouse move

    to entire interface ->  mousemove -> X, Y position, adding constructor
    accordingly change top,left ( && closest svg line ) 
    
    mouseup ( remove mousemove ) set static position
*/

// function onClickHadnlerOperator(ev: Event ) {

//     new ManageCardConstructor( ev.currentTarget as HTMLDivElement, 0, 0);


// }


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

        & > * {
            pointer-events: none;
        }
        
    }
    @include b(op-error){
        border-color: #d4696a;
        box-shadow: 0 0 0 2px #d4696a;
    }
    @include b(op-message){
        & .flowchart-operator-title {
            background: #00A851;
        }
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
    @include b(flowchart-operator-inputs){
         pointer-events: auto;
         & .flowchart-operator-connector-small-arrow {
            top: -9px;
         }
         & .flowchart-operator-connector-arrow {
            top: -9px;
        }
    }
    @include b(flowchart-operator-outputs){
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        max-width: 170px;
        pointer-events: auto;
        & .flowchart-operator-connector-arrow {
            top: 0;
        }
      
    }
    @include b(flowchart-operator-connector-label) {
        position: absolute;
        width: 180px;
        height: 30px;
        top: -15px;
        color: transparent;
        opacity: 0;
    }
    @include b(flowchart-operator-connector-arrow) {
        width: 100%;
        height: 18px;
        background: transparent;
        position: absolute;
        z-index: 3;
        .flowchart-operator-inputs & {
            top: -9px;
        }
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
        
        &:hover .flowchart-operator-connector-small-arrow {
            transform: scale(1.2);
            background: #007D96;
            transition: all 30ms ease-in-out 15ms;
        }
    }
    @include b(flowchart-operator-connector-small-arrow) {
        width: 12px;
        height: 12px;
        position: absolute;
        left: calc(50% - 6px);
        background: #009FC1;
        border-radius: 50%;
        box-shadow: 0 0 0 3px #fff, 0 0 0 4px #fff, 0 5px 6px #00000080;
        z-index: 3;
        pointer-events: none;
    }

    @include b(flowchart-links-layer){
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* test */
        pointer-events: none;
    }
    

</style>