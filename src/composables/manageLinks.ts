
interface IManageLinks {

    onMouseDownHandler: (ev) => void;
    onMouseUpHandler: (ev) => void;
    onMouseMoveHandler: (ev) => void;

}


class ManageLinks implements IManageLinks{
    #onMouseDownId: (ev) => void;
    #onMouseUpHandlerId: (ev) => void;
    #onMouseMoveHadnlerId: (ev) => void;

    #outputArrowPosition: DOMRect
    #inputArrowPosition: DOMRect

    constructor(private readonly _svgBlock: SVGElement){
        this.#onMouseDownId = this.onMouseDownHandler.bind(this)
        this.#onMouseUpHandlerId = this.onMouseUpHandler.bind(this)
        this.#onMouseMoveHadnlerId = this.onMouseMoveHandler.bind(this)

        addEventListener('mousedown', this.#onMouseDownId)
        addEventListener('mouseup', this.#onMouseUpHandlerId)
    }

    onMouseDownHandler(ev) {

        if(ev.target.classList.contains('flowchart-operator-connector-arrow')) {

            const arrowOutput = ev.target.nextElementSibling

            if( arrowOutput.classList.contains('flowchart-operator-connector-small-arrow') ){

                this.#outputArrowPosition = arrowOutput.getBoundingClientRect();

                addEventListener('mousemove', this.#onMouseMoveHadnlerId);

            }
            

        }

    }

    onMouseMoveHandler() {



    }

    onMouseUpHandler(ev) {

       
        
        if(ev.target.classList.contains('flowchart-operator-connector-arrow')){
            const arrowInput = ev.target.nextElementSibling
            
            this.#inputArrowPosition = arrowInput.getBoundingClientRect()

            const path = `<path stroke-width="3" fill="none" d="M${this.#outputArrowPosition.x - 110},${this.#outputArrowPosition.y - 85} C${this.#outputArrowPosition.x - 110},${this.#outputArrowPosition.y + 100 - 85} ${this.#inputArrowPosition.x - 110},${this.#inputArrowPosition.y - 100 - 85} ${this.#inputArrowPosition.x - 110},${this.#inputArrowPosition.y - 85}"
            stroke="#ACCAD6"></path>
            `

            this._svgBlock.insertAdjacentHTML('afterbegin',path)
        }

        removeEventListener('mousemove', this.#onMouseMoveHadnlerId)

    }

}


export default ManageLinks