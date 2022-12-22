import  NProgress from 'vue-nprogress'
import router from '~/router'

import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

export default ( [withToken, withOutToken], store ) => {   // initial req done()

    
    
    const ejectInstanceAxiosRequest: Array<number> = [];
    const ejectInstanceAxiosResponce: Array<number> = [];

    const nprogress = new NProgress();

    router.beforeResolve(( to, from, next ) => {
        if(to.path){
            nprogress.start();
            nprogress.set(0.25)
        }
        next()
    })

    router.afterEach((to, from) => {

        if( [ 'login', 'registration', 'main', 'tree' ].includes(to.name as string) ){

            nprogress.done();

        }

    });

    
    
    [withToken, withOutToken].forEach((instance: AxiosInstance) => {
        

        ejectInstanceAxiosRequest.push(instance.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
            
            const authToken = store.getters.getToken

            if(withToken === instance && authToken) {
                config.headers.Authorization = `Token ${authToken}`
            }

            nprogress.start();
            nprogress.set(0.25);

            return config
        }, (err: AxiosError): Promise<AxiosError> => {

            return Promise.reject(err)

        }))

        ejectInstanceAxiosResponce.push(instance.interceptors.response.use((res: AxiosResponse): AxiosResponse => {

            

            nprogress.done();

            return res
        }, (err: AxiosError): Promise<AxiosError> => {

            return Promise.reject(err)

        }))

    })

    return { ejectInstanceAxiosRequest, ejectInstanceAxiosResponce };
}