import { isRef, reactive, Ref, toRef } from "vue";
import store from "~/store";
import { ActionTypes } from "~/store/modules/action-types";
import { MessageType } from "~/store/modules/message-reducer";
import { MutationTypes } from "~/store/modules/mutations-types";
import { chartFlowPosition, ConstructorPositionType } from "./manageChartFlow";

type MousePosition = {
    x: MouseEvent['pageX'];
    y: MouseEvent['pageY'];
}

interface IManageCardConstructor {

    // cardConstructor: HTMLDivElement;
    
}

type DotsPosition = {
    output: {
        x: number;
        y: number;
    },
    input: {
        x: number;
        y: number;
    }
}

type InitialPosition = {
    pathEl: SVGPathElement;
    staticDotsPosition: {
        x: number;
        y: number;
        optionX?: number;
        optionY?: number; 
    }
}

type InfoPath = {
    inputs: {
        currentConstructorInputPosition: DOMRect;
        items: Array<InitialPosition>;
    },
    outputs: {
        items: Array<InitialPosition>;
    }
}


export const constructorPosition = reactive({
    x: 0,
    y: 0,
    currentConstructor: ''
})

class ManageCardConstructor implements IManageCardConstructor { // Playing inside class
    #id: null | number;
    #IS_MOVE: boolean = false;


    #startPositionX: MouseEvent['pageX'];
    #startPositionY: MouseEvent['pageY'];
    #selectedConstructor: HTMLDivElement | null;
    #constructorPosition: DOMRect;

    #currentConstructor: MessageType;

    computedPositionX: number;
    computedPositionY: number;

    mouseDownId: (ev) => void;
    mouseUpId: (ev) => void;
    mouseMoveId: (ev) => void;

    pathOutput: SVGPathElement | null;
    pathInput: SVGPathElement | null;
    polygon: SVGPolygonElement | null;
    rect: SVGRect | null;
    
    positionPathOutput: Array<string>
    positionPathInput: Array<string>
    
    // TEST

    computedOutputLinkXRight: number;
    computedOutputLinkYRight: number;
    computedInputLinkXRight: number;
    computedInputLinkYRight: number;

    computedOutputLinkXLeft: number;
    computedOutputLinkYLeft: number;
    computedInputLinkXLeft: number;
    computedInputLinkYLeft: number;

    dotsPositionOutput: DotsPosition;
    dotsPositionInput: DotsPosition;

    #managePath: InfoPath;

    constructor( private readonly _constrolLinkLayer: SVGElement, store, private readonly _chartFlowPosition: ConstructorPositionType ) {

        this.mouseDownId = this.onMouseDown.bind(this)
        this.mouseUpId   = this.onMouseUp.bind(this)
        this.mouseMoveId   = this.onMouseMove.bind(this)

        addEventListener('mousedown', this.mouseDownId)

        addEventListener('mouseup', this.mouseUpId)

        // _cardConstructor.addEventListener('mouseleave', this.mouseLeave.bind(this))     // creates new instance, multiply event listener / click
        // console.log(_mouseMoveXPosition, _mouseMoveYPosition, 'positions')
        // this.#id = requestAnimationFrame(this.moveConstructor.bind(this))
    }

