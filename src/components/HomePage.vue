<template>
    <div class="w-full h-full">
        <nav class="h-16">
            <!-- Navbar content -->
            <NavBar />
        </nav>
        <main class="flex justify-center w-full h-full items-center bg-image"
            :style="{ backgroundImage: 'url(' + bgImageUrl + ')' }"
            style="background-repeat: no-repeat; background-size: cover; background-position: center; height: 100%; width: 100%; opacity: 0.9;">
            <div class="block">
                <div class="flex gap-4">
                    <div class="form-control w-52">
                        <label class="cursor-pointe label">
                            <span class="label-text ml-10 text-white">Calorie mode</span>
                            <input type="checkbox" class="toggle m-0 toggle-primary" checked />
                        </label>
                    </div>
                    <div class="form-control w-52">
                        <label class="cursor-pointer label">
                            <span class="label-text ml-10 text-white">Saison mode</span>
                            <input type="checkbox" class="toggle m-0 toggle-secondary" checked />
                        </label>
                    </div>
                </div>
                <div class="flex">
                    <input :disabled="isLoading" type="text" placeholder="Type here"
                                    class="input input-bordered input-secondary w-[416px] h-16" v-model="inputSearch"
                                    @keyup.enter="handleSubmitInput" />
                    <span v-show="isLoading" class="loading loading-spinner text-error loading-lg"></span>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import NavBar from './NavBar.vue'
import bgImage from '../assets/images/scale.jpeg';
import RecipesService from '../services/recipes.service';

export default {
    name: 'HomePage',
    components: {
        NavBar
    },
    data() {
        return {
            bgImageUrl: bgImage,
            isLoading: false,
            inputSearch: ''
        };
    },
    methods: {
        handleSubmitInput() {
            this.isLoading = true;
            const req = {
                prompt: this.inputSearch
            }
            RecipesService.suggest(req).then(
                (response) => {
                    this.isLoading = false;
                    localStorage.setItem('recipesSuggested', JSON.stringify(response.data));
                    this.$router.push('/recipes');
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

