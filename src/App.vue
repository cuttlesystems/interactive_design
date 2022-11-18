<template>

    <AppDefaultLayout v-slot="slotProps" v-if="!blankRouteList.includes($route.name)">
        <router-view
            v-bind="slotProps"
        ></router-view>
    </AppDefaultLayout>

    <router-view v-else></router-view>

</template>
<script src="./App.ts">
/*
*   RxJS, D3, Typescript
*   
    links -> svg path
    cards -> svg rect || div
    line  -
    
*   
*   
*/
</script>
<style lang="scss">
    
</style>