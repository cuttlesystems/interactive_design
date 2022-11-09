import { ref } from "vue"
import { useEventListener } from "./useEventListener"




export const useMouse = () => {

    const mouseMoveXPosition = ref(0)
    const mouseMoveYPosition = ref(0)

    function mouseMoveHandler(ev: MouseEvent) {
        mouseMoveXPosition.value = ev.pageX
        mouseMoveYPosition.value = ev.pageY
    }
    
    useEventListener({ target: window, event: 'mousemove', cb: mouseMoveHandler })
    

    return {
        mouseMoveXPosition,
        mouseMoveYPosition
    }
}