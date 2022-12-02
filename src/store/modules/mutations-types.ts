

export enum MutationTypes {
    //                      AUTH_REDUCER
    SET_USER_CREDENTIALS = 'SET_USER_CREDENTIALS',
    SET_CURRENT_BOT      = 'SET_CURRENT_BOT',
    SET_USER_INITIAL_CREDENTIALS = 'SET_USER_INITIAL_CREDENTIALS',

    //                      APP
    INITIALIZE = 'INITIALIZE',
    SET_EJECT_AXIOS = 'SET_EJECT_AXIOS',
    SET_IS_EXPAND_SIDEBAR = 'SET_IS_EXPAND_SIDEBAR',
    SET_CURRENT_LAYOUT = 'SET_CURRENT_LAYOUT',

    //                      BOTS
    SET_BOTS_LIST = 'SET_BOTS_LIST',

    //                      Messages
    SET_CURRENT_MESSAGE='SET_CURRENT_MESSAGE',
    SET_LIST_MESSAGE='SET_LIST_MESSAGE'
}