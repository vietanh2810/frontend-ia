<template>
    <div class="w-full h-full">
        <nav class="h-16">
            <!-- Navbar content -->
            <NavBar />
        </nav>
        <main class="flex justify-center w-4/5 h-full items-center bg-slate-400"
            :style="{ backgroundImage: 'url(' + bgImageUrl + ')' }"
            style="background-repeat: no-repeat; background-size: cover; background-position: center; height: 100%; width: 100%; opacity: 0.9;">
            <div class="w-2/3 h-full flex justify-center items-center rounded-box">
                <div class="card h-2/3 w-full lg:card-side bg-base-100 shadow-xl" style="max-width: 850px;">
                    <div class="card-body flex-row w-full h-full">
                        <div class="w-full h-full ">
                            <div class="flex w-full items-center h-1/2 gap-2 justify-center">
                                <div class="w-52 align-middle rounded-full">
                                    <img alt="Tailwind CSS Navbar component"
                                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                                <div class="grid grid-cols-1 items-center w-2/3 gap-2 pl-10 justify-center h-full">
                                    <input type="text" placeholder="Username" class="input input-bordered"
                                        v-model="username" />
                                    <input type="text" placeholder="Email" class="input input-bordered"
                                        v-model="email" />
                                </div>
                            </div>
                            <div class="flex w-full items-center mt-4 h-1/2 justify-center">
                                <div class="grid grid-cols-1 items-center w-full px-2 justify-center h-full">
                                    <textarea class="textarea  h-28 textarea-bordered" v-model="preferences" placeholder="Preferences"></textarea>
                                    <button v-show="!isLoading" type="submit" @click="handleSubmit" @submit="handleSubmit" class="btn btn-primary">Save</button>
                                    <span v-show="isLoading" class="loading loading-spinner text-error loading-lg"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </main>
    </div>
</template>

<script>
import NavBar from './NavBar.vue'
import UserService from '../services/user.service';
import bgImage from '../assets/images/bg3.jpeg';

export default {
    name: 'Profile',
    components: {
        NavBar,
    },
    props: {
        user: {
            type: Array,
            required: false
        }
    },
    data() {
        return {
            isLoading: false,
            bgImageUrl: bgImage,
            userData: null,
            preferences: '',
            username: '',
            email: '',
        };
    },
    mounted() {
        this.isLoading = true;
        UserService.getInfoUser().then(
            (response) => {
                this.isLoading = false;
                this.userData = response.data;
                this.username = this.userData.username;
                this.email = this.userData.email;
                this.preferences = this.userData.preferences;
            },
            (error) => {
                this.isLoading = false;
                console.log(error);
            }
        )
    },
    methods: {
        handleSubmit() {
            this.isLoading = true;
            const req = {
                username: this.username,
                email: this.email,
                preferences: this.preferences
            }
            UserService.editUser(req).then(
                (response) => {
                    this.isLoading = false;
                    this.userData = response.data.user;
                    this.username = this.userData.username;
                    this.email = this.userData.email;
                    this.preferences = this.userData.preferences;
                },
                (error) => {
                    this.isLoading = false;
                    console.log(error);
                }
            )
        }
    },
}
</script>

<style>
.signup-form {
    max-width: 400px;
    margin: 4rem auto;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    font-weight: bold;
}

/* input[type="text"] {
    display: block;
    width: 100% !important;
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    text-decoration-color: #007bff;
    color: black;
} */

/* input[type="file"] {
    display: none;
} */

/* button[type="submit"] {
    background-color: #007bff;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
} */
</style>