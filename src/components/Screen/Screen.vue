<template>
    <div v-if="!$loadingRouteData" class="mt10 pb52">
        <div class="weui_panel weui_panel_access"  v-for="item in screenList" v-show="screenList.length>0">
            <cell-checkbox :id="item.terminalid" :model.sync="item.chosen" >
                <div class="weui_media_hd">
                    <div class="screen-pic">
                        {{item.screen_width}}x{{item.screen_height}}
                    </div>
                </div>
                <div class="weui_media_bd">
                    <h4 class="weui_media_title">位置: {{item.location}}</h4>
                    <p class="weui_media_desc">人流量:{{item.person_num}} <br>
                        {{item.name}}
                    </p>
                </div>
            </cell-checkbox>
        </div>
        <div class="weui_msg" v-show="screenList.length===0">
            <div class="weui_icon_area"><i class="weui_icon_msg weui_icon_warn"></i></div>
            <div class="weui_text_area">
                <h2 class="weui_msg_title">无可选屏幕</h2>
                <p class="weui_msg_desc">你的账户暂无可投放广告的屏幕</p>
            </div>
        </div>
        <pulse-loader :loading="isLoading" color="#37AEFC" size="10px" class="tc"></pulse-loader>
        <button class="weui_btn weui_btn_primary btn-fixed" :class="{ 'weui_btn_disabled' : !everChosen }"  @click="submit">选择屏幕</button>
    </div>
    <loading-toast v-else></loading-toast>
</template>
<script>
    import LoadingToast from '../Common/loading_toast.vue'
    import CellCheckbox from '../Common/cell_checkbox.vue'
    import service from '../../services/screen/index'
    import state from "src/store/index.js"
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue' //下拉加载条
    import {
        getScrollTop,
        getClientHeight,
        getScrollHeight
    } from '../../libs/height_utils.js'
    let listStart = 0;
    const listNum = 10,
        triggerDistance = 500;
    let fetchData = function(){
        if(this.isLoading || this.isEnd){
            listStart -= listNum;
            return;
        }
        if(listStart != 0){
            //界面切换进来的时候不显示pulse-loading组件
            //只在上拉加载数据的时候加入上拉动画
            this.isLoading = true;
        }
        return service.getScreens(listStart,listNum).then(res=>{
            if(res.status == 200){
                    if(res.data.length < listNum){
                       this.isEnd = true;
                    }
                if(listStart === 0){
                    this.screenList.push(...res.data);
                    this.isLoading = false;
                    return Promise.resolve();
                }else{
                    setTimeout(()=>{
                        this.screenList.push(...res.data);
                        this.isLoading = false;
                        return Promise.resolve();
                    },500);
                }
            }else{
                return Promise.reject();
            }
        }).catch(()=>{
                alert('网络错误,请刷新重试!');
        });
    }
    export default{
        data(){
            return {
                screenList:[],
                isLoading:false,
                isEnd:false,
                everChosen:false
            }
        },
        components: {
            LoadingToast,
            CellCheckbox,
            PulseLoader
        },
        computed:{
          everChosen(){
              if( !this.screenList.length ){
                  return false;
              }else{
                  let chosen = false;
                  for(let i = 0; i < this.screenList.length;i++){
                      if(this.screenList[i].chosen){
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
                  alert("请至少选择一个广告投放屏幕");
              }else{
                  let arr = [];
                  for(let i = 0; i < this.screenList.length;i++){
                      if(this.screenList[i].chosen){
                          arr.push(this.screenList[i]['terminalid'])
                      }
                  }
                  state.terminals = arr.join('|')
                  this.$route.router.go({
                      path: '/date'
                  })
              }
          }
        },
        route:{
            data(){
                listStart = 0;
                if(state.terminals){
                    delete state.terminals;
                }
                return fetchData.call(this);
            },
            activate(){
                //添加滚动监听事件
                window.onscroll = function(e){
                    if(getScrollHeight() <= getScrollTop() + getClientHeight() + triggerDistance){
                        //当滚动条到底时,这里是触发内容
                        //异步请求数据
                        listStart += listNum;
                        fetchData.call(this);
                    }
                }.bind(this)
            },
            deactivate(){
                //移除监听事件
                window.onScroll = null;
            }
        }
    }
</script>
