<template>
  <div id="app">
<!--    保持活动，不被销毁-->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>

    <MainTabBar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'
  export default {
    name: 'App',
    components:{
      MainTabBar,
    }
  }
</script>

<style>
@import "./assets/css/base.css";
</style>
