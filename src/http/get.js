import axios from "axios";
export let get = function(url,data){
    return axios({
        method:'get',
        url:url,
        params:data,
        header: {
            "user-agent": "Mozilla/5.0(1312096627@qq.com)",
        },
    })
}