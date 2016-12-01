import Vue from 'vue'
import Router from 'vue-router'
import routerMap from './router.js'
import MessageBox from 'vue-msgbox'
import App from './components/App'
import './stylus/index.styl'
import state from  './store/index'
import wxService from './services/wechat/index'
if (process.env.NODE_ENV !== 'production' ){
  Vue.config.debug = true;
    //require('vconsole');
}else{
  Vue.config.debug = false;
}
Vue.use(Router);
let router = new Router();
routerMap(router);

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
const OPEN_ID = getParameterByName('id')
const NEED_LOGIN = getParameterByName('login')
state._login = NEED_LOGIN ==='true'?true:false;
state.openid = OPEN_ID
window.state = state;
router.beforeEach(transition => {
    window.scrollTo(0, 0)
    let title = transition.to.title || document.title
    wxService.getSign(location.href.split('#')[0])
        .then(res=>{
            if(res.status === 200){
                var result = res.data//alert(JSON.stringify(result))
                wx.config({
                    debug: false,
                    appId: result.appId,
                    timestamp: result.timestamp,
                    nonceStr: result.nonceStr,
                    signature: result.signature,
                    jsApiList: [
                        'chooseImage',
                        'uploadImage'
                    ]
                });
                return Promise.resolve();
            }
        })
    /* hack解决iOS下无法修改title,无jQuery版本
     https://www.zhihu.com/question/27849091/answer/38399344 */
    /*let updateWxTitle = function (title) {
        let iframe = document.createElement('iframe')
        iframe.setAttribute('src', '/favicon.ico') /!* src 不能为空,否则在微信里执行失败 *!/
        document.title = title
        function onLoad () {
            Vue.nextTick(() => {
                iframe.removeEventListener('load', onLoad)
                document.body.removeChild(iframe)
            })
        }
        iframe.addEventListener('load', onLoad)
        document.body.appendChild(iframe)
    }
    updateWxTitle(title)*/
    //document.title = title;
    transition.next()
})


window.alert = MessageBox

router.start(App, '#app')
