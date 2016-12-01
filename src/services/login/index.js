/**
 * Created by chuck7 on 16/8/10.
 */
import api from "../index.js"
export default {
    login(phone,password){
        return api.post("login/sessions.php",{
            password,
            phone
        });
    },
    loginToGetToken(phone,password){
        return api.post("login/tokens.php",{
            password,
            phone
        });
    },
    getStatus(){
        return api.get("login/sessions.php");
    },
    logout(){
        return api.delete("login/sessions.php");
    }
}
