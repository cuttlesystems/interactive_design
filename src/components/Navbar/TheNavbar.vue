<template>
    <nav class="toolbar constructor-container__item">
        <ul class="structure-elements scrollable">
            <li class="structure-elements__item">
                <img src="https://login.sendpulse.com/automation/static/images/flow-editor/sp-i-c-email.svg" alt="Icon" class="structure-elements__icon" />
                <span class="element__title strip-text">Email</span>
            </li>
            <li class="structure-elements__item">
                <img src="https://login.sendpulse.com/automation/static/images/flow-editor/sp-i-c-email.svg" alt="Icon" class="structure-elements__icon" />
                <span class="element__title strip-text">Email</span>
            </li>
            <li class="structure-elements__item">
                <img src="https://login.sendpulse.com/automation/static/images/flow-editor/sp-i-c-email.svg" alt="Icon" class="structure-elements__icon" />
                <span class="element__title strip-text">Email</span>
            </li>
            <li class="structure-elements__item">
                <img src="https://login.sendpulse.com/automation/static/images/flow-editor/sp-i-c-email.svg" alt="Icon" class="structure-elements__icon" />
                <span class="element__title strip-text">Email</span>
            </li>
            <li class="structure-elements__item">
                <img src="https://login.sendpulse.com/automation/static/images/flow-editor/sp-i-c-email.svg" alt="Icon" class="structure-elements__icon" />
                <span class="element__title strip-text">Email</span>
            </li>
            <li class="structure-elements__item">
                <img src="https://login.sendpulse.com/automation/static/images/flow-editor/sp-i-c-email.svg" alt="Icon" class="structure-elements__icon" />
                <span class="element__title strip-text">Email</span>
            </li>
            <li class="structure-elements__item">
                <img src="https://login.sendpulse.com/automation/static/images/flow-editor/sp-i-c-email.svg" alt="Icon" class="structure-elements__icon" />
                <span class="element__title strip-text">Email</span>
            </li>
            <li class="structure-elements__item">
                <img src="https://login.sendpulse.com/automation/static/images/flow-editor/sp-i-c-email.svg" alt="Icon" class="structure-elements__icon" />
                <span class="element__title strip-text">Email</span>
            </li>
            <li class="structure-elements__item">
                <img src="https://login.sendpulse.com/automation/static/images/flow-editor/sp-i-c-email.svg" alt="Icon" class="structure-elements__icon" />
                <span class="element__title strip-text">Email</span>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ref } from 'vue'
import type { Ref } from 'vue'

export default defineComponent({
    props: {
        // message: String
    },
    emits: [''],
    setup(props, { emit }){

    }
})

</script>

<style lang="scss">
    img {
        vertical-align: middle;
    }
    @include b(structure-elements){
        padding: 12px;
        @include e(item){
            margin-bottom: 12px;

            text-align: center;
            font-size: 12px;
            cursor: grab;
            cursor: -webkit-grab;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
            background-color: #fff;
            border-radius: 6px;
            border: none;
            box-shadow: 0 1px 2px #00000008;
            position: relative;
            color: #5c6a70;
            padding: 12px;
            line-height: 1.1;
        }
        @include e(icon){
            display: block;
            margin: 2px auto 6px;
        }
    }

</style>