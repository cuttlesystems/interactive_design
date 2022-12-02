import { withToken } from "../api"


const messagesAPI = {
    createMessage(botId, messageCred){
        return  withToken.post(`bots/${botId}/messages/`, messageCred)
    },
    getMessages(botId){
        return withToken.get(`bots/${botId}/messages/`)
    },
    updateMessage(messageId, newMessageWithPosition){
        return withToken.patch(`message/${messageId}/`, newMessageWithPosition)
    },
    deleteMessage(messageId){
        return withToken.delete(`message/${messageId}/`)
    },

    getMessageById(messageId){
        return withToken.get(`messages/${messageId}/`)
    }
}

export default messagesAPI