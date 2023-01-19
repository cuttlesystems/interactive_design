import { withToken } from "../api"


const commandAPI = {
    
    getCommands(botId){
        return withToken.get(`bots/${botId}/commands/`)
    },

    createCommand: ( botId, credCommand ) => withToken.post( `bots/${botId}/commands/`, credCommand ),

    updateCommand( commandId, commandCred ){
        return withToken.patch( `command/${commandId}/`, commandCred )
    },

    deleteCommand(commandId){
        return withToken.delete(`command/${commandId}/`)
    },

    getCommandById(commandId){
        return withToken.get(`command/${commandId}/`)
    }
}

export default commandAPI