import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

import { ChartFlow, TreeGraph } from "src/view"


const routes: Array<RouteRecordRaw> = [
    { name: 'chart', path: '/', component: ChartFlow },
    { name: 'tree', path: '/:treeId(\\d+)', component: TreeGraph },       // sensitive: true
]
  
  
const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: true,
})

export default router