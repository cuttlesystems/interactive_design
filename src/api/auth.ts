import instance, { withToken } from '../api'

export const authAPI = {
    login( creadentials ){
        return instance.post('auth/token/login', creadentials)
    },
    logout(){
        return withToken.post('auth/token/logout')
    },
    getUserInfo(){
        return withToken.get('users/')
    },
    registration( registrCred ){
        return instance.post('users/', registrCred)
    }
}