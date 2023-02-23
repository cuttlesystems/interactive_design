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
    start_message?: string | null | number;
    error_message?: string | null | number;
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
    getCurrentBotId: (state,getters) => state.currentBot.id,
    findDeletedBot: (state, getters) => (deletedBotId) => state.bots.findIndex((bot) =>  bot.id == deletedBotId)
}

const mutations = {

    [MutationTypes.SET_BOTS_LIST](state, list){
        state.bots = list
    },

    [MutationTypes.SET_BOT_START_MESSAGE_OR_ERROR](state, statOfMessage){
        debugger
        state.currentBot = {
            ...state.currentBot,
            ...statOfMessage
        }
    },

    [MutationTypes.APPEND_CREATED_BOT](state, newBotCred) {
        state.bots.push(newBotCred)
    },

    [MutationTypes.REMOVE_BOT_FROM_LIST](state, botId) {
        const foundIndex = state.bots.findIndex((activeBotId) => botId == activeBotId)
        state.bots.splice(foundIndex, 1)
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
        const foundIndex = state.activeBots.findIndex((activeBotId) => botId === activeBotId)
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

    async [ActionTypes.CREATE_BOT](context ,botCredentials){
        let res

        try {

            res = await botAPI.createBot(botCredentials);
            
            context.commit(MutationTypes.APPEND_CREATED_BOT, res.data)

        } catch(err) {


        }

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
                    context.commit( MutationTypes.APPEND_ACTIVE_BOT, parseInt(config.botId) )
                }
                break;
            case 'stop':
                res = await botAPI.stopBot(config.botId);
                if(res.status === 200) {
                    context.commit( MutationTypes.REMOVE_ACTIVE_BOT, parseInt(config.botId) )
                }
                break;
        }
        
        return res
        
    },

    async [ActionTypes.UPDATE_BOT]( { getters, rootState, commit } , config) {
        let res
        try {
            console.log(rootState.messagesReducer)
            debugger
            res = await botAPI.updateBot( getters['getCurrentBotId'] , {
                start_message: config.start_message ? rootState.messagesReducer.currentMessage.id : null,
                error_message: config.error_message ? rootState.messagesReducer.currentMessage.id : null
            } );
            
            // commit( MutationTypes.SET_BOT_START_MESSAGE_OR_ERROR , {
            //     start_message: res.data.start_message,
            //     error_message: res.data.error_message
            // } );
                
            // } else if( config.type === 'error_message' ) {

            //     res = await botAPI.updateBot( getters['getCurrentBotId'] , {
            //         error_message: config.resetErrorMessage ? null : rootState.messagesReducer.currentMessage.id
            //     } );
    
            //     commit(MutationTypes.SET_BOT_START_MESSAGE_OR_ERROR, {
            //         error_message: res.data.error_message
            //     });

            // }

            
            return res

        } catch(err) {
            throw err;
        }

    },

    async [ActionTypes.DELETE_BOT]( { commit, getters, state } , botId) {

        let res, foundDeletedBotIdx, foundBot;

        try {
            foundDeletedBotIdx = getters['findDeletedBot'](botId);

            foundBot = state.bots[foundDeletedBotIdx - 1];
            res = await botAPI.deteleBot(botId);
            commit(MutationTypes.REMOVE_BOT_FROM_LIST, botId);

            return {
                foundBot,
                res
            }

        } catch(err) {
            
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