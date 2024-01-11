<template>
    <div>
        <div class="card lg:card-side bg-base-100 shadow-xl" style="max-width: 850px; margin-left: 60px;">
            <figure>
                <img :src="recipe.imageURL" :alt="recipe.imageURL" style="width: 400px; height: 400px;" />
            </figure>
            <div class="card-body">
                <div v-show=" recipe.recommended !== null" class="badge badge-outline" :class="recipe.recommended === 'Recommended' ? 'badge-secondary' : 'badge-primary'">{{ recipe.recommended }}</div>
                <div class="flex justify-between"> 
                    <div class="rating">
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                    </div>
                    <input type="radio" name="rating-3" class="mask mask-heart h-6 w-6 bg-red-400" v-model="recipe.isFavorite" />
                </div>
                <div class="flex w-full gap-4">
                    <h2 class="card-title">{{ recipe.name }}</h2>
                </div>
                <div class="overflow-auto max-h-60 max-w-[517px]">
                    <p class="text-start">Description: {{ recipe.description }}</p>
                    <p class="text-start">Instruction: {{ recipe.instructions }}</p>
                    <p class="text-start">Prep Time: {{ recipe.prepTime }} minutes</p>
                    <p class="text-start">Cook Time: {{ recipe.cookTime }} minutes</p>
                    <p class="text-start">Servings: {{ recipe.servings }}</p>
                    <p class="text-start">Category: {{ recipe.category }}</p>
                    <p v-show="pairings !== ''" class="text-start">Pairings: {{ pairings }}</p>
                    <p v-show="calories !== ''" class="text-start">Calories: {{ calories }}</p>
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
                    </div>
                </div>
                <div class="card-actions justify-end">
                    <button v-show="pairings === ''" class="btn btn-primary" @click="getParing">Get recommended pairing</button>
                    <button v-show="calories === ''" class="btn btn-primary" @click="getCalorie">Get calorie of this dish</button>
                    <div v-show="isLoading" class="rounded-full ml-4 overflow-hidden" style="width: 60px; height: 60px;">
                        <img src="../assets/images/remy.jpeg" class="rotate" width="60" height="60" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import RecipesService from '../services/recipes.service';

export default {
    name: 'RecipeCard',
    components: {
    },
    props: {
        recipe: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            pairings: '',
            isLoading: false,
            calories: ''
        };
    },
    computed: {
        formattedShoppingList() {
            return typeof this.recipe.shoppingList !== 'undefined' ? this.recipe.shoppingList.replace(/\n/g, "<br>") : null;
        }
    },
    methods: {
        getParing() {
            if (this.pairings !== '') {
                return;
            }
            this.isLoading = true;
            const req = {
                recipeId: this.recipe.id
            }
            RecipesService.getPairings(req).then(
                (response) => {
                    this.pairings = response.data.recommendation;
                    this.isLoading = false;
                },
                (error) => {
                    console.log(error);
                    this.isLoading = false;
                }
            )
        },
        getCalorie() {
            if (this.calories !== '') {
                return;
            }
            this.isLoading = true;
            const req = {
                recipeId: this.recipe.id
            }
            RecipesService.getCalories(req).then(
                (response) => {
                    this.calories = response.data.calorie;
                    this.isLoading = false;
                },
                (error) => {
                    console.log(error);
                    this.isLoading = false;
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
</style>