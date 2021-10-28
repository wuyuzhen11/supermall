<template>
  <div class="detail" id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content">
      <detail-wiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailWiper from "./childComps/DetailWiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";

import {getDetails, Goods, Shop} from "../../network/detail";

export default {
  name: "Detail",
  data(){
    return{
      iid:null,
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{}
    }
  },
  components:{
    DetailNavBar,
    DetailWiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailBottomBar
  },
  created() {
    //1.保存存入的id
    this.iid=this.$route.params.iid
    //2.根据iid请求详情数据
    getDetails(this.iid).then(res=>{
      const data = res.result
      this.topImages=data.itemInfo.topImages
      //获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services,)
      //创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      //保存商品的详细数据
      this.detailInfo=data.detailInfo
    })
  },
  methods:{
    titleClick(index){
      console.log(index);
    },
    addToCart(){
      // 2.将商品信息添加到Store中
      const obj = {}
      obj.iid = this.iid
      obj.imgURL = this.topImages[0]
      obj.title = this.goods.title
      obj.desc = this.goods.desc
      obj.price = this.goods.realPrice

      this.$store.commit('addCart',obj)
    }
  }
}
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  /*.detail-nav{*/
  /*  position: relative;*/
  /*  z-index: 9;*/
  /*  background-color: #fff;*/
  /*}*/

  .content {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>
