<template>

  <scroll class="content" ref="scroll">
    <cart-list-item v-for="(item,index) in getCart" :key="index" :product="item"/>
  </scroll>


</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import CartListItem from "./CartListItem";

  import {mapGetters} from "vuex";

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed:{
      ...mapGetters(['getCart'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
.cart-list {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 93px;
  /*height: calc(100% - 44px - 49px);*/
}
/*.content{
  height: 100%;
  overflow: hidden;
}*/
</style>
