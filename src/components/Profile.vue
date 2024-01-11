<template>
    <div class="w-full h-full">
        <nav class="h-16">
            <!-- Navbar content -->
            <NavBar />
        </nav>
        <main class="flex justify-center w-4/5 h-full items-center bg-slate-400"
                :style="{ backgroundImage: 'url(' + bgImageUrl + ')' }"
                style="background-repeat: no-repeat; background-size: cover; background-position: center; height: 100%; width: 100%; opacity: 0.9;">
            <div class="w-2/3 rounded-box">
                <div>
                    <div class="card lg:card-side bg-base-100 shadow-xl" style="max-width: 850px;">
                        
                        <div class="card-body">
                        
                            <div class="flex w-full gap-4">
                                <h2 class="card-title">User profile</h2>
                            </div>
                            <div class="overflow-auto max-h-60 ">
                                <Form @submit="" :validation-schema="schema">
                                    <div class="form-group">
                                        <label for="username">Username</label>
                                        <Field name="username" type="text" class="form-control" v-model="userData.userName"/>
                                        <ErrorMessage name="username" class="error-feedback" />
                                    </div>

                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <Field name="email" type="text" class="form-control" v-model="userData.email"/>
                                        <ErrorMessage name="email" class="error-feedback" />
                                    </div>

                                    {{ getUserData }}

                                    <div class="form-group">
                                        <label for="tag">
                                            Add preferences
                                        </label>
                                        <div class="flex mt-1 relative bg-white overflow-x-scroll rounded-md shadow-sm focus:outline-none focus:shadow-outline border border-gray-300">
                                            <div
                                            v-for="(tag, index) in preferences"
                                            v-bind:key="index"
                                            class="flex-grow-0 text-gray-700 text-center my-1 ml-1"
                                            >
                                            <span class="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold bg-indigo-500 hover:bg-indigo-300 text-white hover:text-black cursor-pointer">
                                                {{ tag }}
                                                <button
                                                type="button"
                                                class="flex-shrink-0 -mr-0.5 ml-1.5 inline-flex hover:bg-indigo-400 p-1 rounded-full"
                                                v-on:click="removeTag(index)"
                                                >
                                                <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                                    <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                                                </svg>
                                                </button>
                                            </span>
                                            </div>
                                            <div class="flex-grow text-gray-700 text-center">
                                            <input
                                                id="tags"
                                                class="w-full h-full rounded-lg py-2 pl-2 pr-4 block w-full appearance-none leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5 outline-none"
                                                v-bind:class="{ 'opacity-0': tagInputDisabled() }"
                                                v-bind:value="preference"
                                                v-bind:disabled="tagInputDisabled()"
                                                v-on:input="processTags($event.target.value)"
                                                v-on:keydown.tab.prevent="processTagsOnKeyUpEvent($event.target.value)"
                                                v-on:keydown.space.prevent="processTagsOnKeyUpEvent($event.target.value)"
                                                v-on:keydown.enter.prevent="processTagsOnKeyUpEvent($event.target.value)"
                                            />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <button class="btn btn-primary btn-block" :disabled="loading">
                                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                            <span>Modifier</span>
                                        </button>
                                    </div>

                                    <!-- <div class="form-group">
                                        <div v-if="message" class="alert alert-danger" role="alert">
                                            {{ message }}
                                        </div>
                                    </div> -->
                                </Form>
                                
                                <!-- <p class="text-start">Préférences: {{ recipe.servings }}</p>
                                <p class="text-start">Season: {{ recipe.season }}</p>
                                <div v-show="(typeof recipe.shoppingList !== 'undefined')" class="text-start">
                                    Shopping List: 
                                    <div class="tooltip" data-tip="Click to share">
                                        <button class="btn btn-circle btn-outline">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                            </svg>
                                        </button> 
                                    </div>
                                    <p v-html="formattedShoppingList"></p>
                                </div> -->
                            </div>
                            <div class="card-actions justify-end">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span v-show="isLoading" class="loading loading-spinner text-error loading-lg"></span>
        </main>
    </div>
</template>

<script>
import NavBar from './NavBar.vue'
import UserService from '../services/user.service';
import bgImage from '../assets/images/bg3.jpeg';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
    name: 'Profile',
    components: {
        NavBar,
        Form,
        Field,
        ErrorMessage,
    }, 
    props: {
        user: {
            type: Array,
            required: false
        }
    },
    computed: {
        getUserData() {
            console.log(this.UserGet)
            return this.UserGet 
        }
    },
    data() {
        const schema = yup.object().shape({
            userName: yup.string().required("Username is required!"),
            email: yup.string().required("Email is required!").email("Invalid email format"),
        });
        return {
            isLoading: false,
            userGet: [],
            bgImageUrl: bgImage,
            schema,
            userData: {
                userName: "",
                // passwordConfirmation: "",
                email: "",
            },
            preference: '',
            preferences: []
        };
    },
    mounted() {
        this.isLoading = true;
        UserService.getInfoUser().then(
            (response) => {
                this.isLoading = false;
                this.UserGet = response.data;
            },
            (error) => {
                this.isLoading = false;
                console.log(error);
            }
        )
    },
    methods: {
        sanitizeTag(value) {
        return value.replace(/<[^>]*>?/gm, '').trim();
        },
        parsedTag(tag) {
        return tag.replace(',', '').replace(' ', '')
        },
        addIfUnique(array, value) {
        return [...new Set(array).add(value)];
        },
        processTags(value) {
        if (this.preferences.length < 5) {
            this.preference = this.sanitizeTag(value);

            if (value.length > 0 && value.indexOf(',') > -1) {
            this.revertTag();

            let tags = value.split(',');

            tags.forEach((tag) => {
                if (tag.length > 0) {
                this.preferences = this.addIfUnique(this.preferences, this.parsedTag(tag));
                }
            });
            }
        } else {
            this.revertTag();
        }
        },
        processTagsOnKeyUpEvent(value) {
            if (this.preferences.length < 5) {
                this.preference = this.sanitizeTag(value);

                if (value.length > 0) {
                    if (value.indexOf(',') > -1) {
                        this.revertTag();

                        let tags = value.split(',');

                        tags.forEach((tag) => {
                        if (tag.length > 0) {
                            this.preferences = this.addIfUnique(this.preferences, this.parsedTag(tag));
                        }
                        });
                    } else if (/\s/g.test(value)) {
                        this.revertTag();

                        let tags = value.split(' ');

                        tags.forEach((tag) => {
                        if (tag.length > 0) {
                            this.preferences = this.addIfUnique(this.preferences, this.parsedTag(tag));
                        }
                        });
                    } else {
                        this.revertTag();
                        this.preferences = this.addIfUnique(this.preferences, value);
                    }
                }
            } else {
                this.revertTag();
            }
        },
        tagInputDisabled() {
        return this.preferences.length >= 5;
        },
        removeTag(index) {
        this.preferences.splice(index, 1);
        },
        revertTag() {
        this.preference = '';
        },
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

input[type="text"] {
    display: block;
    width: 100% !important;
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    text-decoration-color: #007bff;
    color: black;
}

/* input[type="file"] {
    display: none;
} */

button[type="submit"] {
    background-color: #007bff;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>