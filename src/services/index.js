/**
 * Created by chuck7 on 16/7/11.
 */
import {Promise} from 'es6-promise'

//封装get，post，delete请求
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText)
        error.response = response
        return Promise.reject(error);
    }
}

function parseJSON(response) {
    return response.json()
}
var HOST= "http://10.1.29.254:8088/advertisement2/php/customer/";
export default{
    get(url,param={},headers={},host=HOST){

        headers = new Headers(headers);
        var query = [];
        Object.keys(param).forEach((item)=>{
            query.push(`${item}=${encodeURIComponent(param[item])}`)
        })
        var params = query.length?'?'+query.join('&'):'';//fixme
        url = host + url + params;
        var init = {
            method: 'GET',
            headers: headers,
            //mode: 'no-cors',
            credentials:"include",
            cache: 'default'
        };
        return fetch(url,init)
            .then(checkStatus)
            .then(parseJSON);
    },
    patch(url,param={},headers={},host=HOST){
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type","application/json");
        reqHeaders.append("Accept","application/json");

        url = host + url;

        var init = {
            method: 'PATCH',
            headers: reqHeaders,
            credentials:"include",
            body:JSON.stringify(param)
        };

        return fetch(url,init)
            .then(checkStatus)
            .then(parseJSON);
    },
    post(url,param={},headers={},host=HOST){
        let reqHeaders = new Headers(headers);
        reqHeaders.append("Content-Type","application/json");
        reqHeaders.append("Accept","application/json");

        url = host + url;
        console.log(url,param)
        var init = {
            method: 'POST',
            headers: reqHeaders,
            credentials:"include",
            body: JSON.stringify(param)
        };

        return fetch(url,init)
            .then(checkStatus)
            .then(parseJSON);
    },
    put(url,param={},headers={},host=HOST){
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type","application/json");
        reqHeaders.append("Accept","application/json");

        url = host + url;

        var init = {
            method: 'PUT',
            headers: reqHeaders,
            credentials:"include",
            body:JSON.stringify(param)
        };

        return fetch(url,init)
            .then(checkStatus)
            .then(parseJSON);
    },
    delete(url,param={},headers={},host=HOST){
        let reqHeaders = new Headers();
        reqHeaders.append("Content-Type","application/json");
        reqHeaders.append("Accept","application/json");

        url = host + url;

        var init = {
            method: 'DELETE',
            credentials:"include",
            //headers: reqHeaders,
            //body:JSON.stringify(param)
        };

        return fetch(url,init)
            .then(checkStatus)
            .then(parseJSON);
    },

}

