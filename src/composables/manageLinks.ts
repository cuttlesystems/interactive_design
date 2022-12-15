import { reactive } from "vue";
import { ConstructorPositionType } from "./manageChartFlow";

interface IManageLinks {

    onMouseDownHandler: (ev) => void;
    onMouseUpHandler: (ev) => void;
    onMouseMoveHandler: (ev) => void;

}

/*
*   change position card along with link
*   
*   links layer, basic auth, nginx
*/



class ManageLinks implements IManageLinks{

    onMouseDownId: (ev) => void;
    onMouseUpHandlerId: (ev) => void;
    #onMouseMoveHadnlerId: (ev) => void;

    #outputArrowPosition: DOMRect;
    #inputArrowPosition: DOMRect;
    #idx: number = 1;

    #maskId: number = 1

    parentOutputConstructor: HTMLDivElement | null = null;
    parentInputConstructor: HTMLDivElement | null = null;

    #isCreateLink = false;

    

    constructor(private readonly _svgBlock: SVGElement, private readonly _chartFlowPosition: ConstructorPositionType){

        this.onMouseDownId = this.onMouseDownHandler.bind(this)
        this.onMouseUpHandlerId = this.onMouseUpHandler.bind(this)
        this.#onMouseMoveHadnlerId = this.onMouseMoveHandler.bind(this)

        addEventListener('mousedown', this.onMouseDownId)
        addEventListener('mouseup', this.onMouseUpHandlerId)
    }

    onMouseDownHandler(ev) {

        // line svg

        if( ev.target.classList.contains('flowchart-operator-connector-arrow') && !ev.path.find((el) => el.classList?.contains('flowchart-operator-inputs')) ) {
            this.#isCreateLink = true;
            const arrowOutput = ev.target.nextElementSibling;
            
            this.parentOutputConstructor = ev.path.find((el) => el.classList.contains('flowchart-operator'));

            if( arrowOutput.classList.contains('flowchart-operator-connector-small-arrow') ){

                this.#outputArrowPosition = arrowOutput.getBoundingClientRect();        // get output dot position
                
                addEventListener('mousemove', this.#onMouseMoveHadnlerId);

            }

        }

    }

    onMouseMoveHandler() {



    }

    onMouseUpHandler(ev) {
        console.log('up');
        
        console.log(this._chartFlowPosition, 'flow pos');
        console.log(this.#outputArrowPosition, 'output');

        console.log(ev, '321');
        
        // not allowed to connect its own input
        this.parentInputConstructor = ev.path.find((el) => el?.classList?.contains('flowchart-operator'));
        const isInput = ev.path.find((el) => el?.classList?.contains('flowchart-operator-inputs'));
        
        if(ev.target.classList.contains('flowchart-operator-connector-arrow') && this.#isCreateLink && this.parentOutputConstructor !== this.parentInputConstructor && isInput){
            this.#isCreateLink = false;
            const arrowInput = ev.target.nextElementSibling;        // get input dot position
            
            this.#inputArrowPosition = arrowInput.getBoundingClientRect();

            const path = `<g>
                <mask id="fc_mask_${this.#maskId}">
                    <rect x="0" y="0" width="100%" height="100%" stroke="none" fill="white" />
                    <polygon stroke="none" fill="black" points="${this.#outputArrowPosition.x - this._chartFlowPosition.x - 110 - 10},${this.#outputArrowPosition.y - this._chartFlowPosition.y - 85 - 10} ${this.#outputArrowPosition.x - this._chartFlowPosition.x - 110},${this.#outputArrowPosition.y - this._chartFlowPosition.y - 85} ${this.#outputArrowPosition.x - this._chartFlowPosition.x - 110 - 10},${this.#outputArrowPosition.y - this._chartFlowPosition.y - 85 + 10}"></polygon>
                </mask>
                <g class="flowchart-link" data-link_id="${this.#idx}" id="fc_path_${this.#idx}_g" >
                    <path id="fc__path-${this.#idx}" stroke-width="3" fill="none" d="M${this.#outputArrowPosition.x - this._chartFlowPosition.x - 110},${this.#outputArrowPosition.y - this._chartFlowPosition.y - 85} C${this.#outputArrowPosition.x - this._chartFlowPosition.x - 110},${this.#outputArrowPosition.y - this._chartFlowPosition.y + 100 - 85} ${this.#inputArrowPosition.x - this._chartFlowPosition.x - 110},${this.#inputArrowPosition.y - this._chartFlowPosition.y - 100 - 85} ${this.#inputArrowPosition.x - this._chartFlowPosition.x - 110},${this.#inputArrowPosition.y - this._chartFlowPosition.y - 85}"
                    stroke="#3366ff"></path>
                    <rect x="${this.#outputArrowPosition.x - this._chartFlowPosition.x - 110 - 10}" y="${this.#outputArrowPosition.y - this._chartFlowPosition.y - 85 - 10}" width="11" height="2" fill="#3366ff" stroke="none" mask="fc_mask_${this.#maskId}" />
                </g>
            </g>
            `;
            
            this._svgBlock.insertAdjacentHTML('afterbegin', path);

            //      SET CONNECTION TAGS
            //      CREATION STEP
            //      FETCHING STEP AJAX  []
            //      data-key -> uuid
            //      0--0--0

            this.parentOutputConstructor!.dataset.linkOutput = `fc__path-${this.#idx}--output`;     // One
            this.parentInputConstructor!.dataset.linkInput  = `fc__path-${this.#idx}--input`;       // MANY
            this.#maskId++;
            this.#idx++;
        }

        removeEventListener('mousemove', this.#onMouseMoveHadnlerId);

    }

}


export default ManageLinks