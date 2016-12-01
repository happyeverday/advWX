<template>
    <div>
        <div class="weui_cells_title">
            广告列表
        </div>
        <div class="weui_cells weui_cells_access">
            <a class="weui_cell" href="javascript:"  v-for="adver in advList" v-link="'/advertisement/'+adver.advertisementid">
                <div class="weui_cell_hd">
                    <img :src="adver.path" alt="">
                </div>
                <div class="weui_cell_bd weui_cell_primary">
                    <div class="font12">
                        <div class="g6">时间:&nbsp;{{adver.begin_time}}到{{adver.end_time}}</div>
                        <div class="g6">每日播放次数/时间: &nbsp;{{adver.times}}次/{{adver.time}}秒</div>
                        <div class="red">￥{{adver.money}}</div>
                    </div>
                </div>
                <div class="weui_cell_ft"></div>
            </a>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
    .weui_cell_hd
        img
            width (87/3.2)vw
            margin-right 10px
    .font12
        font-size (12/3.2)vw
</style>
<script>
    import service from 'src/services/advertisement-list/index.js'
    import state from "src/store/index.js"
    export default{
        data(){
            return{
                advList:[]
            }
        },
        route:{
            data(){
                return service.getAdvertisements(0,100,state.openid).then(res=>{
                        if(res.status === 200){
                            this.advList = res.data;
                            return Promise.resolve();
                        }else{
                            return Promise.reject();
                        }
                    }).catch(err => {
                        alert('网络错误');
                    })
            }
        }
    }
</script>
