<template>
    <div>
        <div class="weui_cells_title">详情</div>
        <div class="weui_cells">
            <div class="weui_cell pr0">
                <div class="weui_cell_bd weui_cell_primary">
                    <div class="tc" style="width: 300px;margin:0 auto">
                        <img :src="advertisement.path" style="width: 100%">
                    </div>
                </div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>广告状态</p>
                </div>
                <div class="weui_cell_ft">{{statusText[advertisement.status]}}</div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>开始时间</p>
                </div>
                <div class="weui_cell_ft">{{advertisement.begin_time}}</div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>结束时间</p>
                </div>
                <div class="weui_cell_ft">{{advertisement.end_time}}</div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>每天播放次数</p>
                </div>
                <div class="weui_cell_ft">{{advertisement.times}}</div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>每次播放的时间(秒)</p>
                </div>
                <div class="weui_cell_ft">{{advertisement.time}}</div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>订单金额</p>
                </div>
                <div class="weui_cell_ft">{{advertisement.money}}元</div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>扫码跳转地址</p>
                </div>
                <div class="weui_cell_ft"><a :href="advertisement.url">点我跳转</a></div>
            </div>
            <!--<div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>广告详情图片</p>
                </div>
            </div>
            <div class="weui_cell_bd weui_cell_primary">
                <div class="tc" style="width: 300px;margin:0 auto">
                    <img :src="advertisement.detailpic" style="width: 100%">
                </div>
            </div>-->
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>详情被查看次数</p>
                </div>
                <div class="weui_cell_ft">{{advertisement.detailnum}}</div>
            </div>
        </div>
        <div class="weui_cells_title">投放终端信息</div>
        <div class="weui_cells" v-for="terminal in advertisement.terminals">
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>终端id</p>
                </div>
                <div class="weui_cell_ft">{{terminal.terminalid}}</div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>审核状态</p>
                </div>
                <div class="weui_cell_ft">{{terminal.status}}</div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>本次金额</p>
                </div>
                <div class="weui_cell_ft">{{terminal.money}}元</div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>拒绝理由</p>
                </div>
                <div class="weui_cell_ft">{{terminal.denyreason}}</div>
            </div>

        </div>
    </div>
</template>
<script>
    import service from 'src/services/advertisement/index.js'
    import state from "src/store/index.js"
    export default{
        data(){
            return{
                advertisement:{},
                statusText:['新建','排期成功','付款成功']
            }
        },
        route:{
            data({to}){
                return service.getAdvertisement(to.params.id,state.openid).then(res => {
                    if(res.status === 200){
                        this.advertisement = res.data;
                        return Promise.resolve();
                    }else{
                        return Promise.reject()
                    }
                }).catch(err => {
                    alert('网络错误');
                })
            }
        }
    }
</script>
