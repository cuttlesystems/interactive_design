<template>
    <!-- <AppDefaultLayout v-slot="slotProps" v-if="!blankRouteList.includes($route.name)">
        <router-view
            v-bind="slotProps"
        ></router-view>
    </AppDefaultLayout> -->
    <!-- <div :style="{
        'display': 'flex',
        'height': '100vh',
        'justify-content': 'center',
        'align-items': 'center'
    }">
        IN PROGRESS!!!
    </div> -->
    <SvgIcon class="bg-icon" :nameId="isDark ? 'grid-black-bg' : 'grid-bg'" v-if="blankRouteList.includes($route.name)" />

    <component :is="currentLayout" v-slot="slotProps" v-if="!blankRouteList.includes($route.name) && isAuth">
        <router-view
            v-bind="slotProps"
        ></router-view>
    </component>
    
    <router-view v-else></router-view>

    <notifications group="app" position="top right" />

</template>
<script src="./App.ts">
/*
    TASKS:
        registraion page validation
        config nginx all router -> / # leonraize.university
        

*   RxJS, D3, Typescript
*   
    links -> svg path
    cards -> svg rect || div
    line  -
    
*   Main feat create constructor -> login validation

    failure: date, array, object, oop, pattern
    private field, static -> caches, fixed-conf, replicated across
    static {}

    css framework -> layouts -> interface -> api
    layout
*   


docker build -t NAME:VERSION .(CURRENTDIR)
docker attach containerId -> into terminal
docker logs containerId -> events on the container
docker image ls
docker run -d -p 8080:80 -e PORT=80 --name NAME_CONTAINER --rm IMAGE_TAG && if set .env file -> --env-file ./config/.env && -v volumeName:/app/data        
// --rm remove when it stopped || -v "yerkozha/www/cuttlesystems/:/app" 
// ANONYMOUS -> -v /app/node_modules 
// docker volume inspect volumenName


docker rm container+ID|NAME || rmi image+ID|TAG
docker push username/image:v
docker tag imagename username/image  -> rename
docker pull username/image
docker image inspect imagename -> info



COPY . /app
RUN yarn install
COPY . .
ENV PORT 8080
EXPOSE $PORT 

VOLUME ["/app/data"] // cash

two types of volume ANONYM and NAMED

*/
</script>
<style lang="scss">

    #nprogress {
        z-index: 999999999999 !important;
    }

    .bg-icon {
        opacity: 0.07;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

        position: absolute;
        left: 0;
        top: -4%;
        width: 100%;
        height: 100%;
    }

</style>