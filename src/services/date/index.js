/**
 * Created by chuck7 on 16/8/10.
 */
import api from "../index.js"
export default {
    getScreens(param){
        return api.get("remainTime.php",param);
    }
}
