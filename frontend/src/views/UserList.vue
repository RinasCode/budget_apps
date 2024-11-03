<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Daftar Pengguna</h1>
      <button @click="logout" class="btn btn-error btn-sm mb-4">Logout</button>
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Level</th>
            <th>Departemen</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.idString">
            <td>{{ user.idString }}</td>
            <td>{{ user.nameString }}</td>
            <td>{{ user.emailString }}</td>
            <td>{{ user.levelNumber }}</td>
            <td>{{ user.departmentIDString }}</td>
            <td>{{ user.roleString }}</td>
            <td>
              <button @click="editUser(user.idString)" class="btn btn-warning btn-xs">Edit</button>
              <button @click="deleteUser(user.idString)" class="btn btn-error btn-xs">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addUser" class="btn btn-primary btn-sm mt-4">Tambah Pengguna</button>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { ref } from "vue";
  import { useRouter } from "vue-router"; 
  
  export default {
    name: "UserList",
    setup() {
      const router = useRouter(); 
      const users = ref([]);
  
     
      const fetchUsers = async () => {
        try {
          const response = await axios.get("http://localhost:3000/users");
          users.value = response.data;
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
  
    
      const deleteUser = async (id) => {
        try {
          await axios.delete(`http://localhost:3000/users/${id}`);
          fetchUsers(); 
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      };
  
      
      const editUser = (id) => {
        router.push({ name: "AddUser", query: { id } }); 
      };
  
     
      const addUser = () => {
        router.push({ name: "AddUser" }); 
      };
  
      
      const logout = () => {
        localStorage.removeItem("user"); 
        router.push({ name: "Login" }); 
        console.log("User logged out");
      };
  

      fetchUsers();
  
      return { users, deleteUser, editUser, addUser, logout };
    },
  };
  </script>
  
  <style scoped>

  </style>
  