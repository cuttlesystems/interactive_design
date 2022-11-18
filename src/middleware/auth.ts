    export default function auth ({ next, store }) {
        if(!store.state.authReducer.authToken){
            return next({
                name: 'login',
                query: { redirect: location.pathname }
            })
        }
        return next()
    }