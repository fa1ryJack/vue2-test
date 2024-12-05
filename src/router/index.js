import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../components/Home.vue"
import PageOne from '../components/PageOne.vue'
import PageTwo from '../components/PageTwo.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/one",
      name: "one",
      component: PageOne,
    },
    {
      path: "/two",
      name: "two",
      component: PageTwo,
    },
  ],
});

export default router;
