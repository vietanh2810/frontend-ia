<template>
    <main class="flex justify-center w-4/5 h-full items-center bg-slate-400"
                :style="{ backgroundImage: 'url(' + bgImageUrl + ')' }"
                style="background-repeat: no-repeat; background-size: cover; background-position: center; height: 100%; width: 100%; opacity: 0.9;">
        <div class="w-2/3 rounded-box">
            <div>
                <div class="card lg:card-side bg-base-100 shadow-xl" style="max-width: 850px; margin-left: 60px;">
                    
                    <div class="card-body">
                        <div class="signup-form">
                            <h2>Sign Up</h2>
                            <Form @submit="handleSubmit" :validation-schema="schema">
                                <div class="form-group">
                                    <label for="userName">Username:</label>
                                    <Field name="userName" type="text" class="form-control" />
                                    <ErrorMessage name="userName" class="error-feedback" />
                                </div>

                                <div class="form-group">
                                    <label for="password">Password:</label>
                                    <Field name="password" type="password" class="form-control" />
                                    <ErrorMessage name="password" class="error-feedback" />
                                </div>

                                <div class="form-group">
                                    <label for="passwordConfirmation">Confirm Password:</label>
                                    <Field name="passwordConfirmation" type="password" class="form-control" />
                                    <ErrorMessage name="passwordConfirmation" class="error-feedback" />
                                </div>

                                <div class="form-group">
                                    <label for="email">Email:</label>
                                    <Field name="email" type="email" class="form-control" />
                                    <ErrorMessage name="email" class="error-feedback" />
                                </div>
                                <button type="submit">Sign Up</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
    name: "SignUp",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            userName: yup.string().required("Username is required!"),
            password: yup
                .string()
                .required("Password is required!")
                .min(8, "Password must be at least 8 characters"),
            passwordConfirmation: yup
                .string()
                .oneOf([yup.ref("password"), null], "Passwords do not match")
                .required("Password confirmation is required!"),
            email: yup.string().required("Email is required!").email("Invalid email format"),
        });

        return {
            schema,
            userData: {
                userName: "",
                password: "",
                // passwordConfirmation: "",
                email: "",
            },
        };
    },
    methods: {
        handleSubmit(user) {
            delete user.passwordConfirmation;

            this.$store.dispatch("auth/register", user).then(
                () => {
                    this.$router.push("/login");
                    console.log("User registered successfully!")
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
            )
        },
    },
};
</script>

<style>
/* Your custom styles here */
</style>

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