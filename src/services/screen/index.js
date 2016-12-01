/**
 * Created by chuck7 on 16/8/10.
 */
import api from "../index.js"
import state from 'src/store/index.js'
export default {
    getScreens(lastId,num){
        return api.get("login/terminals.php",{
            last_id:lastId,
            count:num
        },{'Authorization': state.token});
    }
}
