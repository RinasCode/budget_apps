<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl mb-4">Login</h1>
    <form @submit.prevent="handleLogin" class="w-1/3">
      <div class="mb-4">
        <label for="email" class="block mb-2">Email</label>
        <input
          type="text"
          v-model="emailString"
          id="email"
          required
          class="border p-2 w-full"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-2">Password</label>
        <input
          type="password"
          v-model="passwordString"
          id="password"
          required
          class="border p-2 w-full"
        />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">
        Login
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default {
  data() {
    return {
      emailString: "", 
      passwordString: "", 
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post("http://localhost:3000/users/login", {
          emailString: this.emailString,
          passwordString: this.passwordString,
        });
        console.log('ini respon data',response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        Toastify({
          text: "Login berhasil!",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();

        const user = response.data.user;
        if (user.roleString === "admin") {
          this.$router.push({ name: "UserList" }); 
        } else {
          this.$router.push({ name: "Approval" }); 
        }
      } catch (error) {
        console.error("Login failed:", error);
        Toastify({
          text: "Login gagal. Silakan coba lagi.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();
      }
    },
  },
};
</script>
