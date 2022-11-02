import { defineComponent } from "vue";

import {AppComponentProps, AppComponentData} from '@t/types'

import { SvgIcon } from "./components";
import AppDefaultLayout from './layouts/AppDefaultLayout.vue'


export default defineComponent<AppComponentProps,AppComponentData>({

    components: {
        SvgIcon,
        AppDefaultLayout
    },

    
})