    onMouseDown(ev: MouseEvent) {           // SETS TWO POINTS

        console.log('MOUSE DOWN EVENT')
        
        if((ev.target as HTMLDivElement).classList.contains('flowchart-operator')){ // OVER CONSTRUCTOR

            /*
                output | input
            */

            this.#startPositionX = ev.pageX;
            this.#startPositionY = ev.pageY;
            this.#selectedConstructor = ev.target as HTMLDivElement;

            this.#constructorPosition = this.#selectedConstructor.getBoundingClientRect()

            //          ALSO HAVE OPTIONS LINK
            //          FIND ALL ATTACHED LINKS FROM OPTIONS(DATA-KEY)  -> OUTPUT   constructorList.options(next_constructor-id)
            //          FIND ALL CONNECTED OPTIONS TO CURRENT CONSTRUCTOR   -> INPUT
            //          constructorList renders all constructors(have options -> info next_constructor) with @click -> 
            //          when select constructor get all options attached to constructor
                  
            //          GET FROM LINK LAYER APPROPRIATE LINKS
            //          0--0--0

            // FIND ALL LINKS
            console.log(this.#selectedConstructor.dataset.constructorid, 'CURRENT ID FROM DOM')
            this.#currentConstructor = store.getters[ 'messagesReducer/' + 'findCurrentMessage'](this.#selectedConstructor.dataset.constructorid);
            console.log(this.#currentConstructor, 'CURRENT CONSTRUCTOR FROM STORE')
            this.#managePath = new ManagePath( this.#currentConstructor, this._constrolLinkLayer );

            // this.pathOutput = this._constrolLinkLayer.querySelector(`#${this.#selectedConstructor?.dataset.linkOutput?.replace(/(--output|--input)/g,'')}`);
            // this.pathInput = this._constrolLinkLayer.querySelector(`#${this.#selectedConstructor?.dataset.linkInput?.replace(/(--output|--input)/g,'')}`);
            

            //  whether have left or right sides

            // this.polygon = this._constrolLinkLayer.querySelector(`#${this.#selectedConstructor?.dataset.link?.replace(/(--output|--input)/g,'')}`);
            
            //          o--o--o
            
            // RIGHT SIDE
            // if( this.pathOutput || this.pathInput ){

            //     this.positionPathOutput = (this.pathOutput || this.pathInput)!.getAttribute('d')?.split(' ') as Array<string>
            //     this.dotsPositionOutput = {
            //         output: {
            //             x: parseFloat(this.positionPathOutput[0].replace(/(^M|\,.*)/,'')),
            //             y: parseFloat(this.positionPathOutput[0].replace(/^M.*\,/,'')),
            //         },
            //         input: {
            //             x: parseFloat(this.positionPathOutput[3].replace(/\,.+/,'')),
            //             y: parseFloat(this.positionPathOutput[3].replace(/.+\,/,''))
            //         }
            //     }
                    
            //     if(this.pathInput && this.pathOutput){
            //         //  LEFT SIDE
            //         this.positionPathInput = this.pathInput!.getAttribute('d')?.split(' ') as Array<string>
            //         this.dotsPositionInput = {
            //             output: {
            //                 x: parseFloat(this.positionPathInput[0].replace(/(^M|\,.*)/,'')),
            //                 y: parseFloat(this.positionPathInput[0].replace(/^M.*\,/,'')),
            //             },
            //             input: {
            //                 x: parseFloat(this.positionPathInput[3].replace(/\,.+/,'')),
            //                 y: parseFloat(this.positionPathInput[3].replace(/.+\,/,''))
            //             }
            //         }

            //     }

            // }
            //

            addEventListener('mousemove', this.mouseMoveId)
            
        }

    }

    onMouseMove(ev: MouseEvent) {
        
        this.computedPositionX = this.#constructorPosition.x + (ev.pageX - this.#startPositionX ) - chartFlowPosition.x - 110
        this.computedPositionY = this.#constructorPosition.y + (ev.pageY - this.#startPositionY ) - chartFlowPosition.y - 85

        this.#IS_MOVE = true;

        if( this.computedPositionX > 0 && this.computedPositionY > 0 && this.#selectedConstructor ){
            
            this.#selectedConstructor!.style.left = `${this.computedPositionX}px`

            this.#selectedConstructor!.style.top = `${this.computedPositionY}px`
        }

        // if(  && this.#selectedConstructor ){


        // }


        // MOVE LINK

        // fc__path_#idx-- (output | input) -> #idx = 1 -- AUTOINCREMENT
        
        // OUTPUT //
        // Array of path -> computedInput
        
            
        this.#managePath.inputs.items.forEach((item) => {
            if(item) {
                const computedPositionX = this.#managePath.inputs.currentConstructorInputPosition.x + (ev.pageX - this.#startPositionX ) - chartFlowPosition.x - 110;
                const computedPositionY = this.#managePath.inputs.currentConstructorInputPosition.y + (ev.pageY - this.#startPositionY ) - chartFlowPosition.y - 85;

                if(this.computedPositionX > 0 && this.computedPositionY > 0) {
                    item.pathEl.setAttribute('d', `M${item.staticDotsPosition.x },${item.staticDotsPosition.y } C${ item.staticDotsPosition.x },${item.staticDotsPosition.y + 100 } ${ computedPositionX },${computedPositionY - 100 } ${ computedPositionX },${computedPositionY }`);
                }
                
                return item
            }
        });



        this.#managePath.outputs.items.forEach((item) => {

            if(item) {
                const computedPositionX = item.staticDotsPosition.optionX as number + (ev.pageX - this.#startPositionX );
                const computedPositionY = item.staticDotsPosition.optionY as number + (ev.pageY - this.#startPositionY );
                
                if(this.computedPositionX > 0 && this.computedPositionY > 0) {

                    item.pathEl.setAttribute('d', `M${ computedPositionX },${ computedPositionY } C${ computedPositionX },${ computedPositionY + 100 } ${ item.staticDotsPosition.x },${item.staticDotsPosition.y - 100 } ${ item.staticDotsPosition.x },${item.staticDotsPosition.y }`);

                }
                
                return item
            }
            
        });


        // if( this.pathOutput || this.pathInput  ){

        //     this.computedOutputLinkXRight = this.dotsPositionOutput.output!.x + (ev.pageX - this.#startPositionX )  
        //     this.computedOutputLinkYRight = this.dotsPositionOutput.output!.y + (ev.pageY - this.#startPositionY ) 

        //     this.computedInputLinkXRight = this.dotsPositionOutput.input!.x + (ev.pageX - this.#startPositionX ) 
        //     this.computedInputLinkYRight = this.dotsPositionOutput.input!.y + (ev.pageY - this.#startPositionY )
            
        //     // INPUT
        //     if(this.pathInput && this.pathOutput) {
        //         // this.computedOutputLinkXLeft = this.dotsPositionInput.output!.x + (ev.pageX - this.#startPositionX )  
        //         // this.computedOutputLinkYLeft = this.dotsPositionInput.output!.y + (ev.pageY - this.#startPositionY ) 

        //         this.computedInputLinkXLeft = this.dotsPositionInput.input!.x + (ev.pageX - this.#startPositionX ) 
        //         this.computedInputLinkYLeft = this.dotsPositionInput.input!.y + (ev.pageY - this.#startPositionY )

        //     }

        //     if(/output/g.test((this.#selectedConstructor?.dataset.linkOutput as string)) ){

        //         this.pathOutput!.setAttribute('d', `M${this.computedOutputLinkXRight },${this.computedOutputLinkYRight } C${this.computedOutputLinkXRight },${this.computedOutputLinkYRight + 100 } ${this.dotsPositionOutput.input!.x },${this.dotsPositionOutput.input!.y - 100 } ${this.dotsPositionOutput.input!.x },${this.dotsPositionOutput.input!.y }`);
                
        //     }

        //     if(/input/g.test((this.#selectedConstructor?.dataset.linkInput as string))  ){
                
        //         this.pathInput!.setAttribute('d', `M${this.dotsPositionOutput.output!.x },${this.dotsPositionOutput.output!.y } C${this.dotsPositionOutput.output!.x },${this.dotsPositionOutput.output!.y + 100 } ${this.computedInputLinkXRight },${this.computedInputLinkYRight - 100 } ${this.computedInputLinkXRight },${this.computedInputLinkYRight }`);
                
        //     }

        //     if( this.pathOutput && this.pathInput ) {

        //         this.pathInput!.setAttribute('d', `M${this.dotsPositionInput.output!.x },${this.dotsPositionInput.output!.y } C${this.dotsPositionInput.output!.x },${this.dotsPositionInput.output!.y + 100 } ${this.computedInputLinkXLeft },${this.computedInputLinkYLeft - 100 } ${this.computedInputLinkXLeft },${this.computedInputLinkYLeft }`);

        //     }
        // }
        //  third conditional both
        
    }

