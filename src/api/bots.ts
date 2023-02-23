import { withToken } from '../api'

export const botAPI = {
    createBot(botCredentials){
        return withToken.post('bots/', botCredentials)
    },
    getBots(){
        return withToken.get('bots/')
    },
    getActiveBots(){
        return withToken.get('bots/get_all_starting_bots/')
    },
    getBotsById(botId){
        return withToken.get(`bots/${botId}/`)
    },
    updateBot(botId, botCred){
        debugger
        return withToken.patch(`bots/${botId}/`, botCred)
    },
    deteleBot(botId){
        return withToken.delete(`bots/${botId}/`)
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