import { InjectionKey } from 'vue';
import { createStore, createLogger, Store, useStore as baseUseStore } from 'vuex';

import { ActionTypes } from './modules/action-types';
import { MutationTypes } from './modules/mutations-types';

import authReducer, { AuthState } from './modules/auth-reducer';
import botsReducer, { BotsState } from './modules/bots-reducer';
import messagesReducer, { MessageState } from './modules/message-reducer';
import commandReducer, { CommandState } from './modules/command-reducer';

import withOutToken, { withToken } from '~/api';
import { authAPI } from '~/api/auth';

/*
    computed: mapState( object alias || array ) mix with outer object spread 

    getters: ( state, getters ) => compute  this.$store & ...mapGetters([])
    mutations: [AC] (state) {} & mapMutations

    actions : someAC{ root: true, handler: fn }          dispatch('someAC', { root: true })

    Bind namespace mapState, mapGetters, mapActions, mapMutations   (some/nested/module, [] || {})
*/

export interface RootState {
    initialized: boolean;
    currentLayout: string;
    ejectInstanseAxios: {

    };

    
    messagesReducer: MessageState;
    authReducer: AuthState;
    botsReducer: BotsState;
    commandReducer: CommandState;


    currentBot: {};
    isExpandSideBar: boolean;
    
}

export const key: InjectionKey<Store<RootState>> = Symbol()             // shid.d vuex
    
const debug = process.env.NODE_ENV !== 'production';


export default createStore<RootState>({
    
    state: {
        initialized: false,
        ejectInstanseAxios: {},
        currentLayout: 'MainLayout',
        currentBot: {},
        isExpandSideBar: true,
    } as RootState,

    getters: {
        getToken: (state) => state.authReducer.authToken || localStorage.getItem('authToken'),
        translate: (state,getters) => (text, parameters) => {
            
            return text
        }
    },

    mutations:{
        [MutationTypes.INITIALIZE](state){
            state.initialized = true;
        },
        [MutationTypes.SET_EJECT_AXIOS](state, ejectInstanseAxios){
            state.ejectInstanseAxios = ejectInstanseAxios
        },
        [MutationTypes.SET_CURRENT_BOT](state, bot) {
            state.currentBot = bot
            state.botsReducer.currentBot = bot
        },
        [MutationTypes.SET_IS_EXPAND_SIDEBAR](state, bool) {
            state.isExpandSideBar = bool
        },
        [MutationTypes.SET_CURRENT_LAYOUT](state, layout) {
            state.currentLayout = layout
        }
    },

    actions: {
        [ActionTypes.INITIALIZE_APP](context){
            context.commit(MutationTypes.INITIALIZE)
            
        },
        
        [ActionTypes.EJECT_INSTANSE_AXIOS](context) {
            for ( let [key,val] of Object.entries(context.state.ejectInstanseAxios)){
                (val as Array<number>).forEach((ejectId,idx) => {
                    if(idx === 0){
                        return withToken.interceptors.request.eject(ejectId)
                    }
                    withOutToken.interceptors.request.eject(ejectId)
                })
            }
        }
    },

    modules: {
        authReducer,
        botsReducer,
        messagesReducer,
        commandReducer
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})

export const useStore = () => baseUseStore(key)

