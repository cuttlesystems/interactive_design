// export class Map {
//     static isMouseDown = false
//     static reduceAF
  
//     static xOffset
//     static yOffset
//     static startPositionX = 0
//     static startPositionY = 0
//     static mouseMoveXPosition
//     static mouseMoveYPosition
//     static distanceX
//     static distanceY
//     static distancePositionX
//     static distancePositionY
  
//     static ZOOMED_LEFT_BORDER = 0
//     static ZOOMED_RIGHT_BORDER = -10000
//     static ZOOMED_BOTTOM_BORDER = -10000
//     static ZOOMED_TOP_BORDER = 0
  
//     static id
  
//     static set zoomedRightBorder(width) {
//       this.ZOOMED_RIGHT_BORDER = width
//     }
  
//     constructor(zoomBlock, mapSVG) {
//       this.zoomBlock = zoomBlock
//       this.mapSVG = mapSVG
//     }
  
//     getInstanceMap() {
//       return this
//     }
  
//     computedDistance() {
//       return `translateX(${this.distancePositionX}px) translateY(${this.distancePositionY}px) scale(1.7) translateZ(0px)`;
//     }
//   //
//     static onMouseDown(ev) {
//       this.isMouseDown = true
//       this.reduceAF = true;
//       this.id = null
//       this.zoomBlock.style.transitionDuration = "0ms";
  
//       this.xOffset = this.zoomBlock.getBoundingClientRect().x;
//       this.yOffset = this.zoomBlock.getBoundingClientRect().y;
  
//       if ("ontouchstart" in document.documentElement) {
//         this.startPositionX = ev.touches[0].pageX;
//         this.startPositionY = ev.touches[0].pageY;
//         // ev.preventDefault();
//       } else {
//         this.startPositionX = ev.pageX;
//         this.startPositionY = ev.pageY;
//       }
  
//       this.mapSVG.style.cursor = "grabbing";
//       this.mouseMoveRef = Map.onMouseMove.bind(this)
//       window.addEventListener("mousemove", this.mouseMoveRef, {passive: false});
//       window.addEventListener("touchmove", this.mouseMoveRef, {passive: false});
//     }
  
//     static onMouseMove(ev) {
  
//       if ("ontouchstart" in document.documentElement)  {
//         this.mouseMoveXPosition = ev.touches[0].pageX;
//         this.mouseMoveYPosition = ev.touches[0].pageY;
//         // ev.preventDefault();
//       } else {
//         this.mouseMoveXPosition = ev.pageX;
//         this.mouseMoveYPosition = ev.pageY;
//       }
  
//       this.distanceX = this.mouseMoveXPosition - this.startPositionX + this.xOffset;
//       this.distanceY = this.mouseMoveYPosition - this.startPositionY + this.yOffset;
//       // console.log(window.innerWidth) // 1920 - (-1360) || 1440 - (-1840)
//       // console.log(window.innerHeight) // 937 - (-657) || 702 - (-1052) Map.ZOOMED_RIGHT_BORDER window.innerWidth - 3280)
//       if (this.distanceX < Map.ZOOMED_LEFT_BORDER && this.distanceX > window.innerWidth - 3265) {
//         this.distancePositionX = this.distanceX;
//       }
//       if (this.distanceY > window.innerHeight - 2178 && this.distanceY < Map.ZOOMED_TOP_BORDER) {
//         this.distancePositionY = this.distanceY;
//       }
  
  
//       if (this.reduceAF && this.isMouseDown) {
//         this.reduceAF = false;
  
//         !!this.id && window.cancelAnimationFrame(this.id);
//         this.id = window.requestAnimationFrame(this.moveMap.bind(this));
//       }
//     }
  
//     moveMap(timestamp) {
//       this.reduceAF = true;
//       this.zoomBlock.style.transform = this.computedDistance()
  
//       this.id = requestAnimationFrame(this.moveMap);
//     }
  
//     static onMouseUp() {
//       window.removeEventListener("mousemove", this.mouseMoveRef);
//       window.removeEventListener("touchmove", this.mouseMoveRef);
//       this.isMouseDown = false;
//       this.mapSVG.style.cursor = "grab";
//     }
// }

// onDown, onMove, onUp

interface IManageConstuctorMap {
    moveBlockEl: HTMLDivElement;
    onMouseDown: (ev: MouseEvent) => void;
    onMouseMove: (ev: MouseEvent) => void;
    onMouseUp  : () => void;
}

