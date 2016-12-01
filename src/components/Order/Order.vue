<template>
    <div>
        <div>
            <div class="weui_cells_title">订单详情</div>
            <div class="weui_cells">
                <div class="weui_cell pr0">
                    <div class="weui_cell_bd weui_cell_primary">
                        <div class="tc" style="width: 300px;margin:0 auto">
                            <img :src="order.path" style="width: 100%">
                        </div>
                    </div>
                </div>
                <div class="weui_cell">
                    <div class="weui_cell_bd weui_cell_primary">
                        <p>开始时间</p>
                    </div>
                    <div class="weui_cell_ft">{{order.begin_time}}</div>
                </div>
                <div class="weui_cell">
                    <div class="weui_cell_bd weui_cell_primary">
                        <p>结束时间</p>
                    </div>
                    <div class="weui_cell_ft">{{order.end_time}}</div>
                </div>
                <div class="weui_cell">
                    <div class="weui_cell_bd weui_cell_primary">
                        <p>每天播放次数</p>
                    </div>
                    <div class="weui_cell_ft">{{order.times}}</div>
                </div>
                <div class="weui_cell">
                    <div class="weui_cell_bd weui_cell_primary">
                        <p>每次播放的时间(秒)</p>
                    </div>
                    <div class="weui_cell_ft">{{order.time}}</div>
                </div>
                <div class="weui_cell">
                    <div class="weui_cell_bd weui_cell_primary">
                        <p>订单金额</p>
                    </div>
                    <div class="weui_cell_ft">{{order.money}}元</div>
                </div>
            </div>
            <div class="weui_btn_area" v-show="order.schedulestatus && !state.token">
                <a class="weui_btn weui_btn_primary" href="javascript:"  @click="submit">确定</a>
            </div>
            <div class="weui_btn_area" v-show="state.token && order.schedulestatus">
                <a class="weui_btn weui_btn_default" href="javascript:">广告投放成功</a>
            </div>
            <div class="weui_btn_area" v-show="!order.schedulestatus">
                <a href="javascript:;" class="weui_btn weui_btn_default">当前无可用屏幕,下单失败</a>
            </div>
        </div>
    </div>
</template>
<script>
    import state from 'src/store/index.js'
    import wxService from 'src/services/wechat/index.js'
    import service from 'src/services/order/index.js'
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
                                'chooseWXPay'
                            ]
                        });
                        return Promise.resolve();
                    }
                })
        },
        data(){
            return{
                state,
                order:state.order,
                payObj:{}
            }
        },
        route:{
            data({redirect}){
                redirect('/advertisement/'+state.order.advertisementid);
                /*return service.getPrepayId(state.openid,state.order.advertisementid).then(res=>{
                    if(res.status === 200){
                        this.payObj = res.data;
                        console.log(this.payObj)
                    }
                }).catch(err =>{
                    console.log(err);
                    //alert(err);
                    alert('网络错误,请退出重试');
                })*/
            }
        },
        methods:{
            submit(){
                let self = this;
                wx.chooseWXPay({
                    timestamp: self.payObj.timeStamp,
                    nonceStr: self.payObj.nonceStr, // 支付签名随机串，不长于 32 位
                    package: self.payObj.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: self.payObj.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: self.payObj.paySign, // 支付签名
                    success: function (res) {
                        self.$router.replace('/advertisement/'+state.order.advertisementid);
                    },
                    fail:function(err){
                        console.log(err);
                        alert(`支付失败,请点击'确定'重新支付`);
                    }
                });
            }
        }
    }
</script>
