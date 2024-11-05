<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl mb-4">Register</h1>
    <form @submit.prevent="handleRegister" class="w-1/3">
      <div class="mb-4">
        <label for="username" class="block mb-2">Username</label>
        <input
          type="text"
          v-model="username"
          id="username"
          required
          class="border p-2 w-full"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-2">Password</label>
        <input
          type="password"
          v-model="password"
          id="password"
          required
          class="border p-2 w-full"
        />
      </div>
      <button type="submit" class="bg-green-500 text-white px-4 py-2">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await axios.post('http://localhost:3000/register', {
          username: this.username,
          password: this.password
        });
        console.log(response.data); 
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  }
};
</script>
