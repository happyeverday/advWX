<template>
    <div class="template-ctnr">
        <div class="weui_panel weui_panel_access"  >
            <div class="weui_panel_hd">选择广告模板</div>
            <cell-checkbox :id="item.id" :multi="false" :model.sync="tempChosen" v-for="item in templateList">
                <div class="grid-item">
                    <img class="grid-pic" :src="item.templateUrl" alt="">
                </div>
            </cell-checkbox>
        </div>
    </div>
    <button class="weui_btn weui_btn_primary btn-fixed"  :class="{ 'weui_btn_disabled': !canSubmit }" :disabled="!canSubmit" @click="chooseTemplate()">选择模板</button>
</template>
<style lang="stylus">
    .grid-container
        display flex
        padding 10px 20px
        flex-direction row
        flex-wrap wrap
        justify-content space-around
    .grid-item
        padding 10px
        font-size 0
    .grid-pic
        width 100%
    .template-ctnr
        margin-bottom 42px
</style>
<script>
    import CellCheckbox from '../Common/cell_checkbox.vue'
    import state from "src/store/index.js"
    let templateList = [
        {
            id:'1',
            templateUrl:require("../../assets/template1.jpg")
        },
        {
            id:'2',
            templateUrl:require("../../assets/template2.jpg")
        },
        {
            id:'3',
            templateUrl:require("../../assets/template3.jpg")
        },
        {
            id:'4',
            templateUrl:require("../../assets/template4.jpg")
        },
        {
            id:'5',
            templateUrl:require("../../assets/template5.jpg")
        },
    ]
    export default {
        data(){
            return{
                activeColor:'rgb(55, 174, 252)',
                templateList,
                tempChosen:''
            }
        },
        components:{
            CellCheckbox
        },
        computed:{
            canSubmit(){
                return this.tempChosen !== '';
            }
        },
        methods:{
            chooseTemplate( ){
                state.templateid = this.tempChosen;
                state.type = 0;
                this.$route.router.go({
                    path: '/upload'
                });
            }
        },
        route:{
            data({next,redirect}){
                if(!state.groupid && !state.terminals && !state.brandid){
                    alert("请先选择广告投放位置");
                    redirect('/category/1');
                }else{
                    next()
                }
            }
        }
    }

</script>
