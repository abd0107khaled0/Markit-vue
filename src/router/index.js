import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Logout from "@/views/Logout.vue";
import Login from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";
import Men from "@/views/Men.vue";
import Women from "@/views/Women.vue";
import Error from "@/components/Error/Error.vue";
import Show from "@/views/Show.vue";
import Cart from "@/components/Cart/Cart.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/men",
    name: "Men",
    component: Men,
  },
  {
    path: "/women",
    name: "Women",
    component: Women,
  },
  {
    path: "/show/:showId",
    name: "Show",
    component: Show,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/:catchAll(.*)",
    name: "Error",
    component: Error,
  },
];
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
