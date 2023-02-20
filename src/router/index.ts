import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { ChartFlow, TreeGraph, Login, Registration, MainPage, ProfilePage, CreateBotPage, EntryPoint, BotPage, ErrorPage } from "src/view";
import guest from '~/middleware/guest';
import auth from '~/middleware/auth';
import { useStore } from "~/store";
import { ActionTypes } from "~/store/modules/action-types";
import middlewarePipeline from "~/middleware/middlewarePipeline";
import store from '~/store'
import LocalStorageService from "~/utils/LocalStorageService";

const routes: Array<RouteRecordRaw> = [

    { 
        name: 'entry', path: '', 
        component: EntryPoint, 
        meta: { middleware: [ guest ] },
        redirect: '/login',
        children: [
            { name: 'registration', path: 'registration', component: Registration, 
                meta: { middleware: [ guest ] } 
            },
            { name: 'login', path: 'login', component: Login, 
                meta: { middleware: [ guest ] } 
            }
        ]
    },

    { 
        name: 'main', path: '/', component: MainPage, 
        meta: { middleware: [ auth ], layout: 'MainLayout' },
        children: [

            { 
                name: 'bot', path: 'bot', component: BotPage, 
                meta: { middleware: [ auth ] } 
            },

            { 
                name: 'create-bot', path: 'create-bot',  component: CreateBotPage,   
                meta: { 
                    middleware: [ auth ], title: 'Создать Бота', layout: 'MainLayout' 
                }
            },

            {
                name: 'error-page', path: 'error-page', component: ErrorPage
            }
        ]
    },
    
    { 
        name: 'chart', path: '/chart-flow', component: ChartFlow, 
        meta: { middleware: [ auth ], layout: 'AppDefaultLayout' } 
    },

    { 
        name: 'tree', path: '/:treeId(\\d+)',     component: TreeGraph,       meta: { middleware: [ auth ], layout: 'MainLayout' }
    },       // sensitive: true

    { 
        name: 'profile', path: '/profile',        component: ProfilePage,     meta: { middleware: [ auth ], layout: 'MainLayout' }
    },
    
]
  
  
const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: true,
})

router.beforeEach((to, from, next) => {
    console.log(store, 'sotreee')
    if(!to.meta.middleware) {
        return next()
    }
    
    const middleware: any = to.meta.middleware ;
    
    if(!store.state.initialized){
        store.dispatch(ActionTypes.INITIALIZE_APP)
    }
    const authToken = LocalStorageService.getToken();

    const context = {
        to,
        from,
        next,
        store,
        authToken
    }
    return middleware[0]({
        ...context,
        next: middlewarePipeline( context, middleware, 1 )
    })
})

export default router