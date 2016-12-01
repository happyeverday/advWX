<template>
    <div>
        <div class="weui_cells_title">登录</div>
        <div class="weui_cells weui_cells_form">
            <div class="weui_cell">
                <div class="weui_cell_hd"><label class="weui_label">手机号码</label></div>
                <div class="weui_cell_bd weui_cell_primary">
                    <input class="weui_input" type="number" pattern="[0-9]*" placeholder="请输入手机号码" v-model="phone">
                </div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_hd"><label class="weui_label">密码</label></div>
                <div class="weui_cell_bd weui_cell_primary">
                    <input class="weui_input" type="password" pattern="[0-9]*" placeholder="请输入密码" v-model="password">
                </div>
            </div>
        </div>
        <div class="weui_btn_area">
            <a class="weui_btn weui_btn_primary" href="javascript:" @click="submit()">确定</a>
        </div>
    </div>
</template>
<script>
    import service from 'src/services/login/index.js'
    import state from 'src/store/index.js'
    import md5 from 'md5'
    export default{
        data(){
            return{
                phone:'',
                password:''
            }
        },
        methods:{
            submit(){
                if(this.phone === ''){
                    alert('请输入用户名');
                    return;
                }else if(this.password === ''){
                    alert('请输入密码');
                    return;
                }else{
                    /*service.login(this.phone,md5(this.password)).then(res=>{
                        if(res.status === 200){
                            this.$router.go('/screen')
                        }else{
                            alert('手机号码或密码错误')
                        }
                    }).catch(err=>{
                        alert('网络错误,请稍后再试');
                    })*/
                    service.loginToGetToken(this.phone,md5(this.password)).then(res=>{
                        if(res.status === 200){
                            state.token = res.data.token;
                            this.$router.go('/screen')
                        }else{
                            alert('手机号码或密码错误')
                        }
                    }).catch(err=>{
                        alert('网络错误,请稍后再试');
                    })
                }
            }
        }
    }
</script>
