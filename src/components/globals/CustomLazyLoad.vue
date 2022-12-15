<template>
    <ul 
        class="element-btn-wrap">
        <li 
            v-for="option of optionList"
            :key="option.id"
            class="element-btn element-btn-postback">
            <span>{{option.text}}</span>
            <div class="flowchart-operator-connector-set">
                <div class="flowchart-operator-connector">
                    <div class="flowchart-operator-connector-label"></div>
                    <div class="flowchart-operator-connector-arrow"></div>
                    <div class="flowchart-operator-connector-small-arrow"></div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import store from "~/store";
import { ActionTypes } from "~/store/modules/action-types";

const props = withDefaults(defineProps<{
    constructorId: any;
}>(), {
    constructorId: null
});

const optionList: any = ref([]);
onMounted(() => {
    optionList.value = getOptions()
})
function getOptions() {
        
    return store.dispatch('messagesReducer/' + ActionTypes.GET_OPTION_LIST, props.constructorId)
}
</script>

<style lang="scss">
    
</style>