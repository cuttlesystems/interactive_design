

export default function guest({ next, store }) {
    if( store.state.authReducer.authToken ){
        return next({
            name: 'chart'
        })
    }
    return next()
}