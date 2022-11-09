import { isRef, reactive, toRef } from "vue";
import { chartFlowPosition } from "./manageChartFlow";

type MousePosition = {
    x: MouseEvent['pageX'];
    y: MouseEvent['pageY'];
}

interface IManageCardConstructor {

    // cardConstructor: HTMLDivElement;
    
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

    constructor() {
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

            this.#startPositionX = ev.pageX;
            this.#startPositionY = ev.pageY;
            this.#selectedConstructor = ev.target as HTMLDivElement;

            this.#constructorPosition = this.#selectedConstructor.getBoundingClientRect()

            
            addEventListener('mousemove', this.mouseMoveId)

        }

    }

    onMouseMove(ev: MouseEvent) {
        
        this.computedPositionX = this.#constructorPosition.x + (ev.pageX - this.#startPositionX ) - chartFlowPosition.x - 110
        this.computedPositionY = this.#constructorPosition.y + (ev.pageY - this.#startPositionY ) - chartFlowPosition.y - 85

        if(this.#countX == 31 && this.computedPositionX > 0 ){
            
            this.#selectedConstructor!.style.left = `${this.computedPositionX}px`
            this.#countX = 1

        }

        if(this.#countY == 31 && this.computedPositionY > 0){

            this.#selectedConstructor!.style.top = `${this.computedPositionY}px`
            this.#countY = 1

        }

        if(this.#countX > 31){
            this.#countX = 1
        }
        if(this.#countY > 31){
            this.#countY = 1
        }
        
        this.#countX++
        this.#countY++
        // console.log(this.#startPositionX = ev.pageX,
        //     this.#startPositionY = ev.pageY,)
    }

    onMouseUp(ev : MouseEvent) {

        if(this.#selectedConstructor!?.classList.contains('flowchart-operator')){
            constructorPosition.x = this.computedPositionX
            constructorPosition.y = this.computedPositionY
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