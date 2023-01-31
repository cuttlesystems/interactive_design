

export default function guest({ next, store, authToken }) {
    if( authToken ){
        return next({
            name: 'main'
        })
    }
    return next()
}