export const state = () => ({
  cart: JSON.parse(localStorage.getItem('cart')) || [],
})

export const mutations = {
  add(state, payload) {
    state.cart.push(payload)
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
}
