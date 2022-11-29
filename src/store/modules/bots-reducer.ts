import  { botAPI } from "api/bots";
import LocalStorageService from "~/utils/LocalStorageService";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutations-types";

interface SingleBotType {
    id: number | null;
    name: string;
    token: string;
    description: string;
    owner: number | null;
    start_message: string | null
}
export interface BotsState {
    bots: Array<SingleBotType>,
    currentBot: SingleBotType,
    
}

const state = (): BotsState => ({
    currentBot: {
        id: null,
        name: '',
        token: '',
        description: '',
        owner: null,
        start_message: ''
    },
    bots: []
}) 

const getters = {

}

const mutations = {
    [MutationTypes.SET_BOTS_LIST](state, list){
        state.bots = list
    }
}

const actions = {
    async [ActionTypes.GET_BOTS_LIST](context) {
        try{

            const res = await botAPI.getBots();
            
            if(res.status === 200){
                context.commit(MutationTypes.SET_BOTS_LIST, res.data)
                return Promise.resolve(res.data)
            }
            return Promise.reject(res)
        }catch(err){
            return Promise.reject(err)
        }
        
    },
    [ActionTypes.CREATE_BOT](context ,botCredentials){
        return Promise.resolve(botAPI.createBot(botCredentials))
    }
}

const botsReducer = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
export default botsReducer