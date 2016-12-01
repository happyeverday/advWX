/**
 * Created by chuck7 on 16/7/18.
 */
import api from '../index.js'
import state from '../../store/index.js'
export default {
    getSign(url){
        return api.get('sign.php',{
            url
        },{},'http://ad.100101.cn/advtest/php/weixin/')
    },
}
