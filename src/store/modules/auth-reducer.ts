import { authAPI } from "api/auth";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutations-types";

type AuthCredentials = {
    email: string;
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
        state.authToken = payload.token
    }
}

const actions = {
    async [ActionTypes.LOGIN]( { state, commit }, credentials: AuthCredentials){           // commit('module/mutation')

        const res = await authAPI.login(credentials)
        res && commit(MutationTypes.SET_USER_CREDENTIALS, res.data.data)
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