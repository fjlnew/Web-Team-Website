<template>
    <div class="copper">
        <label for="img" type="button" class="btn btn-info mb-2">图片上传</label>
        <input type="file" id="img" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)"/> 
        <vueCropper
            id="pic"
            ref="cropper3"
            :img="options.img"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
        ></vueCropper>
    </div> 
</template>

<script>
import VueCropper from 'vue-cropper'
import axios from 'axios'
export default {
    name: 'copper',
    props:{
        width:{
            type: Number,
            default: 330
        },
        height:{
            type: Number,
            default: 220
        }
    },
    data(){
        return {
            options: {
                img: '',
                autoCrop: true,
                autoCropWidth: this.width,
                autoCropHeight: this.height,
                fixedBox: true
            }
        }
    },
    methods:{
        uploadImg (e) {
			var file = e.target.files[0]
			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
				 alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
				 return false
			 }
			var reader = new FileReader()
			reader.onload = (e) => {
				let data
				if (typeof e.target.result === 'object') {
					// 把Array Buffer转化为blob 如果是base64不需要
					data = window.URL.createObjectURL(new Blob([e.target.result]))
				} else {
					data = e.target.result
				}		
                this.options.img = data                
            }
            reader.readAsArrayBuffer(file)    
        },
        getHref(){  
            var that = this;      
            if(this.options.img !== ""){
                return new Promise((resolve,reject)=>{
                    that.$refs.cropper3.getCropBlob((data) => {                   
                        if(data){                        
                            let param = new FormData(); //创建form对象
                            param.append('file',data);//通过append向form对象添加数据
                            let config = {
                                headers:{'Content-Type':'multipart/form-data'}
                            };
                            this.$http.post('/file/dealPic',param,config).then((res)=>{
                                resolve(res.data.data)
                            }).catch((err)=>{
                                reject(err)
                            }) 
                        }else{                        
                            reject(err)
                        }                         
                    })
                })  
            }else{
                return 0;
            }            
        } 
    },
    components:{
        VueCropper
    }
}
</script>
<style lang="scss" scoped>
#pic{
    height: 300px;
}
</style>

