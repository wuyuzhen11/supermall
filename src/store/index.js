import Vue from "vue";
import Vuex from 'vuex'

import getters from "./getters";

Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  getters,
  mutations:{
    addCart(state,payload){
      let oldProduct = state.cartList.find(item=>{
        return item.iid===payload.iid
      })
      if (oldProduct){
        oldProduct.count+=1
      }else {
        payload.count=1
        payload.checked=true
        state.cartList.push(payload)
      }

    }
  },
  actions:{

  }
})

export default store
