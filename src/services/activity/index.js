/**
 * Created by chuck7 on 16/8/8.
 */
import api from '../index.js'
import state from 'src/store/index.js'
export default {
    transferServerId(id){
        return api.post('uploadPicNocut.php',{
            media_id:id
        },{},'http://ad.100101.cn/advtest/php/weixin/')
    },
    createOrder(param){
        return api.post('advertisement.php',param,
            {'Authorization': state.token})
    }
}
