<template>
    <img :src="picSrc" :width="picWidth" :height="picHeight" v-crop:create="change" v-crop:start="change" v-crop:move="change" v-crop:end="change" />
</template>
<script>
    import Vue from 'vue';
    import 'src/libs/jcrop/index'
    import vueCrop from 'src/directives/vue-crop.js'
    vueCrop.setOptions({
        setSelect: [0, 0, 34, 20],
        aspectRatio: 1.77,
        bgColor: '#2C7152'
    });
    Vue.use(vueCrop)
    export default{
        data(){
            return {

            }
        },
        props: {
            picSrc: {
              type:String
            },
            picWidth:{
                type: Number,
                default: 300
            },
            picHeight:{
                type: Number,
                default: 0
            },
            cord: {
                type:Object
            }
        },
        methods:{
            change(event, selection, coordinates) {
                this.cord = coordinates;
            }
        }

    }
</script>
