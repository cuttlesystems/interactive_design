import messagesAPI from "api/messages";
import optionsAPI from "api/message-options";
import { Module } from "vuex";
import LocalStorageService from "~/utils/LocalStorageService";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutations-types";
import {RootState} from '../'

export interface MessageType {
    id?: number
    text?: string
    photo?:  any
    video?:  any
    file?:  any
    bot?: number
    coordinate_x?: number
    coordinate_y?: number

    name?: string,
    top?: number,
    left?: number,
    className?: string;
    uuid?: number;

    current_variants?: Array<OptionType>;
    next_variants?: Array<OptionType>; 
}
export enum INITIAL_VALUE {
    TEMP_NAME_CONSTRUCTOR = 'Введите название'
}

type NewMessage = {
    uuid?: number;
    coordinate_x: number;
    coordinate_y: number;
}

type OptionType = {
    id: number;
    text: string;
    current_message: number;
    next_message: number | null;

    computePathPosition?: string;
}
export interface MessageState {
    constructorList: Array<MessageType>;
    optionListAll: Array<OptionType>;

    currentMessage: MessageType | null;
    newMessage: NewMessage | null;
    optionsListTemp: Array<OptionType>;
    isBlockSideBar: boolean;
    EDIT_CONSTRUCTOR_FORM: boolean;
}

const state = (): MessageState => ({
    constructorList: [],
    optionListAll: [],

    currentMessage: null,       // USED WHEN:  EDIT && DELETE && UPDATE -> CLICK
    newMessage: null,           // USED WHEN CREATE -> 

    optionsListTemp: [],
    
    isBlockSideBar: false,
    EDIT_CONSTRUCTOR_FORM: false,
});

const getters = {
    getCurrentMessage: (state,getters) => state.currentMessage,
    findCurrentMessage: (state, getters) => (messageId) => state.constructorList.find((constructor) => constructor.id == messageId)
}

const mutations = {
    [MutationTypes.IS_BLOCK_SIDEBAR](state, bol) {  // CAN BE USED ISNTEAD EDIT_CONSTRUCTOR_FORM
        state.isBlockSideBar = bol;
    },
    [MutationTypes.EDIT_CONSTRUCTOR_FORM](state, bol) { // FIRED ON CLICK
        state.EDIT_CONSTRUCTOR_FORM = bol;
    },

    // HANDLE GLOBAL LIST MESSAGES

    [MutationTypes.SET_INITIAL_CONSTRUCTOR_LIST](state, constructorData){
        state.constructorList = constructorData
    },
    [MutationTypes.EDIT_CONSTRUCTOR_LIST](state, constructorData){
        state.constructorList.push(constructorData)
    },
    [MutationTypes.SET_CONSTRUCTOR_COORDINATE](state, constructorCoordinate){   //  USED WHEN INITIAL SET COORDINATE && CREATE MESSAGE
        
        state.constructorList.forEach((constructor) => {
            
            if(constructorCoordinate.tempName === constructor.tempName) {

                // constructor.coordinate_x = constructorCoordinate.coordinate_x
                // constructor.coordinate_y = constructorCoordinate.coordinate_y
                Object.assign(constructor, constructorCoordinate)
                //  SET DATA FROM FETCH
                if(constructorCoordinate.resetTempName){
                    delete constructor.tempName;
                    delete constructor.resetTempName
                }
                 
            }
            return constructor
        });

        if(constructorCoordinate.tempName === INITIAL_VALUE.TEMP_NAME_CONSTRUCTOR) {    // DANGE FIRED WHEN MOUSE UP & FROM CREATE FORM
            state.newMessage = constructorCoordinate;                                   // NEED FOR POST -> COORDINATE

        }

    },
    //  MANAGE CONSTRUCTOR
    [MutationTypes.UPDATE_CONSTRUCTOR](state, updatedConstructor){  //  USED UPDATE NAME CONSTRUCTOR && UPDATE COORDINATE CONSTRUCTOR
        
        state.constructorList.forEach((constructor) => {
            if(parseInt(updatedConstructor.id) === parseInt(constructor.id)) {
                state.newMessage = {...constructor};

                Object.assign(constructor, updatedConstructor);
                
                state.currentMessage = constructor;
            }
            return constructor
        });

    },
    [MutationTypes.DELETE_CONSTRUCTOR](state, constructorId){
        const foundIndexConstructor = state.constructorList.findIndex((constructor) => constructor.id == constructorId);
        state.constructorList.splice(foundIndexConstructor, 1);
    },
    //

    [MutationTypes.SET_CURRENT_MESSAGE](state, currentMessage){
        state.currentMessage = currentMessage
    },
    [MutationTypes.RESET_CURRENT_MESSAGE](state){
        state.currentMessage = null
    },

    [MutationTypes.SET_NEW_MESSAGE](state, newMessage) {
        state.newMessage = newMessage
    },
    
    //              OPTIONS
    [MutationTypes.SET_NEW_OPTION_NAME](state, newOptionCred) { // Message id && optionsListTemp RESETS WHEN CLOSE FORM

        state.optionsListTemp.push(newOptionCred);

        state.constructorList.forEach(constructor => {
            if(constructor.id === state.currentMessage.id){
                
                constructor.current_variants = [ ...new Set(constructor.current_variants.concat(state.optionsListTemp))]    // STRANGE BEHAVIOR CONSTRUCTOR.CURRENT_VARIANTS
            }
            return constructor
        })
        
    },
    [MutationTypes.RESET_TEMP_OPTIONS_LIST](state) {
        state.optionsListTemp = []
    },
    [MutationTypes.DELETE_OPTION](state, option){

        state.constructorList.forEach((constructor) => {

            if(constructor.id == state.currentMessage.id) {
                const foundOptionIdx = constructor.current_variants.findIndex((opt) => opt.id === option.id)
                constructor.current_variants.splice(foundOptionIdx, 1);

            }

            return constructor
        });

        const optionIdx = state.optionsListTemp.findLastIndex((opt) => opt.id === option.id);
        state.optionsListTemp.splice(optionIdx, 1);

    },
    

    //                      LINK LAYER
    [MutationTypes.ATTACH_COMPUTED_PATH_POSITION](state){
        
    },
    
    [MutationTypes.UPDATE_OPTION](state, optionCred) {

        state.constructorList.forEach((constructor) => {
            if(constructor.id == optionCred.current_message) {
                constructor.current_variants.forEach((option) => {
                    if(option.id == optionCred.id) Object.assign(option, optionCred)
                    return option
                })
            }
            if(constructor.id == optionCred.next_message) {
                constructor.next_variants.push(optionCred)
            }
            return constructor
        })
        
    },

}

