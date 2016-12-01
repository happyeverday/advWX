<template>
    <div class="weui_panel_bd">
        <label class="weui_media_box weui_media_appmsg weui_media_appmsg" :for="id">
            <div class="place-checkbox weui_cells_checkbox" >
                <input v-if="multi" type="checkbox" class="weui_check" :id="id"  v-model="model" >
                <input v-if="!multi" type="radio" class="weui_check" :id="id" :value="id" v-model="model">
                <i class="weui_icon_checked"></i>
            </div>
            <div class="cell-ckeckbox-content">
                <slot>

                </slot>
            </div>
        </label>
    </div>
</template>
<style lang="stylus">
    .place-checkbox
        padding-right 0.35em
    .cell-ckeckbox-content
        display flex
</style>
<script>
    export default {
        props:{
            id: {
                type: String,
                default:''
            },
            model:{
                default:false
            },
            multi:{
                type:Boolean,
                default:true
            },
        }
    }
</script>
