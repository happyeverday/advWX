<template>
    <div>
        <div class="weui_cells_title">广告名称</div>
        <div class="weui_cells weui_cells_form">
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <input class="weui_input" type="text" placeholder="请输入广告名称" v-model="adName">
                </div>
            </div>
        </div>
        <div class="weui_cells_title">广告播放日期</div>
        <div class="weui_cells weui_cells_form">
            <div class="weui_cell weui_cells_access" @click="changeStartTime()" :disabled="changeStartDisabled">
                <div class="weui_cell_hd">
                    起始时间
                </div>
                <div class="weui_cell_bd weui_cell_primary tr">
                    <div class="weui_input">{{startTimeString}}</div>
                </div>
                <div class="weui_cell_ft"></div>
            </div>
            <div class="weui_cell weui_cells_access" @click="changeEndTime()" :disabled="changeEndDisabled" v-show="endTimeShow">
                <div class="weui_cell_hd">
                    截止时间
                </div>
                <div class="weui_cell_bd weui_cell_primary tr">
                    <div class="weui_input">{{endTimeString}}</div>
                </div>
                <div class="weui_cell_ft"></div>
            </div>
        </div>
        <div v-show="remainTimeGet">
            <div class="weui_cells_title">广告播放设置</div>
            <div class="weui_cells weui_cells_form">
                <div class="weui_cell">
                    <div class="weui_cell_bd weui_cell_primary">
                        <input class="weui_input" type="tel" placeholder="请输入每日播放次数" v-model="times" pattern="[0-9]{10}">
                    </div>
                </div>
                <div class="weui_cell">
                    <div class="weui_cell_bd weui_cell_primary">
                        <input class="weui_input" type="tel" placeholder="请输入播放持续时长" v-model="time" pattern="[0-9]{10}">
                    </div>
                </div>
            </div>
            <div class="weui_cells_tips">广告播放时长以秒为单位 </div>
            <p class="tc red">
                每日可播放总时长:{{remainTime}}秒
            </p>
            <p class="tc">
                您设置的每日播放总时长为{{totalTime}}秒
            </p>
            <p class="tc red" v-show="totalTime > remainTime">
                您设置的每日播放总时长过长,请重新设置
            </p>
        </div>

        <button class="weui_btn weui_btn_primary btn-fixed" v-show="!(startPickerShow||endPickerShow) " @click="submit()" :disabled="!canSubmit" :class="{'weui_btn_disabled':!canSubmit}">确认</button>
        <picker :data='startDateChoice' :columns=3 :value.sync='startTime' v-show="startPickerShow" picker-id="start"></picker>
        <picker :data='endDateChoice' :columns=3 :value.sync='endTime' v-if="endPickerShow" picker-id="end"></picker>
    </div>
</template>
<style lang="stylus" scoped>
    .tr
        text-align right
