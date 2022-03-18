<template>
  <div class="auth-container">
    <div class="register-text"><p>Registration</p></div>
    <div class="auth-blog">
      <form @submit.prevent="submit">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="inputs"
        />
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="inputs"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="inputs"
        />
        <button type="submit" class="auth-btn">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
    }
  },
  methods: {
    async submit() {
      await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password,
        }),
      })
      await this.$router.push('signin')
    },
  },
}
</script>
<style>
.auth-container {
  width: 87%;
  margin: auto;
}
.register-text p {
  font-size: 36px;
  font-weight: 600;
  line-height: 48px;
  font-family: 'Circe Bold';
}
.auth-blog {
  height: 300px;
}
.inputs {
  width: 300px;
  margin-top: 20px;
  padding: 10px;
  height: 25px;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  display: block;
}
.auth-btn {
  width: 150px;
  margin-top: 30px;
  height: 40px;
  color: #ffffff;
  background-color: #428bca;
  border: 1px solid #357ebd;
  border-radius: 5px;
  cursor: pointer;
}
.auth-btn:hover {
  background-color: #357ebd;
}
</style>
