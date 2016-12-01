/**
 * Created by chuck7 on 16/8/17.
 */
import api from '../index.js'
export default {
    getPrepayId(openid,adid){
        return api.get('wxpay/example/jsapi.php',{
            openid,
            adid
        },{},'http://ad.100101.cn/advtest/php/weixin/')
    },
}
