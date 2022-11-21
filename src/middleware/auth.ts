    export default function auth ({ next, store, authToken }) {
        
        if( !authToken ){
            return next({
                name: 'login',
                query: { redirect: location.pathname }
            })
        }
        return next()
    }