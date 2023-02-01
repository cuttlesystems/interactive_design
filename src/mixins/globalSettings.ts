import { defineComponent } from "vue";



export default defineComponent({
    methods: {
        __(text, parametrs = {}){
            return this.$store.getters.translate(text, parametrs)
        }
    },

    directives: {
        'click-outside':{
            mounted(el, binding, vnode, prevNode){
                
                console.log(el, binding, vnode, prevNode, 'el,  bindind, vnode, prevNode')
                
                el.clickOutsideEvent = function (ev) {

                    if(! (el == ev.target || el.contains(ev.target))) {
                        binding.value(ev)
                    }

                }
                document.addEventListener('click', el.clickOutsideEvent)
            },
            unmounted(el) {
                document.removeEventListener('click', el.clickOutsideEvent)
            },
        }
    }

})

