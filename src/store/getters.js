export default {
  cartLength(state) {
    return state.cartList.filter(item=>{
      return item.checked
    }).length;
  },

  getCart(state){
    return state.cartList
  }
}
