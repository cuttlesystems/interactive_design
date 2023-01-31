<template>
    <div class="custom-input">
        <p class="custom-input__label">{{__(label)}}</p>
        <div class="custom-input__field">
            <input 
                :disabled="$attrs.disabled"
                :value="value"
                @input="onChangeHandler"
                :placeholder="placeholder"
                :type="!eyeIcon 
                ? 'text'
                : showPassword ? 'text' : 'password'" >
                
                <SvgIcon class="icon__eye" v-if="eyeIcon" :nameId="iconName" @click="iconToggler" />
            
        </div>
        <span class="custom-input__error form__input--error" v-if="isDirty">
            {{__('Заполните поле')}}
        </span>
    </div>
</template>

<script lang="ts">

import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
import { computed, defineComponent, onUpdated, toRef, toRefs, ref } from "vue"
import { SvgIcon } from "../globals"

export default defineComponent({
    props: {
        value: {
            type: String,
            required: true
        },
        placeholder: String,
        label: String,
        notAllowValidation: Boolean,
        eyeIcon: Boolean
    },

    components:{
        SvgIcon
    },

    inheritAttrs: false,

    emits: {
        onChange(value){
            // console.log('emit', value)
            return true
        }
    },

    validations(){
        
        return {
                value: {
                    required
                }
            }
    },
            
    setup(props, context){

        const v$ = useVuelidate();
        const showPassword = ref(false)
        const iconName = ref('eye-off')
        

        return {
            v$,
            showPassword,
            iconName
        }
    },

    methods: {
        onChangeHandler( { target: {value}}) {
            
            this.v$.value.$touch()
            this.$emit('onChange', value)

        },
        
        iconToggler() {
            
            this.showPassword = !this.showPassword;

            this.showPassword ? this.iconName = 'eye-on' : this.iconName = 'eye-off';

        }
    },

    computed: {
        isDirty() {
            if(this.notAllowValidation) {
                return false
            }
            return this.v$.value.$dirty && this.v$.value.$invalid
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
            color: var(--black)
        }
        @include e(error){
            text-align: right;
            display: block;
        }
        @include e(field){

            position: relative;

            svg {
                width: 22px;
                height: 22px;
                position: absolute;
                right: 5%;
                top: 28%;
                cursor: pointer;
            }
            
        }
        input {
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            padding: 12px;
            border: 1px solid rgba(204, 204, 204, 0.35);
            border-radius: 16px;
            width: 100%;
            &:focus {
                outline: none;
            }
            &::placeholder {
                color: #8F9BB3;
                user-select: none;
            }
        }
    }
</style>