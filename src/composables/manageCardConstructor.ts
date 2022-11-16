import { isRef, reactive, toRef } from "vue";
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


export const constructorPosition = reactive({
    x: 0,
    y: 0,
    currentConstructor: ''
})

class ManageCardConstructor implements IManageCardConstructor {
    #id: null | number;

    #countX = 1;
    #countY = 1;

    #startPositionX: MouseEvent['pageX'];
    #startPositionY: MouseEvent['pageY'];
    #selectedConstructor: HTMLDivElement | null;
    #constructorPosition: DOMRect

    computedPositionX: number;
    computedPositionY: number;

    mouseDownId: (ev) => void;
    mouseUpId: (ev) => void;
    mouseMoveId: (ev) => void;

    path: SVGPathElement | null;
    positionPath: Array<string>
    
    // TEST

    computedOutputLinkX: number;
    computedOutputLinkY: number;
    computedInputLinkX: number;
    computedInputLinkY: number;

    dotsPosition: DotsPosition;

    constructor(private readonly _constrolLinkLayer: SVGElement) {

        this.mouseDownId = this.onMouseDown.bind(this)
        this.mouseUpId   = this.onMouseUp.bind(this)
        this.mouseMoveId   = this.onMouseMove.bind(this)

        addEventListener('mousedown', this.mouseDownId)

        addEventListener('mouseup', this.mouseUpId)

        // _cardConstructor.addEventListener('mouseleave', this.mouseLeave.bind(this))     // creates new instance, multiply event listener / click
        // console.log(_mouseMoveXPosition, _mouseMoveYPosition, 'positions')
        // this.#id = requestAnimationFrame(this.moveConstructor.bind(this))
    }

    onMouseDown(ev: MouseEvent) {

        if((ev.target as HTMLDivElement).classList.contains('flowchart-operator')){

            /*
                output | input
            */

            this.#startPositionX = ev.pageX;
            this.#startPositionY = ev.pageY;
            this.#selectedConstructor = ev.target as HTMLDivElement;

            this.#constructorPosition = this.#selectedConstructor.getBoundingClientRect()


            this.path = this._constrolLinkLayer.querySelector(`#${this.#selectedConstructor?.dataset.link?.replace(/(--output|--input)/g,'')}`);
            if(this.path){
                
                this.positionPath = this.path!.getAttribute('d')?.split(' ') as Array<string>
                this.dotsPosition = {
                    output: {
                        x: parseFloat(this.positionPath[0].replace(/(^M|\,.*)/,'')),
                        y: parseFloat(this.positionPath[0].replace(/^M.*\,/,'')),
                    },
                    input: {
                        x: parseFloat(this.positionPath[3].replace(/\,.+/,'')),
                        y: parseFloat(this.positionPath[3].replace(/.+\,/,''))
                    }
                }

            }

            addEventListener('mousemove', this.mouseMoveId)
            
        }

    }

    onMouseMove(ev: MouseEvent) {
        
        this.computedPositionX = this.#constructorPosition.x + (ev.pageX - this.#startPositionX ) - chartFlowPosition.x - 110
        this.computedPositionY = this.#constructorPosition.y + (ev.pageY - this.#startPositionY ) - chartFlowPosition.y - 85

        

        if(this.#countX == 5 && this.computedPositionX > 0 ){
            
            this.#selectedConstructor!.style.left = `${this.computedPositionX}px`
            this.#countX = 1

        }

        if(this.#countY == 5 && this.computedPositionY > 0){

            this.#selectedConstructor!.style.top = `${this.computedPositionY}px`
            this.#countY = 1

        }

        if(this.#countX > 5){
            this.#countX = 1
        }
        if(this.#countY > 5){
            this.#countY = 1
        }
        
        this.#countX++
        this.#countY++
        // console.log(this.#startPositionX = ev.pageX,
        //     this.#startPositionY = ev.pageY,)


        // MOVE LINK

        // fc__path_#idx-- (output | input) -> #idx = 1 -- AUTOINCREMENT
        if( this.#selectedConstructor?.dataset.link ){
            
            this.computedOutputLinkX = this.dotsPosition.output!.x + (ev.pageX - this.#startPositionX )  
            this.computedOutputLinkY = this.dotsPosition.output!.y + (ev.pageY - this.#startPositionY ) 

            this.computedInputLinkX = this.dotsPosition.input!.x + (ev.pageX - this.#startPositionX )  
            this.computedInputLinkY = this.dotsPosition.input!.y + (ev.pageY - this.#startPositionY ) 

            if(/output/g.test((this.#selectedConstructor?.dataset.link as string))){

                this.path!.setAttribute('d', `M${this.computedOutputLinkX },${this.computedOutputLinkY } C${this.computedOutputLinkX },${this.computedOutputLinkY + 100 } ${this.dotsPosition.input!.x },${this.dotsPosition.input!.y - 100 } ${this.dotsPosition.input!.x },${this.dotsPosition.input!.y }`)
     
            } else if(/input/g.test((this.#selectedConstructor?.dataset.link as string))){

                this.path!.setAttribute('d', `M${this.dotsPosition.output!.x },${this.dotsPosition.output!.y } C${this.dotsPosition.output!.x },${this.dotsPosition.output!.y + 100 } ${this.computedInputLinkX },${this.computedInputLinkY - 100 } ${this.computedInputLinkX },${this.computedInputLinkY }`)

            }
        }
        
        
        
    }

    onMouseUp(ev : MouseEvent) {

        if( this.#selectedConstructor!?.classList.contains('flowchart-operator') ){
            if(this.computedPositionX > 0 ){
                constructorPosition.x = this.computedPositionX
            }
            if(this.computedPositionY > 0){
                constructorPosition.y = this.computedPositionY
            }
            constructorPosition.currentConstructor = this.#selectedConstructor!.dataset.name as string
        }
        
        this.#selectedConstructor = null

        removeEventListener('mousemove', this.mouseMoveId)

        // if(this.#isEventListener){
        //     console.log('up')
        //     removeEventListener('mousemove', ManageCardConstructor.onMouseMove)
        // }
        
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

export default ManageCardConstructor