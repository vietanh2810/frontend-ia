<template>
    <div class="d-flex w-full"
            :style="{ backgroundImage: 'url(' + bgImageUrl + ')' }"
                style="background-repeat: no-repeat; background-size: cover; background-position: center; height: 100%; width: 100%; opacity: 0.9;">
        <!-- First Div - Image -->
        <div class="container">
            <div class="content w-full h-full" >
                <!-- <img src="../assets/images/login_ratatouille.jpeg" class="object-cover" alt="Vue logo" /> -->
            </div>
        </div>

        <!-- Second Div - Login Form -->
        <div class="login-form">
            <h2>Login</h2>
            <Form @submit="handleLogin" :validation-schema="schema">
                <div class="form-group">
                    <label for="email">Email</label>
                    <Field name="email" type="text" class="form-control" />
                    <ErrorMessage name="email" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <Field name="password" type="password" class="form-control" />
                    <ErrorMessage name="password" class="error-feedback" />
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        <span>Login</span>
                    </button>
                </div>

                <div class="form-group">
                    <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                    </div>
                </div>
            </Form>
            <p class="flex mt=1 justify-between" style="margin-top: 2rem;">Don't have an account? <a
                    href="/signup">Sign Up</a></p>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import bgImage from '../assets/images/bg-login.jpeg';
const apiEndpoint = import.meta.env.VUE_APP_API_ENDPOINT;

export default {
    name: "Login",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            email: yup.string().required("Email is required!"),
            password: yup.string().required("Password is required!"),
        });

        return {
            loading: false,
            message: "",
            schema,
            email: "",
            password: "",
            bgImageUrl: bgImage,
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/homepage");
        }
    },
    methods: {
        handleLogin(user) {
            this.loading = true;

            this.$store.dispatch("auth/login", user).then(
                () => {
                    this.$router.push("/homepage");
                    localStorage.setItem('chatMessages', JSON.stringify([]));
                },
                (error) => {
                    this.loading = false;
                    this.message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
    },
};
</script>

<style>
.d-flex {
    display: flex;
    width: 100%;
}

.container {
    flex: 7;
    /* Make the container take 80% of the available width */
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    /* Set the container height to full viewport height */
}

.content img {
    max-width: 100%;
    /* Ensure the image doesn't exceed the container width */
    height: auto;
    /* Maintain aspect ratio */
}

.login-form {
    flex: 3;
    /* Make the login form take 20% of the available width */
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #303030;
    /* Add a background color for visibility */
}

.login-form h2 {
    text-align: center;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 5px;
}

input[type="password"] {
    display: block;
    width: 100% !important;
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type="password"] {
    color: black;
}

button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>