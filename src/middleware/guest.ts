

export default function guest({ next, store, authToken }) {
    if( authToken ){
        return next({
            name: 'chart'
        })
    }
    return next()
}