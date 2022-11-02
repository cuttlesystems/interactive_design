<template>
    <header class="constructor-header">
        header
        <a href="s">s</a>
    </header>
    <div class="constructor-container">
        <nav class="toolbar constructor-container__item">
        nav
        </nav>
        <main class="flowchart-column constructor-container__item">
            <slot />
        </main>
    </div>
    
</template>

<script setup lang="ts">


</script>

<style lang="scss">
@include b(constructor-header) {
    box-shadow: 0 4px 10px #00000026;
    background-color: #0097b7;
    color: #fff;
    min-height: 75px;
    user-select: none;
}
@include b(constructor-container) {
    position: relative;
    display: table;
    height: calc(100vh - 75px);
    width: 100%;
    overflow: hidden;
    @include e(item){
        height: calc(100vh - 75px);
        display: table-cell;
        vertical-align: top;
        transition: all 90ms ease-in-out 45ms;
    }
}
@include b(toolbar){
    width: 100px;
    z-index: 2;
    user-select: none;
}
@include b(flowchart-column){
    position: relative;
    width: calc(100vw - 100px);
}

</style>