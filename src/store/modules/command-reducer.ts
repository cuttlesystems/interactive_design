import commandAPI from "api/command";

import { Module } from "vuex";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutations-types";
import {RootState} from '../'



export type CommandType = {
    "id": number | null;
    "bot": number | null;
    "command": string | null;
    "description": string | null;
}

export type CommandState = {
    commandList: Array<CommandType>,
    currentCommand: CommandType | null,

    
}

const state = (): CommandState => ({

    currentCommand: null,
    commandList: []
})

const getters = {

}

const mutations = {

    [MutationTypes.APPEND_COMMAND](state, command) {

        state.currentCommand = command
        state.commandList.push(command)

    },

    [MutationTypes.UPDATE_COMMAND](state, command) {

        state.commandList.forEach((com) => {
            
            if(com.id === command.id) {
                Object.assign(com, command)
            }

            return com
        })

    },

    [MutationTypes.DELETE_COMMAND](state, commnadCred) {

        const foundIdx = state.commandList.findIndex( command => command.id === commnadCred.id )

        state.commandList.splice( foundIdx, 1 )

    },

    [MutationTypes.SET_COMMAND_LIST](state, listCommand) {
        state.commandList = listCommand
    },

    [MutationTypes.SET_CURRENT_COMMAND](state, command) {
        state.currentCommand = command
    }

}

const actions = {

    async [ActionTypes.CREATE_COMMAND](context, commandCred) {

        try {

            const res = await commandAPI.createCommand(context.rootState.botsReducer.currentBot.id, commandCred)

            if( res.status === 201 ) {

                context.commit( MutationTypes.APPEND_COMMAND, res.data )
                
                return res
            }

            return Promise.reject(res)
            
        } catch(err){

            return err

        }

    },

    async [ActionTypes.DELETE_COMMAND](context, command) {

        const res = await commandAPI.deleteCommand(command.id)

        if (res.status === 204) {

            context.commit( MutationTypes.DELETE_COMMAND, command )

            return res
        }

    },

    async [ActionTypes.GET_LIST_COMMAND](context) {

        try {

            const res = await commandAPI.getCommands(context.rootState.botsReducer.currentBot.id)

            if(res.status === 200) {
                context.commit( MutationTypes.SET_COMMAND_LIST, res.data )
            }

            return res

        } catch(err) {

            return err

        }

        
    },

    async [ActionTypes.UPDATE_COMMAND](context, command) {

        try {
            
            const res = await commandAPI.updateCommand( context.state.currentCommand.id, command )

            context.commit(MutationTypes.UPDATE_COMMAND, res.data)

            return res

        } catch (err) {

            return err

        }

    }


}

const commandReducer: Module< CommandState, RootState > = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}

export default commandReducer