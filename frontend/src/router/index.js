import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Approval from "../views/Approval.vue";
import UserList from "../views/UserList.vue";
import AddUser from "../views/AddUser.vue";

const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "admin";
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
      const user = localStorage.getItem("user");
      if (user) {
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
