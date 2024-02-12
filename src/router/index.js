import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Main",
      component: () => import("../views/Main.vue"),
    },
    {
      path: "/basket",
      name: "Basket",
      component: () => import("../views/Basket.vue"),
    },
    {
      path: "/pizza/:id",
      name: "pizza",
      component: () => import("../views/PizzaFull.vue"),
    },

    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/registration",
      name: "Registration",
      component: () => import("../views/Registration.vue"),
    },
    {
      path: "/orders",
      name: "Orders",
      component: () => import("../views/Order.vue"),

    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/Main.vue"),
    }
  ],
});

router.beforeEach((to, from, next) => {
  const access_token = localStorage.getItem("access_token");
  if(access_token){
    if(to.name ==="Login" ||to.name ==="Registration" ){
      return next({ name: "Main" })
    }
  }
  if(!access_token){
    if(to.name ==="Orders"){
      return next({ name: "Main" })
    }
  }
 

  next();
});

export default router;
