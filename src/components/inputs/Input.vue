<template>
    <div class="custom-input">
        <p class="custom-input__label">{{__(label)}}</p>
        <input 
            :disabled="$attrs.disabled"
            :value="value"
            @input="onChangeHandler"
            :placeholder="placeholder"
            type="text" >
        <span class="custom-input__error form__input--error" v-if="v$.value.$dirty && v$.value.$invalid">
            {{__('Заполните поле')}}
        </span>
    </div>
</template>

<script lang="ts">

import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
import { computed, defineComponent, onUpdated, toRef, toRefs } from "vue"

export default defineComponent({
    props: {
        value: {
            type: String,
            required: true
        },
        placeholder: String,
        label: String
        
    },

    inheritAttrs: false,

    emits: {
        onChange(value){
            // console.log('emit', value)
            return true
        }
    },

    validations: () => ({
            value: {
                required
            }
        }),

    setup(props, context){

        const v$ = useVuelidate();

        return {
            v$,
        }
    },

    methods: {
        onChangeHandler( { target: {value}}) {
            
            this.v$.value.$touch()
            this.$emit('onChange', value)

        }
    }
})


</script>


<style lang="scss" scoped>
    @include b(custom-input){
        @include e(label){
            text-align: left;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            margin-left: 10px;
            margin-bottom: 5px;
        }
        @include e(error){
            text-align: right;
            display: block;
        }
        input {
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            padding: 12px;
            border: 1px solid #E4E9F2;
            border-radius: 6px;
            width: 100%;
            &:focus {
                outline: none;
            }
            &::placeholder {
                color: #8F9BB3;
            }
        }
    }
</style>