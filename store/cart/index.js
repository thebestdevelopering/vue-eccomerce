export const state = () => ({
  data: JSON.parse(localStorage.getItem('cart')) || [],
})

export const mutations = {
  add(state, payload) {
    // If the product is already in the cart, we just increment the quantity
    const product = state.data.find((item) => item.id === payload.id)

    if (product) {
      product.quantity += 1
    } else {
      state.data.push(payload)
    }

    localStorage.setItem('cart', JSON.stringify(state.data))
  },

  increment(state, id) {
    const item = state.data.find((item) => item.id === id)
    if (item) item.quantity++
    localStorage.setItem('cart', JSON.stringify(state.data))
  },
  decrement(state, id) {
    const item = state.data.find((item) => item.id === id)
    if (item.quantity > 1) item.quantity--
    localStorage.setItem('cart', JSON.stringify(state.data))
  },
}
