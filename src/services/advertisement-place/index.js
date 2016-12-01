/**
 * Created by chuck7 on 16/7/11.
 */
import api from "../index.js"
export default {
    getScreens(lastId,num){
        return api.get("terminals.php",{
            last_id:lastId,
            count:num
        });
    },
    getStores(){
        return api.get("areas.php");
    },
    getBrands(){
        return api.get("brands.php");
    }
}
