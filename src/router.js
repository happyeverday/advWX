/**
 * Created by chuck7 on 16/7/5.
 */
import advertisementPlaceView from "./components/AdvertisementPlace/AdvertisementPlace.vue"
import screenListView from "./components/AdvertisementPlace/screen_list.vue"
import dateView from 'components/Date/Date.vue'
import templateView from 'components/Template/Template.vue'
import uploadView from 'components/Upload/Upload.vue'
import detailView from 'components/Detail/Detail.vue'
import activityView from 'components/Activity/Activity.vue'
import orderView from 'components/Order/Order.vue'
import loginView from 'components/Login/Login.vue'
import screenView from 'components/Screen/Screen.vue'
import editView from 'components/Edit/Edit.vue'
import listView from 'components/AdvertisementList/AdvertisementList.vue'
import adverView from 'components/Advertisement/Advertisement.vue'
export default function(router){
    router.map({
        '/index':{
            component: advertisementPlaceView,
            subRoutes: {
                '/': {
                    component: screenListView,
                    title: '选择屏幕'
                },
                '/category/1':{
                    component: screenListView,
                    title: '选择屏幕'
                },
                '/category/2':{
                    component: resolve => {
                        require(['./components/AdvertisementPlace/store_list'], resolve)
                    },
                    title: '选择商户'
                },
                '/category/3':{
                    component: resolve => {
                        require(['./components/AdvertisementPlace/area_list'], resolve)
                    },
                    title: '选择商圈'
                }
            }
        },
        '/date':{
            component:dateView,
            title:'选择日期'
        },
        '/template':{
            component:templateView,
            title:'选择模板'
        },
        '/upload':{
            component:uploadView,
            title: '广告编辑'
        },
        '/edit':{
            component:editView,
            title:'广告编辑'
        },
        '/detail':{
            component:detailView,
            title:'广告详情编辑'
        },
        '/activity':{
            component:activityView,
            title:'活动编辑'
        },
        '/order':{
            component:orderView,
            title:'确认结果'
        },
        '/login':{
            component:loginView,
            title:'登录'
        },
        '/screen':{
            component:screenView,
            title:'选择屏幕'
        },
        '/list':{
            component:listView,
            title:'广告列表'
        },
        '/advertisement/:id':{
            component:adverView,
            title:'广告详情'
        }
    });
    router.redirect({
        '*': '/index'
    })
}
