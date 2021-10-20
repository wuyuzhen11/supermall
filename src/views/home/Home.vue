<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view :goods="goods.pop.list"/>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
    />
    <goods-list :goods="goods[currentType].list"/>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import FeatureView from "./childComps/FeatureView";
  import RecommendView from "./childComps/RecommendView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  import {getHomeMultidata,getHomeGoods} from "network/home";
  export default {
    name: "Home",
    components:{
      HomeSwiper,
      NavBar,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop'
      }
    },
    created() {
      //请求多个数据
      getHomeMultidata().then(res=>{
        console.log(res);
        this.banners=res.data.banner.list
        this.recommends=res.data.recommend.list
      })
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods:{
      /**
       * 事件监听
       */
      tabClick(index){
        switch (index){
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break
        }
      },
      /**
       * 网络请求
       * @param type
       */
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
