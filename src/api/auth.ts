import instance, { withToken } from '../api'

export const authAPI = {
    login( creadentials ){
        return instance.post('auth/token/login', creadentials)
    },
    getUserInfo(){
        return withToken.get('users/')
    }
}