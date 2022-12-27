import { withToken } from '../api'

export const botAPI = {
    createBot(botCredentials){
        return withToken.post('bots/', botCredentials)
    },
    getBots(){
        return withToken.get('bots/')
    },
    updateBot(botId, botCred){
        return withToken.patch(`bots/${botId}/`, botCred)
    },

    generateBotCode(botId) {
        return withToken.post(`bots/${botId}/generate/`)
    },
    startBot(botId) {
        return withToken.post(`bots/${botId}/start/`)
    },
    stopBot(botId) {
        return withToken.post(`bots/${botId}/stop/`)
    }
}