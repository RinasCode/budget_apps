<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Tambah Pengguna</h1>
      <form @submit.prevent="addUser" class="space-y-4">
        <div>
          <label for="name" class="label">Nama:</label>
          <input v-model="newUser.nameString" type="text" id="name" class="input input-bordered w-full" required />
        </div>
        <div>
          <label for="email" class="label">Email:</label>
          <input v-model="newUser.emailString" type="email" id="email" class="input input-bordered w-full" required />
        </div>
        <div>
          <label for="password" class="label">Password:</label>
          <input v-model="newUser.passwordString" type="password" id="password" class="input input-bordered w-full" required />
        </div>
        <div>
          <label for="level" class="label">Level:</label>
          <input v-model.number="newUser.levelNumber" type="number" id="level" class="input input-bordered w-full" required />
        </div>
        <div>
          <label for="department" class="label">Departemen:</label>
          <input v-model="newUser.departmentIDString" type="text" id="department" class="input input-bordered w-full" required />
        </div>
        <div>
          <label for="role" class="label">Role:</label>
          <input v-model="newUser.roleString" type="text" id="role" class="input input-bordered w-full" required />
        </div>
        <button type="submit" class="btn btn-primary">Simpan Pengguna</button>
        <button @click="cancel" type="button" class="btn btn-secondary ml-2">Batal</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { ref } from "vue";
  import { useRouter } from "vue-router"; 
  
  export default {
    name: "AddUser",
    setup() {
      const router = useRouter(); 
      const newUser = ref({
        nameString: "",
        emailString: "",
        passwordString: "",
        levelNumber: null,
        departmentIDString: "",
        roleString: "employee",
      });
  
      const addUser = async () => {
        try {
          await axios.post("http://localhost:3000/users", newUser.value);
          console.log("Pengguna berhasil ditambahkan:", newUser.value);
          resetForm();
        } catch (error) {
          console.error("Error adding user:", error);
        }
      };
  
      const resetForm = () => {
        newUser.value = {
          nameString: "",
          emailString: "",
          passwordString: "",
          levelNumber: null,
          departmentIDString: "",
          roleString: "employee",
        };
      };
  
      const cancel = () => {
        resetForm();
        router.push({ name: "UserList" }); 
        console.log("Cancelled adding user");
      };
  
      return { newUser, addUser, cancel };
    },
  };
  </script>
  
  <style scoped>

  </style>
  