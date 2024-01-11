import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Signup from "./components/SignUp.vue";
import HomePage from "./components/HomePage.vue";
import Recipes from "./components/Recipes.vue";
import Profile from "./components/Profile.vue";

const routes = [
    {
        path: "/",
        component: HomePage,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/homepage",
        component: HomePage,
    },
    {
        path: "/recipes",
        component: Recipes,
    },
    {
        path: "/signup",
        component: Signup,
    },
    {
        path: "/profile",
        component: Profile,
    }
    // {
    //     path: "/admin",
    //     component: Admin,
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ["/login", "/signup"];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem("user");
    const userRole = loggedIn ? JSON.parse(loggedIn).user.role : null;

    if (authRequired && !loggedIn) {
        next("/login");
    } else if (to.path === "/admin" && userRole !== "admin") {
        next(from.path);
    } else {
        next();
    }
});

export default router;