    onMouseUp(ev : MouseEvent) {
        console.log('MOUSE UP EVENT')

        if( 
            this.#selectedConstructor!?.classList.contains('flowchart-operator') 
            && this.computedPositionX > 0 
            && this.computedPositionY > 0 
            && this.#IS_MOVE 
        ) {

            this.#IS_MOVE = false;
            store.dispatch('messagesReducer/' + ActionTypes.UPDATE_CONSTRUCTOR, {
                id: this.#selectedConstructor!.dataset.constructorid,    // TO FIND APPROPRIATE CONSTRUCTOR
                coordinate_x: this.computedPositionX,
                coordinate_y: this.computedPositionY
            })
            
        }
        
        this.resetState()
        
    }

    resetState() {
        
        this.#selectedConstructor = null

        this.mouseMoveId && removeEventListener('mousemove', this.mouseMoveId)
    }

    // get cardConstructor(){
    //     return this._cardConstructor
    // }

    moveConstructor(){
        // this._cardConstructor.style.top = this.mousePosition.y
        // this.#id = requestAnimationFrame(this.moveConstructor.bind(this))
    }

    mouseLeave() {
        console.log(this)
    }

}


class ManagePath {

    inputs;
    outputs;

    constructor( currentConstructor: MessageType, private readonly _constrolLinkLayer: SVGElement ){
        
        this.inputs = {
            currentConstructorInputPosition: (() => document.querySelector(`#constructor__input-${currentConstructor.id}`)?.getBoundingClientRect())(),
            items: currentConstructor?.next_variants?.map((option) => {                    // INITIAL SINGLE DOT OF CONSTRUCTOR
                    
                    const pathEl = _constrolLinkLayer.querySelector(`#fc__path-${option.id}`);
                    if(pathEl){
                        console.log(pathEl, 'PATH ELEMENT')
                        const dAttrArr = (pathEl as SVGPathElement).getAttribute('d')?.split(' ') as Array<string>;
                        
                        return {
                            pathEl,
                            staticDotsPosition: {
                                x: parseFloat(dAttrArr[0].replace(/(^M|\,.*)/,'')),
                                y: parseFloat(dAttrArr[0].replace(/^M.*\,/,'')),
                            }
                        }
                    }
                    

                })

        };

        this.outputs = {

            items: currentConstructor?.current_variants?.map((option) => {
                
                    const pathEl = _constrolLinkLayer.querySelector(`#fc__path-${option.id}`);

                    if(pathEl) {

                        const dAttrArr = (pathEl as SVGPathElement).getAttribute('d')?.split(' ') as Array<string>;
    
                        return {
                            pathEl,
                            staticDotsPosition: {
                                optionX: parseFloat(dAttrArr[0].replace(/(^M|\,.*)/,'')),
                                optionY: parseFloat(dAttrArr[0].replace(/^M.*\,/,'')),
                                x: parseFloat(dAttrArr[3].replace(/\,.+/,'')),
                                y: parseFloat(dAttrArr[3].replace(/.+\,/,'')),
                            }
                        }
                    }

            })

        }

        
    }

}


export default ManageCardConstructor

