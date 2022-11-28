import { authAPI } from "api/auth";
import LocalStorageService from "~/utils/LocalStorageService";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutations-types";

/*  Typescript
*       
    interface Obj<T> { => aslo with Class<Generic>
        (a: T):T
    }
*   <Obj,Key extends keyof Obj>(obj: Obj, key: Key) => obj[key]
*                                                                 { c: new(): GenericClassType } || new () => GenericClassType
    keyof => key of obj, typeof + ReturnType<typeof function>, value and types not the same
    index access number | 'someString'

    Conditional:
        type NameOrId<T extends number | string > = {
            T extends number ? INumber 
                             : IString
        }
        <T extends number | string>(param: T): NameOrId<T> => {throw 'noimplemented}
        type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
            ? Return
            : never;
*/

type AuthCredentials = {
    username: string;
    password: string;
}

export type UserInfoType = {
    email: string;
    id: number;
    username: string;
}

export interface AuthState {
    authToken: string;
    currentUser: UserInfoType | object;
}

const state = (): AuthState => ({
    authToken: '',
    currentUser: {},
})

const getters = {
    getUserInfo( state, getters, rootState ){
        return state
    }
    
}

const mutations = {
    [MutationTypes.SET_USER_CREDENTIALS](state, payload){       // rootState 3
        state.authToken = payload.auth_token
    },
    [MutationTypes.SET_USER_INITIAL_CREDENTIALS](state, payload) {
        state.currentUser = payload
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
    },
    async [ActionTypes.INITIALIZE_USER](context){
        const res = await authAPI.getUserInfo();
        console.log(res, 'payload')
        context.commit(MutationTypes.SET_USER_INITIAL_CREDENTIALS, ...res.data)
        
    },
}


const authReducer = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}


export default authReducer