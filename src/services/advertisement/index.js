/**
 * Created by chuck7 on 16/8/12.
 */
import api from '../index.js'
export default {
    getAdvertisement(advertisementid,openid){
        return api.get('advertisement.php',{
            advertisementid,
            openid
        })
    }
}
