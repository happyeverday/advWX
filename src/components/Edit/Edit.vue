<template>
    <div class="fix" >
        <div class="weui_cells_title">广告编辑页</div>
        <div class="weui_cells" v-show="!loading">
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary tc ">
                    <div class="dib rel">

                        <img :src="imgSrc" class="advtm-edit-thumb" v-show="template != 2">
                        <!--<img src="http://temp.im/300x166/aaaaaa/aaaaaa" class="advtm-edit-thumb">-->
                        <div class="advtm-temp i" v-if="template == 1">
                            <div class="temp1-word1 word-container"><span class="temp1-word1-sub1">{{inputObj[0]['word']}}</span><span class="temp1-word1-sub2">{{inputObj[1]['word']}}</span></div>
                            <div class="temp1-word2 word-container"><span class="temp1-word1-sub1">{{inputObj[2]['word']}}</span><span class="temp1-word1-sub2">{{inputObj[3]['word']}}</span></div>
                            <div class="temp1-word3 word-container">{{inputObj[4]['word']}}</div>
                        </div>
                        <div class="temp2 rel" v-if="template == 2">
                            <!--<img src="http://temp.im/300x166/aaaaaa/aaaaaa" class="advtm-edit-thumb" alt="">-->
                            <img :src="imgSrc" class="advtm-edit-thumb" v-show="template == 2">
                            <div class="advtm-temp">
                                <div class="temp2-word1 word-container-center">{{inputObj[0]['word']}} <img class="temp2-at" src="../../assets/@.png" alt="">   {{inputObj[1]['word']}}</div>
                                <div class="temp2-word2 word-container-center">{{inputObj[2]['word']}}</div>
                            </div>
                        </div>
                        <div class="advtm-temp i" v-if="template == 3">
                            <div class="temp3-word1 word-container">{{inputObj[0]['word']}}</div>
                            <div class="temp3-word2 word-container">{{inputObj[1]['word']}}</div>
                        </div>
                        <div class="advtm-temp" v-if="template == 4">
                            <div class="temp4-word1 word-container">{{inputObj[0]['word']}}</div>
                            <div class="temp4-word2 word-container">{{inputObj[1]['word']}}</div>
                        </div>
                        <div class="advtm-temp" v-if="template == 5">
                            <div class="temp5-word1">{{inputObj[0]['word']}}</div>
                            <div class="temp5-word2">{{inputObj[1]['word']}}</div>
                            <div class="temp5-word3">{{inputObj[2]['word']}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weui_cell" v-for="word in inputObj">
                <div class="weui_cell_bd weui_cell_primary">
                    <input class="weui_input" type="text" placeholder="请输入广告内容" v-model="word['word']">
                </div>
            </div>
        </div>
        <div class="weui_btn_area" v-show="!loading">
            <a href="javascript:;" @click="submit" class="weui_btn weui_btn_primary">确定</a>
        </div>
    </div>
    <loading-toast v-show="loading"></loading-toast>
</template>
<style>
    @font-face {
        font-family: 'fangzhengfangmei';
        src:url('../../assets/temp1/fzfm.ttf') format('truetype');
    }
    @font-face {
        font-family: 'fangzhengxiyuan';
        src:url('../../assets/temp1/fzxy.ttf') format('truetype');
    }
    @font-face {
        font-family: 'fangzhenghanzhen';
        src:url('../../assets/temp2/fzhz.ttf') format('truetype');
    }
    @font-face {
        font-family: 'fangzhengfengya';
        src:url('../../assets/temp3/fzfy.ttf') format('truetype');
    }
    @font-face {
        font-family: 'mflq';
        src:url('../../assets/temp4/mflq.otf') format('opentype');
    }
    @font-face {
        font-family: 'mnjyy';
        src:url('../../assets/temp5/mnjyy.ttf') format('truetype');
    }

</style>
<style lang="stylus" scoped>
    .weui_cell
        padding-left 10px
        padding-right 10px
    .advtm-edit-thumb
        width 300px
        height 168px
    .advtm-temp
        position absolute
        top 0
        left 0
    .word-container
        width 300px
        text-align left
    .word-container-center
        width 300px
        text-align center
    .temp1-word1
        position absolute
        top 51px
        left 20px
    .temp1-word1-sub1
        color #aa2226
        font-family 'fangzhengfangmei'
        font-size 15px
        line-height 1em
    .temp1-word1-sub2
        color #1b1b1b
        font-family 'fangzhengxiyuan'
        font-size 12px
        line-height 1em
    .temp1-word2
        position absolute
        top 67px
        left 33px
    .temp1-word2-sub1
        color #aa2226
        font-family 'fangzhengfangmei'
        font-size 15px
        line-height 1em
    .temp1-word2-sub2
        color #1b1b1b
        font-family 'fangzhengfangmei'
        font-size 12px
        line-height 1em
    .temp1-word3
        position: absolute;
        top: 88px;
        left: 77px;
        color: #1b1b1b;
        font-family: 'fangzhengxiyuan';
        font-size: 12px;
        line-height: 1em;
    .temp2
        width 300px
        height 168px
        background rgb(231,231,231)
        text-align center
        .advtm-edit-thumb
            margin-top 3px
            width 281px
            height 157px
    .temp2-at
        width 10px
    .temp2-word1
        margin-top 140px
        color #626262
        font-family 'fangzhenghanzhen'
        font-size 14px
        line-height 1em
    .temp2-word2
        color: #626262
        font-family: 'fangzhengxiyuan';
        font-size: 12px;
        line-height: 1em;
    .temp3-word1
        position: absolute;
        top: 97px;
        left: 150px;
        color: #ffffff;
        font-family: 'fangzhengfengya';
        font-size: 17px;
        line-height: 1em;
        text-shadow: -2px 2px 4px #aaaaaa
    .temp3-word2
        position absolute
        top 114px
        left 178px
        color #000000
        font-family: 'fangzhengxiyuan';
        font-size: 12px;
        line-height: 1em
    .temp4-word1
        margin-top 135px
        margin-left 10px
        color #ffffff
        font-family 'mflq'
        font-size 14px
        line-height 1em
    .temp4-word2
        font-size 12px
        line-height 1em
        margin-left 10px
        margin-top: 3px;
    .temp5-word1
        position absolute
        width 1px
        left 10px
        top 18px
        font-family: 'mnjyy';
        font-size 12px
        line-height 1
        word-break break-all
    .temp5-word2
        position absolute
        width 1px
        left 23px
        top 18px
        font-family: 'mnjyy'
        font-size 12px
        line-height 1
        word-break break-all
    .temp5-word3
        position absolute
        width 1px
        left 37px
        top 18px
        font-family 'mflq'
        font-size 16px
        line-height 1
        word-break break-all
</style>
<script>
    import LoadingToast from '../Common/loading_toast.vue'
    import state from 'src/store/index.js'
    import service from 'src/services/edit/index.js'
    export default{
        components:{
            LoadingToast
        },
        data(){
            return{
                imgSrc:state.__img,
                inputObj:[
                    { word:'' },
                    { word:'' },
                    { word:'' },
                    { word:'' },
                    { word:'' },
                ],
                template:state.templateid,
                loading:false
            }
        },
        route:{
            data({redirect,next}){
                if(!state.__img){
                    alert("请先上传广告图片");
                    redirect('/category/upload');
                }else{
                    this.imgSrc = state.__img;
                    this.template = state.templateid;
                    switch(~~state.templateid){
                        case 1:
                            this.inputObj = [
                                { word:'请修改本文案' },
                                { word:'请修改本文案' },
                                { word:'请修改本文案' },
                                { word:'请修改本文案' },
                                { word:'请修改本文案' },
                            ]
                            break;
                        case 2:
                            this.inputObj = [
                                { word:'请修改本文案' },
                                { word:'请修改本文案' },
                                { word:'请修改本文案' },
                            ]
                            break;
                        case 3:
                            this.inputObj = [
                                { word:'请修改本文案' },
                                { word:'请修改本文案' },
                            ]
                            break;
                        case 4:
                            this.inputObj = [
                                { word:'请修改本文案' },
                                { word:'请修改本文案' },
                            ]
                            break;
                        case 5:
                            this.inputObj = [
                                { word:'请修改本文案' },
                                { word:'请修改本文案' },
                                { word:'请修改本文案' },
                            ]
                            break;
                    }
                    next();

                }
                //fake data
                /*this.imgSrc = 'http://soho.neowifi.cn/advertisement2/php/img/bcd41e2c563169a17ffa275e6097be8e.jpg';
                this.template = 1;
                this.inputObj = [
                    { word:'请修改本文案' },
                    { word:'请修改本文案' },
                ]
                next();*/
            }
        },
        methods:{
            submit(){
                this.loading = true;
                let contentArr = [];
                for(let v of this.inputObj) {
                    contentArr.push(v && v.word);
                }
                service.postEditInfo(this.imgSrc,this.template,contentArr).then(res => {
                    this.loading = false;
                    if(res.status === 200){
                        state.path = res.data.path;
                        state.md5 = res.data.md5;
                        this.$router.go('/detail');
                    }else{
                        return Promise.reject();
                    }
                }).catch(err => {
                    alert('网络错误,上传失败');
                    console.log(err &&err.stack);
                })
            }
        }
    }
</script>
