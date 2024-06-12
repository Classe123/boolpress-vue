import { createRouter, createWebHistory } from "vue-router";

import AppHome from "./pages/AppHome.vue";
import PostList from "./pages/PostList.vue";
import PostComponent from "./pages/PostComponent.vue";
import NotFound from "./pages/NotFound.vue";
import ContactComponent from "./pages/ContactComponent.vue";
import AboutComponent from "./pages/AboutComponent.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/posts",
      name: "posts",
      component: PostList,
    },
    {
      path: "/posts/:slug",
      name: "single-post",
      component: PostComponent,
    },
    {
      path: "/about",
      name: "about-us",
      component: AboutComponent,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactComponent,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
    },
  ],
});

export { router };