const actions = {

    async [ActionTypes.GET_MESSAGE_LIST](context, botID) {
        try{
            const res = await messagesAPI.getMessages(botID);
            
            if(res.status === 200){
                context.commit(MutationTypes.SET_INITIAL_CONSTRUCTOR_LIST, res.data)

                // context.commit(MutationTypes.ATTACH_COMPUTED_PATH_POSITION)

                return Promise.resolve(res.data)
            }
            return Promise.reject(res)
        }catch(err){
            return Promise.reject(err)
        }
        
    },

    async [ActionTypes.CREATE_MESSAGE](context , { botID, messageCred }){
        try {
            const res = await messagesAPI.createMessage( botID, messageCred );
            
            if(res.status === 201) {
    
                res.data.hasOwnProperty('current_variants') ? null : res.data.current_variants = [];
                
                context.commit( MutationTypes.SET_CURRENT_MESSAGE, res.data )       // SETS CURRENT MESSAGE
                context.commit( MutationTypes.SET_CONSTRUCTOR_COORDINATE, {         // SETS NEW MESSAGE
                    tempName: INITIAL_VALUE.TEMP_NAME_CONSTRUCTOR,
                    resetTempName: true,
                    ...res.data
                })
                return Promise.resolve(res)
            }

        } catch(err) {
            console.log(err)
            throw TypeError('New Error')
        }

    },

    async [ActionTypes.UPDATE_CONSTRUCTOR](context, updatedConstructor){    // change state inside && fire mutation in promise
        //  CALLED FROM MANAGE CONSTRUCTOR AND EDIT FORM
        context.commit(MutationTypes.UPDATE_CONSTRUCTOR, updatedConstructor);
        const res = await messagesAPI.updateMessage(context.state.currentMessage.id, context.state.currentMessage);
        if(res.status !== 200) {    // HANDLE move or reset
            context.commit(MutationTypes.UPDATE_CONSTRUCTOR, context.state.newMessage);
        }
        return Promise.resolve(res)
    },
    // DELETE
    async [ActionTypes.DELETE_CONSTRUCTOR](context, constructorId){
        
        const res = await messagesAPI.deleteMessage(constructorId);
        
        if(res.status === 204) {
            context.commit(MutationTypes.DELETE_CONSTRUCTOR, constructorId);
            return Promise.resolve(res)
        }
        return Promise.reject(res)
    },

    async [ActionTypes.FIND_CURRENT_CONSTRUCTOR](context, payloadConstructor){
        
        const foundConstructor = context.getters.findCurrentMessage(payloadConstructor.id);
        context.commit(MutationTypes.SET_CURRENT_MESSAGE, foundConstructor);

    },


    //      OPTIONS
    async [ActionTypes.CREATE_NEW_OPTION](context, optionName){
        
        const res = await optionsAPI.createOption(
            context.state.currentMessage.id,
            {
                current_message: context.state.currentMessage.id,
                text: optionName
            }
        );
        if(res.status === 201){
            context.commit(MutationTypes.SET_NEW_OPTION_NAME, res.data)
            return Promise.resolve(res)
        }
        Promise.reject(res)
    },

    async [ActionTypes.GET_OPTION_LIST](context, constructorId){
        const res = await optionsAPI.getOptions(constructorId);
        if(res.status === 200){
            return res.data
        }
        return Promise.reject(res)
    },

    async [ActionTypes.DELETE_OPTION](context, option){
        
        const res = await optionsAPI.deleteOption(option.id);

        if(res.status === 204) {

            context.commit(MutationTypes.DELETE_OPTION, option);
            return Promise.resolve(res)

        }

        return Promise.reject(res);
    },

    async [ActionTypes.UPDATE_OPTION](context, optionCred) {    // NEED NEXT CONSTRUCTOR ID

        let optionPayload = {
            next_message: optionCred.constructorId
        };
        
        try {

            const res = await optionsAPI.updateOption(optionCred.optionId, optionPayload);
            if(res.status === 200) {
                context.commit(MutationTypes.UPDATE_OPTION, res.data)
    
                return res

            }

            return Promise.reject(res)

        } catch(err) {
            return Promise.reject(err)
        }


    }

}


function findCurrentMessage( messageId ) {
    
}

const messagesReducer: Module<MessageState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}

export default messagesReducer