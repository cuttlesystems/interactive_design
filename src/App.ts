import { defineComponent } from "vue";

import {AppComponentProps, AppComponentData} from '@t/types'

import { SvgIcon } from "./components";
import { TreeGraph } from './view'
import { ChartFlow } from './view'


export default defineComponent<AppComponentProps,AppComponentData>({

    components: {
        SvgIcon,
        TreeGraph,
        ChartFlow
    },

    
})