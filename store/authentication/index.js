import axios from 'axios'

export const state = () => ({
  token: localStorage.getItem('token') || '',
  user: null,
})

export const actions = {
  async signIn({ dispatch }, payload) {
    await axios
      .post('http://localhost:1337/api/auth/local/', payload)
      .then((response) => {
        localStorage.setItem('token', response.data.jwt)
        this.$axios.setHeader('token', response.data.jwt)
        localStorage.setItem('user', JSON.stringify(response.data.user))
      })
      .catch((error) => {
        console.log('An error occurred:', error.response)
      })
    await this.$router.push('/')
  },
}
