import { withToken } from "../api"


const messagesAPI = {
    createMessage(botId, messageCred, isFormData){
        return  withToken.post(`bots/${botId}/messages/`, messageCred, {
            headers: {
                "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            }
        })
    },
    getMessages(botId){
        return withToken.get(`bots/${botId}/messages?with_variants=1`)
    },
    updateMessage(messageId, newMessageWithPosition, isFormData ){
        return withToken.patch(`message/${messageId}/`, newMessageWithPosition, {
            headers: {
                "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            }
        })
    },
    deleteMessage(messageId){
        return withToken.delete(`message/${messageId}/`)
    },

    getMessageById(messageId){
        return withToken.get(`messages/${messageId}/`)
    }
}

export default messagesAPI