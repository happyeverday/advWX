<template>
    <div v-show="!submitting">
        <div class="weui_cells_title">活动设置</div>
        <div class="weui_cells weui_cells_form">
            <div class="weui_cell">
                <div class="weui_cell_hd"><label for="" class="weui_label">一等奖</label></div>
                <div class="weui_cell_bd weui_cell_primary">
                    <input class="weui_input"  type="text" v-model="name1">
                </div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_hd"><label for="" class="weui_label">一等奖数量</label></div>
                <div class="weui_cell_bd weui_cell_primary">
                    <input class="weui_input"  type="tel" v-model="num1">
                </div>
            </div>
            <div class="weui_cell pr0">
                <div class="weui_cell_bd weui_cell_primary">
                    <div class="weui_uploader" v-show="!img.pic1" >
                        <div class="weui_uploader_hd weui_cell">
                            <div class="weui_cell_bd weui_cell_primary">一等奖图片</div>
                        </div>
                        <div class="weui_uploader_bd">
                            <div class="weui_uploader_input_wrp" @click="chooseImg('pic1')">
                                <div class="weui_uploader_input js_file"></div>
                            </div>
                        </div>
                    </div>
                    <div class="tc" style="width: 300px;margin:0 auto" v-if="img.pic1">
                        <img :src="img.pic1" style="width: 100%">
                    </div>
                </div>
            </div>
        </div>
        <div class="weui_cells_title">二等奖</div>
        <div class="weui_cells weui_cells_form">
            <div class="weui_cell">
                <div class="weui_cell_hd"><label for="" class="weui_label">二等奖</label></div>
                <div class="weui_cell_bd weui_cell_primary">
                    <input class="weui_input"  type="text" v-model="name2">
                </div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_hd"><label for="" class="weui_label">二等奖数量</label></div>
                <div class="weui_cell_bd weui_cell_primary" >
                    <input class="weui_input"  type="tel" v-model="num2">
                </div>
            </div>
            <div class="weui_cell pr0">
                <div class="weui_cell_bd weui_cell_primary">
                    <div class="weui_uploader" v-show="!img.pic2" >
                        <div class="weui_uploader_hd weui_cell">
                            <div class="weui_cell_bd weui_cell_primary">二等奖图片</div>
                        </div>
                        <div class="weui_uploader_bd">
                            <div class="weui_uploader_input_wrp" @click="chooseImg('pic2')">
                                <div class="weui_uploader_input js_file"></div>
                            </div>
                        </div>
                    </div>
                    <div class="tc" style="width: 300px;margin:0 auto" v-if="img.pic2">
                        <img :src="img.pic2" style="width: 100%">
                    </div>
                </div>
            </div>
        </div>
        <div class="weui_cells_title">三等奖</div>
        <div class="weui_cells weui_cells_form">
            <div class="weui_cell">
                <div class="weui_cell_hd"><label for="" class="weui_label">三等奖</label></div>
                <div class="weui_cell_bd weui_cell_primary">
                    <input class="weui_input"  type="text" v-model="name3">
                </div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_hd"><label for="" class="weui_label">三等奖数量</label></div>
                <div class="weui_cell_bd weui_cell_primary">
                    <input class="weui_input"  type="tel" v-model="num3">
                </div>
            </div>
            <div class="weui_cell pr0">
                <div class="weui_cell_bd weui_cell_primary">
                    <div class="weui_uploader" v-show="!img.pic3" >
                        <div class="weui_uploader_hd weui_cell">
                            <div class="weui_cell_bd weui_cell_primary">三等奖图片</div>
                        </div>
                        <div class="weui_uploader_bd">
                            <div class="weui_uploader_input_wrp" @click="chooseImg('pic3')">
                                <div class="weui_uploader_input js_file"></div>
                            </div>
                        </div>
                    </div>
                    <div class="tc" style="width: 300px;margin:0 auto" v-if="img.pic3">
                        <img :src="img.pic3" style="width: 100%">
                    </div>
                </div>
            </div>
        </div>
        <div class="weui_cells_title">其他设置</div>
        <div class="weui_cells weui_cells_form">
            <div class="weui_cell">
                <div class="weui_cell_hd"><label for="" class="weui_label">总数</label></div>
                <div class="weui_cell_bd weui_cell_primary">
                    <input class="weui_input"  type="tel" v-model="num" >
                </div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_hd"><label for="" class="weui_label">开始日期</label></div>
                <div class="weui_cell_bd weui_cell_primary">
                    <input class="weui_input"  type="date" v-model="start">
                </div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_hd"><label for="" class="weui_label">结束日期</label></div>
                <div class="weui_cell_bd weui_cell_primary">
                    <input class="weui_input"  type="date" v-model="end">
                </div>
            </div>
        </div>
        <div class="weui_btn_area">
            <button class="weui_btn weui_btn_primary" href="javascript:" :disabled="!canSubmit" :class="{'weui_btn_disabled':!canSubmit}" @click="submit">确定</button>
        </div>
    </div>
    <loading-toast v-show="submitting"></loading-toast>
