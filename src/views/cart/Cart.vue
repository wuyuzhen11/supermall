<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
<!--    商品列表-->
    <cart-list class="cart-list"/>
    <cart-button-bar/>
  </div>

</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import CartButtonBar from "./childComps/CartButtonBar";
  import CartList  from "./childComps/CartList";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartButtonBar
    },
    computed:{
      /*cartLength(){
        return this.$store.getters.cartLength
      }*/
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }

</style>
