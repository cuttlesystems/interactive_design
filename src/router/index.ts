import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { ChartFlow, TreeGraph, Login } from "src/view";
import guest from '~/middleware/guest';
import auth from '~/middleware/auth';
import { useStore } from "~/store";
import { ActionTypes } from "~/store/modules/action-types";
import middlewarePipeline from "~/middleware/middlewarePipeline";
import store from '~/store'

const routes: Array<RouteRecordRaw> = [
    { name: 'login', path: '/login', component: Login, 
        meta: { middleware: [ guest ] } 
    },
    { name: 'chart', path: '/', component: ChartFlow, 
        meta: { middleware: [ auth ] } 
    },
    { name: 'tree', path: '/:treeId(\\d+)', component: TreeGraph },       // sensitive: true
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

    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context,
        next: middlewarePipeline( context, middleware, 1 )
    })
})

export default router