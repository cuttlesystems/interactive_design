import { onMounted, onUnmounted } from "vue"

type ContextListener = {
    target: Element | Window;
    event: string;
    cb: (ev) => void
};

export const useEventListener = ({ target , event, cb }: ContextListener ) => {

    onMounted(() => {
        target.addEventListener(event, cb)
    })

    onUnmounted(() => {
        target.removeEventListener(event, cb)
    })

}