<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Budget Requests</h1>
      <button @click="logout" class="bg-red-500 text-white rounded px-4 py-2 mb-4">Logout</button>
      <table class="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 px-4 py-2">ID</th>
            <th class="border border-gray-300 px-4 py-2">User ID</th>
            <th class="border border-gray-300 px-4 py-2">Request Date</th>
            <th class="border border-gray-300 px-4 py-2">Amount</th>
            <th class="border border-gray-300 px-4 py-2">Reason</th>
            <th class="border border-gray-300 px-4 py-2">Status</th>
            <th class="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in budgetRequests" :key="request.idString" class="hover:bg-gray-100">
            <td class="border border-gray-300 px-4 py-2">{{ request.idString }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ request.userIdString }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ new Date(request.requestDate).toLocaleDateString() }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ request.amount }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ request.reason }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ request.status }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <button @click="viewDetails(request.idString)" class="bg-blue-500 text-white rounded px-4 py-1">Detail</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const budgetRequests = ref([]);
      const router = useRouter();
  
      const fetchBudgetRequests = async () => {
        try {
          const response = await axios.get('http://localhost:3000/budget-request', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log('Data fetched:',response.data);
          
          budgetRequests.value = response.data;
        } catch (error) {
          console.error('Error fetching budget requests:', error);
        }
      };
  
      const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 
        router.push({ name: 'Login' }); 
      };
  
      const viewDetails = (id) => {
        router.push({ name: 'Approval', params: { id } });
      };
  
      onMounted(fetchBudgetRequests);
  
      return {
        budgetRequests,
        viewDetails,
        logout,
      };
    },
  };
  </script>

  