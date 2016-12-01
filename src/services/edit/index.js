/**
 * Created by chuck7 on 16/7/25.
 */
import api from '../index.js'
export default {
    postEditInfo(imgSrc,id,contentArr){
        let contentString = contentArr.join('|');
        return api.post('draw.php',{
            path:imgSrc,
            templateid: id + '',
            str: contentString
        },{},'http://ad.100101.cn/advtest/php/weixin/')
    },
}
