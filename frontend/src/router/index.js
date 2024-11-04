import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Approval from "../views/Approval.vue";
import UserList from "../views/UserList.vue";
import AddUser from "../views/AddUser.vue";
import BudgetRequestList from "../views/BudgetRequest.vue"; 
import AddBudget from "../views/AddBudget.vue";

const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "admin";
};

const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  return user != null;
};

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: (to, from, next) => {
      if (isAdmin()) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/approval",
    name: "Approval",
    component: Approval,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/users",
    name: "UserList",
    component: UserList,
  },
  {
    path: "/add-user",
    name: "AddUser",
    component: AddUser,
    beforeEnter: (to, from, next) => {
      if (isAdmin()) {
        next();
      } else {
        next({ name: "UserList" });
      }
    },
  },
  {
    path: "/budget-request",
    name: "BudgetRequestList",
    component: BudgetRequestList,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/add-budget-request",
    name: "AddBudgetRequest",
    component: AddBudget,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
