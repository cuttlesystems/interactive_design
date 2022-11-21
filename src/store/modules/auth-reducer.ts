import { authAPI } from "api/auth";
import LocalStorageService from "~/utils/LocalStorageService";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutations-types";

type AuthCredentials = {
    username: string;
    password: string;
}
export interface AuthState {
    authToken: string;
}

const state = (): AuthState => ({
    authToken: ''
})

const getters = {
    getUserInfo( state, getters, rootState ){
        return state
    }
    
}

const mutations = {
    [MutationTypes.SET_USER_CREDENTIALS](state, payload){       // rootState 3
        state.authToken = payload.auth_token
    }
}

const actions = {
    async [ActionTypes.LOGIN]( { state, commit }, credentials: AuthCredentials){           // commit('module/mutation')
        const localStorage: typeof LocalStorageService = LocalStorageService.getService();
        
        const res = await authAPI.login(credentials);
        if(res.status === 200) {
            commit(MutationTypes.SET_USER_CREDENTIALS, res.data)
            localStorage.setToken(res.data.auth_token)
        }
    }
}


const authReducer = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}


export default authReducer