<template>
  <div ref="wrapper" class="wrapper" >
    <div class="content">
      <slot></slot>
    </div>

  </div>

</template>

<script>
  import BScroll from "better-scroll";
  import ObserveDOM from '@better-scroll/observe-dom'

  BScroll.use(ObserveDOM)
  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      //创建对象
      this.scroll=new BScroll(this.$refs.wrapper,{
        observeDOM:true,
        click:true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      this.scroll.scrollTo(0,0)
      //监听滚动的位置
      if (this.probeType===2||this.probeType===3){
        this.scroll.on('scroll',(position)=>{
          // console.log(position);
          this.$emit('scroll',position)
        })
      }
      //上拉监听事件
      if (this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo() && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp() && this.scroll.finishPullUp();
      },
      refresh(){
        console.log("----------");
        this.scroll && this.scroll.refresh() && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  .wrapper{
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
  }
</style>
