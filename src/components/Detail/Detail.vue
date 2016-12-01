<template>
    <div>
        <div v-show="!picSubmitting">
            <div class="weui_cells_title">广告详情图片</div>
            <div class="weui_cells weui_cells_form" v-show="!picSubmit">
                <div class="weui_cell">
                    <div class="weui_cell_bd weui_cell_primary">
                        <div class="weui_uploader">
                            <div class="weui_uploader_hd weui_cell">
                                <div class="weui_cell_bd weui_cell_primary">图片上传(最多可上传8张图片)</div>
                                <div class="weui_cell_ft">{{image.length}}/8</div>
                            </div>
                            <div class="weui_uploader_bd">
                                <ul class="weui_uploader_files">
                                    <li class="weui_uploader_file" v-for="img in image" track-by="$index">
                                        <img :src="img"  style="max-width:100%;max-height:100%;" alt="">
                                    </li>
                                </ul>
                                <div class="weui_uploader_input_wrp" @click="chooseImg()">
                                    <div class="weui_uploader_input js_file"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="weui_cells_title">广告详情描述</div>
            <div class="weui_cells weui_cells_form">
                <div class="weui_cell">
                    <div class="weui_cell_bd weui_cell_primary">
                        <textarea class="weui_textarea" placeholder="请输入广告详情描述" rows="3" v-model="description"></textarea>
                    </div>
                </div>
            </div>
            <div class="weui_cells_title">广告外链</div>
            <div class="weui_cells weui_cells_form">
                <div class="weui_cell">
                    <div class="weui_cell_bd weui_cell_primary">
                        <input class="weui_input" type="url" placeholder="请填入链接" v-model="link">
                    </div>
                </div>
            </div>
            <div class="weui_cells_title">活动</div>
            <div class="weui_cells weui_cells_form">
                <div class="weui_cell weui_cell_switch">
                    <div class="weui_cell_hd weui_cell_primary">是否加入活动功能</div>
                    <div class="weui_cell_ft">
                        <input class="weui_switch" type="checkbox" v-model="activity" >
                    </div>
                </div>
            </div>
            <div class="weui_btn_area">
                <a class="weui_btn weui_btn_primary" href="javascript:" :disabled="!canSubmit" :class="{'weui_btn_disabled':!canSubmit}" @click="submit()">确定</a>
            </div>
        </div>
        <loading-toast v-show="picSubmitting"></loading-toast>

    </div>
</template>
<style lang="stylus" scoped>
</style>
<script>
    import state from 'src/store/index.js'
    import wxService from 'src/services/wechat/index.js'
    import service from 'src/services/detail/index.js'
    import LoadingToast from '../Common/loading_toast.vue'
    export default{
        created(){
            return wxService.getSign(location.href.split('#')[0])
                    .then(res=>{
                    if(res.status === 200){
                        var result = res.data
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
                image:[],
                description:'',
                link:'',
                picSubmitting:false,
                activity:false,
            }
        },
        components:{
            LoadingToast
        },
        methods:{
            chooseImg(){
                var self = this ;
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: res=>{
                        self.picSubmitting = true;
                        wx.uploadImage({
                            localId: res.localIds[0],
                            success: ret => {
                                service.transferServerId(ret.serverId).then(result=>{
                                    if(result.status === 200){
                                        self.image.push(result.data.path)
                                        self.picSubmitting = false;
                                    }else{
                                        return Promise.reject();
                                    }
                                }).catch(err=>{
                                    alert('网络错误,请重新上传');
                                    self.picSubmitting = false;
                                })
                            }
                        })
                    }
                });
            },
            submit(){
                if(this.image.length == 0){
                    alert('请上传详情页图片');
                    return;
                }else{
                    this.picSubmitting = true;
                    state.detailtext = this.description;
                    state.purchaselink = this.link;
                    state.detailpic = this.image.join(',');
                    state.type = 0;
                    state.advtype = this.activity?'act':'goods';
                    let param;
                    if(this.activity){
                        this.picSubmitting = false;
                        this.$router.go('/activity');
                    }else{
                        param ={
                            openid:state.openid,
                            name:state.name,
                            path:state.path,
                            md5:state.md5,
                            type:state.type,
                            advtype:state.advtype,
                            begin_time:state.begin_time,
                            end_time:state.end_time,
                            times:state.times,
                            time:state.time,
                            templateid:state.templateid,
                            detailtext:state.detailtext,
                            detailpic:state.detailpic,
                            purchaselink:state.purchaselink
                        };
                        if(state.terminals){
                            param.terminals = state.terminals;
                        }else if(state.groupid){
                            param.groupid = state.groupid;
                        }else{
                            params.brandid = state.brandid;
                        }
                    }
                    service.createOrder(param).then(res=>{
                        if(res.status === 200){
                            this.picSubmitting = false;
                            state.order = res.data;
                            this.$router.go('/order');
                        }
                    }).catch(err =>{
                        console.log(err);
                        this.picSubmitting = false;
                        alert('网络错误,订单提交失败');
                    })
                }
            }
        },
        computed:{
            canSubmit(){
                if(!this.description || !this.image.length || !this.link  ){
                    return false;
                }
                return true;
            },
            canLoadMorePic(){
                return (this.image.length < 8);
            }
        }
    }
</script>
