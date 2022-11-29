import { computed, defineComponent, onBeforeMount, onMounted, onUnmounted, ref } from "vue";

import { AppComponentProps, AppComponentData } from '@t/types'

import { SvgIcon } from "./components";

import AppDefaultLayout from './layouts/AppDefaultLayout.vue'
import MainLayout from './layouts/MainLayout.vue'
import EmptyLayout from './layouts/EmptyLayout.vue'

import withOutToken, { withToken } from "./api";
import attachInterceptors from "./interceptors/attachInterceptors";

import { MutationTypes } from "./store/modules/mutations-types";
import { ActionTypes } from "./store/modules/action-types";
import { useStore } from "./store";
import { mapState } from "vuex";
import { useRoute } from "vue-router";


export default defineComponent<AppComponentProps,AppComponentData>({

    components: {
        SvgIcon,
        AppDefaultLayout,
        MainLayout,
        EmptyLayout
    },

    setup(){
        const blankRouteList = ref(['login'])
        const store = useStore();
        const route = useRoute()

        onBeforeMount(() => {
            store.commit(MutationTypes.SET_EJECT_AXIOS , attachInterceptors([withToken, withOutToken], store) );
            console.log('app before mount')
        })

        onUnmounted(() => {
            // withToken.interceptors.request.eject(ejectInstance.)
            store.dispatch(ActionTypes.EJECT_INSTANSE_AXIOS)
        })

        return {
            isAuth: computed(() => store.getters.getToken),
            currentLayout:  computed(() => route.meta.layout || store.state.currentLayout),
            blankRouteList,
        }
    },


})