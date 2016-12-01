<template>
    <div class="weui_cells_title">广告编辑</div>
    <div class="weui_cells weui_cells_form" v-show="!picSubmit">
        <div class="weui_cell pr0">
            <div class="weui_cell_bd weui_cell_primary">
                <div class="weui_uploader" v-show="!imgLoaded" >
                    <div class="weui_uploader_hd weui_cell">
                        <div class="weui_cell_bd weui_cell_primary">图片上传</div>
                    </div>
                    <div class="weui_uploader_bd">
                        <div class="weui_uploader_input_wrp" @click="chooseImg()">
                            <div class="weui_uploader_input js_file"></div>
                        </div>
                    </div>
                </div>
                <!--<img-crop v-for="img in images" :pic-src="img.src" :pic-width="img.width" :pic-height="img.height" :cord.sync="coordinates"></img-crop>-->
                <!--<img :src="image" v-if="imgLoaded" :width="width" :height="height" alt="" v-crop:create="test" v-crop:start="test" v-crop:move="test" v-crop:end="test"/>-->
                <!--<img src="../../assets/template1.jpg" style="width: 300px" id="target" width="300" height="168">-->

                <div class="tc" style="width: 300px;margin:0 auto 30px">
                    <!-- width 和 height 属性必须有-->
                    <img :src="image" id="target" v-if="imgLoaded" :width="width" :height="height">
                </div>

                <a href="javascript:;" v-show="imgLoaded" @click="submit" class="weui_btn weui_btn_primary">确定</a>
            </div>
        </div>
    </div>
    <loading-toast v-show="picSubmit"></loading-toast>
</template>
<style lang="stylus" scoped>
</style>
<script>
    import $ from 'jquery'
    import 'src/libs/jcrop/index'
    import state from 'src/store/index.js'
    import wxService from 'src/services/wechat/index.js'
    import uploadService from 'src/services/upload/index.js'
    import LoadingToast from '../Common/loading_toast.vue'
    /*import Vue from 'vue';
    import 'src/libs/jcrop/index'
    import vueCrop from 'src/directives/vue-crop.js'
    vueCrop.setOptions({
        setSelect: [0, 0, 34, 20],
        aspectRatio: 1.77,
        bgColor: '#2C7152'
    });
    Vue.use(vueCrop)*/
    /*import ImgCrop from 'components/Common/Edit/img_crop.vue'*/
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
                image:'',
                imgLoaded:false,
                width:0,
                height:0,
                picWidth:0,
                picHeight:0,
                //用户裁剪的坐标
                coords:{},
                picSubmit:false,
            }
        },
        route:{
            data({next,redirect}){
                $.Jcrop.component.DragState.prototype.touch = null;
                if(state.templateid === undefined){
                    alert("请先选择广告投放位置");
                    redirect('/category/1');
                }else{
                    next()
                }
            }
        },
        methods:{
            chooseImg(){
                var self = this ;
                wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: res=>{
                        var image = new Image();
                        image.src = res.localIds[0];
                        image.onload = ()=>{
                            self.image = res.localIds[0];
                            self.width = 300;
                            self.height = image.height*(self.width/image.width)
                            self.picWidth = image.width;
                            self.picHeight = image.height;
                            self.imgLoaded = true;
                            self.$nextTick(function () {
                                // DOM 现在更新了
                                 $('#target').Jcrop({
                                    allowSelect:false,
                                    setSelect: [0, 0, 68, 40],
                                    aspectRatio: 1.77,
                                    boxHeight:self.height,
                                    boxWidth:self.width,
                                    bgColor: '#2C7152',
                                    dragEdges:true,
                                     touchSupport : true,
                                    onChange: self.updateCoords,
                                    onSelect: self.updateCoords
                                });
                            })
                        }

                        /*Vue.nextTick(function () {
                            // DOM 更新了

                        })*/
                        }
                });
            },
            updateCoords(coordinates){
                this.coords = coordinates
                console.log(coordinates);
            },
            submit(){
                this.picSubmit = true;
                wx.uploadImage({
                        localId: this.image,
                        success: res => {
                            let serverId = res.serverId;
                            uploadService.postPicInfo(serverId,this.coords.x,this.coords.y,this.coords.w,this.coords.h).then(ret=>{
                                console.log(ret);
                                if(ret.status === 200){
                                    state.__img = ret.data.path;
                                }
                                this.$route.router.go({
                                    path: '/edit'
                                })
                            }).catch(err=>{
                                alert('网络错误');
                                console.log(err);
                            })
                        }
                })
            }
        }
    }
</script>
