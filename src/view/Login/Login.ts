import { computed, defineComponent, reactive, ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'
import { useStore } from "~/store";
import { ActionTypes } from "~/store/modules/action-types";
import { useRoute, useRouter } from "vue-router";


interface LoginState {

}
interface LoginProps {

}


export default defineComponent<LoginState, LoginProps>({

    components: {

    },

    setup(props, context) {

        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        console.log(context)

        const state = reactive({
            username: '',
            password: ''
        })

        interface ErrorState {
            loginField: null | string
        }

        const errors: ErrorState = reactive({
            loginField: null
        })

        const rules = computed(() => ({
            username: { required, maxLengthValue: maxLength(10) },
            password: { required, maxLengthValue: maxLength(10), firstCharacter }
        }))

        const v$ = useVuelidate(rules, state)

        async function submitHandler() {

            const isValid = await v$.value.$validate()

            if (isValid) {
                store.dispatch('authReducer/' + ActionTypes.LOGIN, {
                    username: state.username,
                    password: state.password
                }).then((res) => {
                    console.log(res, 'd')
                    store.state.authReducer.authToken && router.push({ name: 'main' })
                }).catch((err) => {
                    if (err.response.status === 400) {
                        errors.loginField = 'Не правильный логин или пароль'
                    }
                })
            }


        }

        function firstCharacter(val) {
            return /^[a-z]/g.test(val)
        }


        return {
            v$,
            state,
            submitHandler,
            errors
        }
    },

})