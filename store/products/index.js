import axios from 'axios'

export const state = () => ({
  products: [],
})

export const actions = {
  async FETCH_PRODUCTS({ commit }) {
    const { data } = await axios.get(
      'http://localhost:1337/api/products/?populate=*'
    )
    commit('SET_PRODUCTS_TO_STATE', data.data)
    this.products = data.data
  },
}

export const mutations = {
  SET_PRODUCTS_TO_STATE(state, products) {
    state.products = products
  },
  // GET_MAIN_IMAGE(state, products) {
  //   let data = state.products.map((item) => {
  //     return item.attributes.images.data
  //   })
  //   console.log(data)
  //   // let data = state.products.attributes.images.data
  //   if (!data) {
  //     return ''
  //   }
  //   return state.products.attributes.images.data[0].attributes.url
  // },
}

export const getters = {
  PRODUCTS: (state) => {
    return state.products
  },
}
