import { computed, defineComponent, reactive, ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useStore } from "~/store";
import { ActionTypes } from "~/store/modules/action-types";
import { useRoute, useRouter } from "vue-router";


interface LoginState {
    
}
interface LoginProps {

}

export default defineComponent<LoginState,LoginProps>({
    
    components:{

    },

    setup(props, context) {
        
        const store = useStore()
        const router = useRouter()
        const route = useRoute()

        console.log(store.state, 'store')
        const state = reactive({
            email: '',
            password: ''
        })

        const rules = computed(() => ({
            email:  { required },
            password: { required }
        }))

        const v$ = useVuelidate(rules, state)

        function submitHandler() {

            store.dispatch('authReducer/' + ActionTypes.LOGIN, {
                email: state.email,
                password: state.password
            }).then(() => {
                store.state.authReducer.authToken && router.push({name: 'chart'})
            })

            

        }
       

        return {
            v$,
            state,
            submitHandler
        }
    },
   
})