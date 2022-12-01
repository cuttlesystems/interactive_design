    export default function auth ({ next, store, authToken }) {
        
        if( !authToken ){
            return next({
                name: 'registration',
                query: { redirect: location.pathname }
            })
        }
        return next()
    }