enum BOUND {
    LEFT_BOUND = 1424,
    RIGHT_BOUND = -6000,
    TOP_BOUND = 600,
    BOTTOM_BOUND = -5990
}

class ManageConstructorMap implements IManageConstuctorMap {
    #_isMouseDown: boolean;
    #_reduceAF   : boolean;
    #idAF        : null | number;

    #xOffset     : number;
    #yOffset     : number;

    #startPositionX: number;
    #startPositionY: number;

    #mouseMoveXPosition : number;
    #mouseMoveYPosition : number;

    computedDistanceX: number;
    computedDistanceY: number;

    distancePositionX: Number;
    distancePositionY: Number;

    #onMouseMoveHandler: (ev: MouseEvent) => void;

    constructor(protected _moveBlockEl: HTMLDivElement){
        _moveBlockEl.addEventListener('mousedown', this.onMouseDown.bind(this))
        addEventListener('mouseup', this.onMouseUp.bind(this))
    }

    get moveBlockEl() {
        return this._moveBlockEl
    }

    onMouseDown(ev) {
        
        this.#_isMouseDown = true
        this.#_reduceAF    = true
        this._moveBlockEl.style.transition = 'none 0s ease 0s';

        this.#xOffset = this._moveBlockEl.getBoundingClientRect().x;     // left  1424 > n right -6000 < n , top 600 > n , bottom -6166.4 < n
        this.#yOffset = this._moveBlockEl.getBoundingClientRect().y;

        if ("ontouchstart" in document.documentElement) {
            this.#startPositionX = ev.touches[0].pageX;
            this.#startPositionY = ev.touches[0].pageY;
        } else {
            this.#startPositionX = ev.pageX;
            this.#startPositionY = ev.pageY;
        }
        this.#onMouseMoveHandler = this.onMouseMove.bind(this)
        addEventListener('mousemove', this.#onMouseMoveHandler, { passive: false })

    }

    onMouseMove(ev) {

        if ("ontouchstart" in document.documentElement)  {
            this.#mouseMoveXPosition = ev.touches[0].pageX;         // edge document === getboundrect.x
            this.#mouseMoveYPosition = ev.touches[0].pageY;
        } else {
            this.#mouseMoveXPosition = ev.pageX;
            this.#mouseMoveYPosition = ev.pageY;
        }

        this.computedDistanceX = this.#mouseMoveXPosition - this.#startPositionX + this.#xOffset - 100;
        this.computedDistanceY = this.#mouseMoveYPosition - this.#startPositionY + this.#yOffset - 100;

        if (this.computedDistanceX < BOUND.LEFT_BOUND && this.computedDistanceX > BOUND.RIGHT_BOUND) {
            this.distancePositionX = this.computedDistanceX;
        }
        if (this.computedDistanceY > BOUND.BOTTOM_BOUND && this.computedDistanceY < BOUND.TOP_BOUND) {
            this.distancePositionY = this.computedDistanceY;
        }

        if (this.#_reduceAF && this.#_isMouseDown) {
            this.#_reduceAF = false;
      
            this.#idAF && cancelAnimationFrame(this.#idAF);
            this.#idAF = requestAnimationFrame(this.moveMap.bind(this));
        }
    }
    // backface-visibility: hidden; transform-origin: 50% 50%; cursor: move; transition: none 0s ease 0s;
    moveMap(){
        this.#_reduceAF = true;
        this._moveBlockEl.style.transform = this.computedDistance()
        this._moveBlockEl.style.backfaceVisibility = 'hidden';
        this._moveBlockEl.style.transformOrigin = '50% 50%';
        this._moveBlockEl.style.cursor = 'grabbing';
        this._moveBlockEl.style.transition = 'none 0s ease 0s';


        this.#idAF = requestAnimationFrame(this.moveMap.bind(this)); 
    }

    computedDistance() {
        return `matrix(1, 0, 0, 1, ${this.distancePositionX}, ${this.distancePositionY})`
        // return `translateX(${this.distancePositionX}px) translateY(${this.distancePositionY}px) scale(1.7) translateZ(0px)`;
    }

    onMouseUp() {
        this.#onMouseMoveHandler! && removeEventListener('mousemove', this.#onMouseMoveHandler)
    }

}

export default ManageConstructorMap