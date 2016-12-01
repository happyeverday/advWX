<template>
    <div>
        <div v-if="!$loadingRouteData" class="mt10 pb52">
            <div class="weui_panel weui_panel_access"  v-for="item in areaList">
                <cell-checkbox :id="item.brandid" :model.sync="item.chosen" >
                    <div class="weui_media_box weui_media_text">
                        <h4 class="weui_media_title">{{item.name}}</h4>
                        <p class="weui_media_desc">位置: <span>{{item.description}}</span> <br>
                            屏幕数量:{{item.terminalCount}}
                        </p>
                    </div>
                </cell-checkbox>
            </div>
            <button class="weui_btn weui_btn_primary btn-fixed"  :class="{ 'weui_btn_disabled': !everChosen}" @click="submit">选择商圈</button>
        </div>
        <loading-toast v-else></loading-toast>
    </div>
</template>
<style lang="stylus" scoped>
    .weui_media_box.weui_media_text .weui_media_title
        margin-bottom 0
    .weui_media_box
        .weui_media_desc
            overflow: initial;
            text-overflow: initial;
            -webkit-line-clamp: initial;
</style>
<script>
    import LoadingToast from '../Common/loading_toast.vue'
    import CellCheckbox from '../Common/cell_checkbox.vue'
    import service from '../../services/advertisement-place/index'
    import state from "src/store/index.js"
    export default{
        data(){
            return {
                areaList:[]
            }
        },
        components: {
            LoadingToast,
            CellCheckbox
        },
        computed:{
            everChosen(){
                if( !this.areaList.length ){
                    return false;
                }else{
                    let chosen = false;
                    for(let i = 0; i < this.areaList.length;i++){
                        if(this.areaList[i].chosen){
                            chosen = true;
                            break;
                        }
                    }
                    return chosen;
                }
            }
        },
        methods:{
            submit(){
                if(!this.everChosen){
                    alert('请至少选择一个广告投放商户');
                    return;
                }
                let arr = [];
                for(let i = 0; i < this.areaList.length;i++){
                    if(this.areaList[i].chosen){
                        arr.push(this.areaList[i]['brandid'])
                    }
                }
                state.brandid = arr.join('|')
                this.$route.router.go({
                    path: '/date'
                })
            }
        },
        route:{
            data(){
                if(state.brandid){
                    delete state.brandid;
                }
                return service.getBrands().then(res=>{
                        if(res.status===200){
                    this.areaList.push(...res.data);
                }
            })
            }
        }
    }
</script>
