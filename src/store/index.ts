import { InjectionKey } from 'vue';
import { createStore, createLogger, Store, useStore as baseUseStore } from 'vuex';
import { ActionTypes } from './modules/action-types';
import { MutationTypes } from './modules/mutations-types';
import authReducer, { AuthState } from './modules/auth-reducer';

/*
    computed: mapState( object alias || array ) mix with outer object spread 

    getters: ( state, getters ) => compute  this.$store & ...mapGetters([])
    mutations: [AC] (state) {} & mapMutations

    actions : someAC{ root: true, handler: fn }          dispatch('someAC', { root: true })

    Bind namespace mapState, mapGetters, mapActions, mapMutations   (some/nested/module, [] || {})
*/

interface RootState {
    initialized: boolean;
    authReducer: AuthState;
}

export const key: InjectionKey<Store<RootState>> = Symbol()             // shid.d vuex
    
const debug = process.env.NODE_ENV !== 'production';


export default createStore<RootState>({
    
    state: {
        initialized: false
    } as RootState,

    mutations:{
        [MutationTypes.INITIALIZE](state){
            state.initialized = true;
        }
    },

    actions:{
        [ActionTypes.INITIALIZE_APP](context){
            context.commit(MutationTypes.INITIALIZE)
        }
    },

    modules: {
        authReducer
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})

export const useStore = () => baseUseStore(key)

