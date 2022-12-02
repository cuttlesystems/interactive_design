
import { withToken } from "../api"


const optionsAPI = {
    createOption(messageId){
        return  withToken.post(`messages/${messageId}/variants/`)
    },
    getOptions(messageId){
        return withToken.get(`messages/${messageId}/variants/`)
    },
    updateMessage(optionId, newOption){
        return withToken.patch(`variant/${optionId}/`, newOption)
    },
    deleteMessage(optionId){
        return withToken.delete(`variant/${optionId}/`)
    },

    getMessageById(optionId){
        return withToken.get(`variant/${optionId}/`)
    }
}

export default optionsAPI