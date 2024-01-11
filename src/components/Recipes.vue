<template>
    <div class="w-full h-full">
        <nav class="h-16">
            <!-- Navbar content -->
            <NavBar />
        </nav>
        <main class="flex justify-center w-full h-full items-center bg-slate-400">
            <div class="w-2/3 carousel rounded-box">
                <div v-for="(recipe, index) in recipesList" :key="index" :id="`slide` + recipe.id"
                    class="carousel-item relative w-full">
                    <!-- <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" class="w-full" /> -->
                    <RecipeCard :recipe="recipe" />
                </div>
            </div>
            <span v-show="isLoading" class="loading loading-spinner text-error loading-lg"></span>
        </main>
    </div>
</template>

<script>
import NavBar from './NavBar.vue'
import RecipesService from '../services/recipes.service';
import RecipeCard from './RecipeCard.vue';

export default {
    name: 'Recipes',
    components: {
        NavBar,
        RecipeCard
    },
    props: {
        recipes: {
            type: Array,
            required: false
        }
    },
    computed: {
        recipesList() {
            const localRecipes = localStorage.getItem('recipesSuggested');
            if (localRecipes) {
                let suggested = JSON.parse(localRecipes);
                this.recipesGet.forEach(recipe => {
                    if (recipe.id === suggested.recipe) {
                        recipe.recommended = "Recommended";
                        recipe.shoppingList = suggested.shoppingList;
                    } else if (suggested.similarRecipes.includes(recipe.id)) {
                        recipe.recommended = "Similar";
                    } else {
                        recipe.recommended = null; 
                    }
                });

                this.recipesGet.sort((a, b) => {
                    if (a.recommended === "Recommended" && b.recommended !== "Recommended") {
                        return -1;
                    } else if (b.recommended === "Recommended" && a.recommended !== "Recommended") {
                        return 1;
                    } else if (a.recommended === "Similar" && b.recommended !== "Similar") {
                        return -1;
                    } else if (b.recommended === "Similar" && a.recommended !== "Similar") {
                        return 1;
                    }
                    return 0;
                });

                return this.recipesGet;

            } else {
                return this.recipesGet;
            }
        }
    },
    data() {
        return {
            isLoading: false,
            recipesGet: []
        };
    },
    mounted() {
        this.isLoading = true;
        RecipesService.getAll().then(
            (response) => {
                this.isLoading = false;
                this.recipesGet = response.data;
            },
            (error) => {
                this.isLoading = false;
                console.log(error);
            }
        )
    },
    methods: {
    },
}
</script>