</template>
<style>
</style>
<script>
    import state from 'src/store/index.js'
    import wxService from 'src/services/wechat/index.js'
    import service from 'src/services/activity/index.js'
    import LoadingToast from '../Common/loading_toast.vue'
    export default{
        components:{
            LoadingToast
        },
        created(){
            return wxService.getSign(location.href.split('#')[0])
                    .then(res=>{
                    if(res.status === 200){
                var result = res.data//alert(JSON.stringify(result))
                wx.config({
                    debug: false,
                    appId: result.appId,
                    timestamp: result.timestamp,
                    nonceStr: result.nonceStr,
                    signature: result.signature,
                    jsApiList: [
                        'chooseImage',
                        'uploadImage'
                    ]
                });
                return Promise.resolve();
            }
            })
        },
        data(){
            return{
                num:'',
                name1:'',
                num1:'',
                name2:'',
                num2:'',
                name3:'',
                num3:'',
                start:'',
                end:'',
                img:{},
                submitting:false
            }
        },
        methods:{
            chooseImg(key){
                var self = this ;
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: res=>{
                        self.$set('img.'+key,res.localIds[0]);
                        wx.uploadImage({
                            localId: res.localIds[0],
                            success: res => {
                                self.$set('img.'+key+'Id',res.serverId);
                            }
                        })
                    }
                });
            },
            submit(){
                this.submitting = true;
                let transferPms = id=>{
                    return service.transferServerId(id).then(res=>{
                        if(res.status === 200){
                         return Promise.resolve(res.data.path)
                        }else{
                            return Promise.reject(new Error());
                        }
                    })
                }
                Promise.all([transferPms(this.img.pic1Id),transferPms(this.img.pic2Id),transferPms(this.img.pic3Id)]).then(picUrls=>{
                    console.log(picUrls);
                    state.pic1 = picUrls[0];
                    state.pic2 = picUrls[1];
                    state.pic3 = picUrls[2];
                    state.name1 = this.name1;
                    state.num1 = ~~this.num1;
                    state.name2 = this.name2;
                    state.num2 = ~~this.num2;
                    state.name3 = this.name3;
                    state.num3 = ~~this.num3;
                    state.num = ~~this.num
                    state.start = new Date(this.start.replace(/-/g,'/')).getTime();
                    state.end  = new Date(this.end.replace(/-/g,'/')).getTime();
                    return service.createOrder(state).then(res=>{
                        if(res.status === 200){
                            this.submitting = false;
                            state.order = res.data;
                            this.$router.go('/order');
                        }
                    })
                }).catch(err=>{
                    this.submitting = false;
                    alert('网络错误,请稍后重试');
                })
            }
        },
        computed:{
            canSubmit(){
                if((this.num !=='') && (this.name1 !== '') && (this.num1 !== '') && (this.name2 !== '') && (this.num2 !== '') && (this.name3 !== '') && (this.num3 !== '') && (this.start !== '') && (this.end !== '')){
                    return true;
                }
                return false;
            }
        }
    }
</script>
