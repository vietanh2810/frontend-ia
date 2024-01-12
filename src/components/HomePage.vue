<template>
    <div class="w-full h-full">
        <nav class="h-16">
            <!-- Navbar content -->
            <NavBar />
        </nav>
        <main class="flex justify-center w-full h-full items-center bg-image"
            :style="{ backgroundImage: 'url(' + bgImageUrl + ')' }"
            style="background-repeat: no-repeat; background-size: cover; background-position: center; height: 100%; width: 100%; opacity: 0.9;">
            <div class="block w-1/4">
                <div class="flex justify-center">
                    <div class="form-control w-52">
                        <label class="cursor-pointer label">
                            <span class="label-text ml-10 text-white">Saison mode</span>
                            <input type="checkbox" class="toggle m-0 toggle-secondary" v-model="isSaisonMode" />
                        </label>
                    </div>
                </div>
                <div class="flex">
                    <input :disabled="isLoading" type="text" placeholder="Type here"
                        class="input input-bordered input-secondary w-[416px] h-16 text-white" v-model="inputSearch"
                        @keyup.enter="handleSubmitInput" />
                    <div v-show="isLoading" class="rounded-full ml-4 overflow-hidden" style="width: 60px; height: 60px;">
                        <img src="../assets/images/remy.jpeg" class="rotate" width="60" height="60" />
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import NavBar from './NavBar.vue'
import bgImage from '../assets/images/scale.jpeg';
import RecipesService from '../services/recipes.service';
import Remy from '../assets/images/remy.jpeg';

export default {
    name: 'HomePage',
    components: {
        NavBar
    },
    data() {
        return {
            bgImageUrl: bgImage,
            isLoading: false,
            inputSearch: '',
            isSaisonMode: false
        };
    },
    methods: {
        handleSubmitInput() {
            this.isLoading = true;
            const req = {
                prompt: this.inputSearch,
                saisonMode: this.isSaisonMode
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


<style scoped>
.rotate {
    animation: rotation 2s infinite linear;
}

@keyframes rotation {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(359deg);
    }
}

input[type='text'] {
    color: white;
}
</style>

