import { withToken } from '../api'

export const botAPI = {
    createBot(botCredentials){
        return withToken.post('bots/', botCredentials)
    },
    getBots(){
        return withToken.get('bots/')
    },

    generateBotCode(botId) {
        
        return withToken.post(`bots/${botId}/generate/`)
    }
}