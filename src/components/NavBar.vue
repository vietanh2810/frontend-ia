<template>
    <div class="w-full">
        <div class="navbar h-16 bg-base-100 items-center">
            <div class="flex-1 items-center align-center">
                <a class="btn btn-ghost text-xl" @click="toHomePage">RemyTheChef</a>
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal px-1">
                    <li><a @click="toSearch">Search</a></li>
                    <li><a @click="toRecipe">Recipes</a></li>
                </ul>
            </div>
            <div class="flex-none gap-2 items-center">
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component"
                                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabindex="0"
                        class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a class="justify-between">
                                Profile
                                <!-- <span class="badge">New</span> -->
                            </a>
                        </li>
                        <li><a @click="logOut">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    // Component logic goes here,
    data() {
        return {
        };
    },
    methods: {
        toHomePage() {
            this.$router.push('/');
        },
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        },
        toSearch() {
            this.$router.push('/');
        },
        toRecipe() {
            this.$router.push('/recipes');
        }
    },
}
</script>

<style scoped>
.navbar {
    /* Sidebar styles go here */
}
</style>
