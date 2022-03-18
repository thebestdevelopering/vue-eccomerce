<template>
  <div class="auth-container">
    <div class="login-text"><p>Authorization</p></div>
    <div class="auth-blog">
      <form @submit.prevent="submit">
        <input
          v-model="identifier"
          type="text"
          class="inputs"
          placeholder="Email"
        />
        <input
          v-model="password"
          type="password"
          class="inputs"
          placeholder="Password"
        />
        <button type="submit" class="auth-btn">Submit</button>
        <p class="login-link">
          First time with us? <NuxtLink to="/signup">Register now</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'signin',
  data() {
    return {
      identifier: '',
      password: '',
    }
  },
  methods: {
    ...mapActions({
      signIn: 'authentication/signIn',
    }),

    submit() {
      let form = {
        identifier: this.identifier,
        password: this.password,
      }
      this.signIn(form)
    },
  },
}
</script>
<style>
.login-text p {
  font-size: 36px;
  font-weight: 600;
  line-height: 48px;
  font-family: 'Circe Bold';
}
.login-link {
  font-size: 13px;
  font-weight: 600;
  line-height: 48px;
  font-family: 'Circe Regular', Arial, Helvetica, sans-serif, Helvetica, Arial,
    sans-serif;
}
.login-link a {
  text-decoration: none;
  color: #1e66a5;
}
</style>
