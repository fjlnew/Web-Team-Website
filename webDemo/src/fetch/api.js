import axios from 'axios'
export default {
    getData:(url,params)=>{
        return new Promise((resolve,reject)=>{
            axios.get(url,params).then((res)=>{               
                resolve(res.data)
            }).catch((err)=>{
                console.log(err);
                reject(err)
            })
        })
    },
    postData:(url,params)=>{
        return new Promise((resolve,reject)=>{
            axios.post(url,params).then((res)=>{               
                resolve(res.data)
            }).catch((err)=>{                
                reject(err)
            })
        })
    },
}