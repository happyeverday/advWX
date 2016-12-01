/**
 * Created by chuck7 on 16/8/12.
 */
import api from '../index.js'
export default {
    getAdvertisements(lastId,count,openid){
        return api.get('advertisements.php',{
            last_id:lastId,
            count,
            openid
        })
    }
}