</style>
<script>
    import state from 'src/store/index.js'
    import service from 'src/services/date/index.js'
    import picker from 'components/Common/Picker/picker.vue'
    let currentTime = new Date(),
        dateCursor = currentTime,
        yearCursor = 0,
        monthCursor = -1,
        startDateChoice = [];
    const __dateCount = 29;
    dateCursor.setDate(dateCursor.getDate());
    for(let i = 0;i < __dateCount;i++){
        let yearOfDateCursor = dateCursor.getFullYear(),
            monthOfDateCursor = dateCursor.getMonth(),
            dateOfDateCursor = dateCursor.getDate();
        if(yearOfDateCursor !== yearCursor){
            yearCursor = yearOfDateCursor
            startDateChoice.push({
                name: yearCursor+'年',
                value: yearCursor+'',
                parent: 0
            })
        }
        if(monthOfDateCursor !== monthCursor){
            monthCursor = monthOfDateCursor;
            startDateChoice.push({
                name: monthCursor+1+'月',
                value: monthCursor+1+'',
                parent: yearCursor+''
            })
        }
        startDateChoice.push({
            name: dateOfDateCursor+'日',
            value: dateOfDateCursor,
            parent: monthCursor+1+''
        })
        dateCursor.setDate(++dateOfDateCursor);
    }
    export default{
        components:{
            picker
        },
        data(){
            return{
                adName:'',
                startDateChoice,
                startTime:[],
                startTimeTemp:[],
                startPickerShow:false,
                startTimeString:'',
                startTimeStamp:0,
                changeStartDisabled:false,
                endDateChoice:[],
                endTime:[],
                endTimeTemp:[],
                endPickerShow:false,
                times:'',
                time:'',
                totalTime:0,
                endTimeShow:false,
                endTimeString:'',
                endTimeStamp:0,
                changeEndDisabled:false,
                remainTimeGet:false,
                remainTime:0
            }
        },
        computed:{
            canSubmit(){
                if((this.adName !== '') && (this.startTimeStamp !== 0) && (this.endTimeStamp !== 0) && (this.times !== '') && (this.time !== '')){
                    if(this.remainTime > this.totalTime)
                        return true;
                }
                return false;
            }
        },
        events:{
            ['on-cancel'](id){
                if(id === 'start'){
                    this.startTime = this.startTimeTemp;
                    this.startPickerShow = false;
                    this.changeEndDisabled = false;
                }else{
                    this.endTime = this.endTimeTemp;
                    this.endPickerShow = false;
                    this.changeStartDisabled = false;
                }
            },
            ['on-submit'](id){
                if(id === 'start'){
                    this.startPickerShow = false;
                    this.startTimeString = this.startTime[0]+'年'+this.startTime[1]+'月'+this.startTime[2]+'日'
                    this.startTimeStamp = new Date(~~this.startTime[0],this.startTime[1]-1,this.startTime[2],0,0,0).getTime();
                    this.endTimeShow = true;
                }else{
                    this.endPickerShow = false;
                    this.endTimeString = this.endTime[0]+'年'+this.endTime[1]+'月'+this.endTime[2]+'日'
                    this.endTimeStamp = new Date(~~this.endTime[0],this.endTime[1]-1,this.endTime[2],0,0,0).getTime();
                }
            }
        },
        watch:{
            startTimeStamp(val){
                if(val){
                    let currentTimeStamp = new Date(),
                        tomorrow = new Date(currentTimeStamp.getFullYear(),currentTimeStamp.getMonth(),currentTimeStamp.getDate(),0,0,0),
                        tomorrowTimeStamp = tomorrow.getTime(),
                        timeUsed = (val - tomorrowTimeStamp)/(3600*1000*24),
                        timeLeft = __dateCount - timeUsed +1;
                    tomorrow.setDate(tomorrow.getDate()+timeUsed+1);
                    let dateCursor = tomorrow;

                    this.endDateChoice = [];
                    let arr = this.endDateChoice,
                        yearCursor = 0,
                        monthCursor = -1;
                    for(let i = 0;i < timeLeft ;i++){
                        let yearOfDateCursor = dateCursor.getFullYear(),
                            monthOfDateCursor = dateCursor.getMonth(),
                            dateOfDateCursor = dateCursor.getDate();
                        if(yearOfDateCursor !== yearCursor){
                            yearCursor = yearOfDateCursor
                            arr.push({
                                name: yearCursor+'年',
                                value: yearCursor+'',
                                parent: 0
                            })
                        }
                        if(monthOfDateCursor !== monthCursor){
                            monthCursor = monthOfDateCursor;
                            arr.push({
                                name: monthCursor+1+'月',
                                value: monthCursor+1+'',
                                parent: yearCursor+''
                            })
                        }
                        arr.push({
                            name: dateOfDateCursor+'日',
                            value: dateOfDateCursor,
                            parent: monthCursor+1+''
                        })
                        dateCursor.setDate(++dateOfDateCursor);
                    }
                    this.endPickerShow = false;
                    this.endTimeString = '';
                    this.endTimeStamp = 0;
                }
            },
            endTimeStamp(val){
                if(val!==0){
                    console.log(state);
                    let params = {};
                    if(state.brandid){
                        params.brandid = state.brandid;
                    }else if(state.terminals){
                        params.terminals = state.terminals;
                    }else{
                        params.groupid = state.groupid;
                    }
                    params.begin_time = this.startTimeStamp;
                    params.end_time = this.endTimeStamp;
                    service.getScreens(params).then(res=>{
                        console.log(res);
                        if(res.status === 200){
                            this.remainTime = res.data.remaintime;
                            this.remainTimeGet = true;
                        }
                    })
                }else{
                    this.remainTimeGet = false;
                    this.remainTime = 0
                }
            },
            times(val){
                if(parseInt(val)*parseInt(this.time) !== parseInt(val)*parseInt(this.time)){
                    this.totalTime = 0;
                }else{
                    this.totalTime = parseInt(val)*parseInt(this.time);
                }
            },
            time(val){

                if(parseInt(val)*parseInt(this.times) !== parseInt(val)*parseInt(this.times)){
                    this.totalTime = 0;
                }else{
                    this.totalTime = parseInt(val)*parseInt(this.times);
                }
            }
        },
        methods:{
            changeStartTime(){
                this.startTimeTemp  = this.startTime;
                this.startPickerShow = true;
                this.changeEndDisabled = true;
            },
            changeEndTime(){
                this.endTimeTemp  = this.endTime;
                this.endPickerShow = true;
                this.changeStartDisabled = true;
            },
            submit(){
                state.begin_time = this.startTimeStamp;
                state.end_time = this.endTimeStamp;
                state.name = this.adName;
                state.time = ~~this.time;
                state.times = ~~this.times;
                this.$route.router.go({
                    path: '/template'
                })
            }
        }
    }
</script>
