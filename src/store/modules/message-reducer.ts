import  messagesAPI from "api/messages";
import { Module } from "vuex";
import LocalStorageService from "~/utils/LocalStorageService";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutations-types";
import {RootState} from '../'

export interface MessageType {
    id: number
    text: string
    photo:  any
    video:  any
    file:  any
    bot: number
    coordinate_x: number
    coordinate_y: number
}
export interface MessageState {
    messages: Array<MessageType>;
    currentMessage: MessageType | null;
}

const state = (): MessageState => ({
    messages: [],
    currentMessage: null
}) 

const getters = {
    getCurrentMessage: (state,getters) => state.currentMessage
}

const mutations = {
    [MutationTypes.SET_LIST_MESSAGE](state, listMessage){
        state.messages = listMessage
    },
    
    [MutationTypes.SET_CURRENT_MESSAGE](state, currentMessage){
        state.currentMessage = currentMessage
    },

}

const actions = {

    async [ActionTypes.GET_MESSAGE_LIST](context, botID) {
        try{
            const res = await messagesAPI.getMessages(botID);
            
            if(res.status === 200){
                context.commit(MutationTypes.SET_LIST_MESSAGE, res.data)
                return Promise.resolve(res.data)
            }
            return Promise.reject(res)
        }catch(err){
            return Promise.reject(err)
        }
        
    },

    [ActionTypes.CREATE_MESSAGE](context , { botID, messageCred }){
        return Promise.resolve(messagesAPI.createMessage(botID,messageCred))
    },

}

const messagesReducer: Module<MessageState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}

export default messagesReducer