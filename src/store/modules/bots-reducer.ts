import  { botAPI } from "api/bots";
import LocalStorageService from "~/utils/LocalStorageService";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutations-types";

export interface SingleBotType {
    id: number | null;
    name: string;
    token: string;
    description: string;
    owner: number | null;
    start_message: string | null
}
export interface BotsState {
    bots: Array<SingleBotType>;
    currentBot: SingleBotType;
    activeBots: Array<number>;
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
    bots: [],
    activeBots: []
}) 

const getters = {
    getCurrentBotId: (state,getters) => state.currentBot.id
}

const mutations = {

    [MutationTypes.SET_BOTS_LIST](state, list){
        state.bots = list
    },

    [MutationTypes.SET_BOT_START_MESSAGE](state, start_message){
        state.currentBot.start_message = start_message;
    },

    [MutationTypes.SET_CURRENT_BOT](state, bot) {
        state.currentBot = bot
    },
    [MutationTypes.SET_ACTIVE_BOTS](state, bot) {
        state.activeBots = bot
    },
    [MutationTypes.APPEND_ACTIVE_BOT](state, botId) {
        state.activeBots.push(botId)
    },
    [MutationTypes.REMOVE_ACTIVE_BOT](state, botId) {
        const foundIndex = state.activeBots.findIndex(botId)
        state.activeBots.splice(foundIndex, 1)
    },

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

    async [ActionTypes.GET_ACTIVE_BOTS](context) {

        const res = await botAPI.getActiveBots()
        context.commit(MutationTypes.SET_ACTIVE_BOTS, res.data)

        return res
    },

    async [ActionTypes.GET_BOT_BY_ID](context, botId) {

        const res = await botAPI.getBotsById(botId)

        context.commit(MutationTypes.SET_CURRENT_BOT, res.data)

        return res
    },

    [ActionTypes.CREATE_BOT](context ,botCredentials){
        return Promise.resolve(botAPI.createBot(botCredentials))
    },

    async [ActionTypes.GENERATE_BOT_FILES](context, botId){
        return await botAPI.generateBotCode(botId)
    },
    async [ActionTypes.BOT_TOGGLER](context, config){

        let res;

        switch(config.type) {
            case 'start':
                res = await botAPI.startBot(config.botId);
                if(res.status === 200) {
                    context.commit( MutationTypes.SET_CURRENT_BOT, parseInt(config.botId) )
                }
                break;
            case 'stop':
                res = await botAPI.stopBot(config.botId);
                if(res.status === 200) {
                    context.commit( MutationTypes.REMOVE_ACTIVE_BOT, parseInt(config.botId) )
                }
                break;
            default:
                return Promise.reject('Try again')
        }
        
        return res
        
    },

    async [ActionTypes.UPDATE_BOT]( { getters, rootState, commit } , setNullNextMessage: boolean) {

        try {

            const res = await botAPI.updateBot( getters['getCurrentBotId'] , {
                start_message: setNullNextMessage ? null : rootState.messagesReducer.currentMessage.id
            } );

            commit(MutationTypes.SET_BOT_START_MESSAGE, res.data.start_message);
            
            return res

        } catch(err) {
            throw err;
        }

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