import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Libreria from "../views/Libreria.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/libreria",
        name: "Libreria",
        component: Libreria,
        params: true,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
