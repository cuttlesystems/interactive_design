
import { withToken } from "../api"


const optionsAPI = {
    createOption(messageId, optionCred){
        return  withToken.post(`messages/${messageId}/variants/`, optionCred)
    },
    getOptions(messageId){
        return withToken.get(`messages/${messageId}/variants/`)
    },
    updateOption(optionId, newOption){
        return withToken.patch(`variant/${optionId}/`, newOption)
    },
    deleteOption(optionId){
        return withToken.delete(`variant/${optionId}/`)
    },

    getOptionById(optionId){
        return withToken.get(`variant/${optionId}/`)
    }
}

export default optionsAPI