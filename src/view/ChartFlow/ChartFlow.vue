<template>
    <div class="map">
        <div class="map__scrollable-area">
            <div class="map__flowchart">

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>



</script>

<style lang="scss">

    @include b(map){
        @include e(scrollable-area){
            width: calc(100vw - 100px);
            background: repeating-linear-gradient(45deg,#eee,#eee 10px,#e5e5e5 10px,#e5e5e5 20px);
            padding: 10px;
            position: relative;
            transform: translateZ(0);
            height: calc(100vh - 75px);
            overflow: hidden;
            transition: all 90ms ease-in-out 45ms;
        }
        @include e(flowchart){
            height: 6000px;
            width: 6000px;
            cursor: all-scroll!important;
            overflow: hidden;
            backface-visibility: initial!important;
            background-color: #eaf9f9;
            position: relative;
            transform: matrix(1, 0, 0, 1, 289.6, 130.4);
        }
    }

</style>