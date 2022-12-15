
import { withToken } from "../api"


const optionsAPI = {
    createOption(messageId, optionCred){
        return  withToken.post(`messages/${messageId}/variants/`, optionCred)
    },
    getOptions(messageId){
        return withToken.get(`messages/${messageId}/variants/`)
    },
    updateMessage(optionId, newOption){
        return withToken.patch(`variant/${optionId}/`, newOption)
    },
    deleteOption(optionId){
        return withToken.delete(`variant/${optionId}/`)
    },

    getMessageById(optionId){
        return withToken.get(`variant/${optionId}/`)
    }
}

export default optionsAPI