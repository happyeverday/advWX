/**
 * Created by chuck7 on 16/7/20.
 */
import api from '../index.js'
export default {
    postPicInfo(serverId,left,top,width,height){
        return api.post('uploadpic.php',{
            media_id:serverId,
            top,
            left,
            width,
            height
        },{},'http://ad.100101.cn/advtest/php/weixin/')
    },
}
