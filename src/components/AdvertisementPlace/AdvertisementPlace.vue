<template>
    <tab :active-color="activeColor">
        <tab-item :selected="category === 1" @click="category = 1" v-link="{ path: '/index/category/1', replace: true }">屏幕</tab-item>
        <tab-item :selected="category === 2" @click="category = 2" v-link="{path:'/index/category/2', replace:true}">商户</tab-item>
        <tab-item :selected="category === 3" @click="category = 3" v-link="{path:'/index/category/3', replace:true}">商圈</tab-item>
    </tab>
    <router-view>
    </router-view>
</template>
<style lang="stylus">

</style>
<script>
    import {Tab,TabItem} from '../Common/Tab/index'
    import state from 'src/store/index.js'
    export default{
        data(){
            return{
                category:1,
                activeColor:'rgb(55, 174, 252)'
            }
        },
        route:{
            data({redirect,next}){
                if(state._login){
                    redirect('/login');
                }else{
                    next();
                }
            }
        },
        components:{
            Tab,
            TabItem
        }
    }
</script>
