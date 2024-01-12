<template>
    <div>
        <div class="card grid lg:card-side bg-base-100 shadow-xl" style="max-width: 850px; margin-left: 60px;">
            <div class="flex w-full h-full">
                <figure>
                    <img :src="recipe.imageURL" :alt="recipe.imageURL" style="width: 400px; height: 400px;" />
                </figure>
                <div class="card-body">
                    <div class="flex justify-start gap-2">
                        <div v-show="recipe.recommended !== null" class="badge badge-outline"
                            :class="recipe.recommended === 'Recommended' ? 'badge-secondary' : 'badge-primary'">
                            {{ recipe.recommended }}
                        </div>
                        <div v-show="recipe.isFavorite" class="badge badge-outline badge-success">My favorite</div>
                    </div>
                    <div class="flex w-full gap-4">
                        <h2 class="card-title">{{ recipe.name }}</h2>
                    </div>
                    <div class="overflow-auto max-w-[517px]"
                        :class="(pairings !== '' && calories !== '') ? 'h-[21rem]' : 'h-[13rem]'">
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
                            <p v-html="formattedShoppingList"></p>
                        </div>
                    </div>
                    <div class="card-actions pt-8 w-full gap-4 pl-10 justify-center">
                        <div class="tooltip" data-tip="Get pairing recommendation">
                            <button v-show="pairings === '' && !isLoading" class="btn btn-primary" @click="getParing">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
                                </svg>
                            </button>
                        </div>
                        <div class="tooltip" data-tip="Get calories amount of this dish">
                            <button v-show="calories === '' && !isLoading" class="btn btn-primary" @click="getCalorie">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                                </svg>
                            </button>
                        </div>
                        <div class="tooltip" data-tip="Add your rating">
                            <button v-show="!isLoading" class="btn btn-primary" @click="createRating">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                </svg>
                            </button>
                            <div v-if="isOpenRating"
                                class="absolute z-10 h-60 w-96 p-4 grid bg-slate-400 shadow-lg rounded left-1/2 transform -translate-x-1/2 bottom-full mb-2">
                                <div class="flex justify-end">
                                    <!-- <button class="btn btn-circle btn-outline">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button> -->
                                    <p class="text-2xl text-bold">Rate this dish!</p>
                                    <button class="btn btn-circle" @click="isOpenRating = false">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="flex justify-start h-10">
                                    Rating: <input type="number" min="1" max="5" class="w-15 text-black h-8"
                                        v-model="rating" />/5
                                </div>
                                <div class="flex justify-start h-10">
                                    Comment: <input type="text" class=" text-black w-40" v-model="comment" />
                                </div>
                                <div class="flex justify-end h-10">
                                    <button class="btn btn-primary" @click="submitRating">Submit</button>
                                </div>
                            </div>
                        </div>
                        <div class="tooltip" data-tip="Share the shopping list">
                            <button v-show="!isLoading" class="btn btn-primary" @click="openShareOption">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                </svg>
                            </button>
                            <div v-if="isOpenShareOption"
                                class="absolute z-10 h-20 w-80 p-4 grid bg-slate-400 shadow-lg rounded left-1/2 transform -translate-x-1/2 bottom-full mb-2">
                                <div class="flex justify-center gap-2">
                                    <div class="tooltip" data-tip="Share to X">
                                        <button v-show="!isLoading" class="btn btn-primary" @click="shareOnTwitter">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="tooltip" data-tip="Copy to clipboard">
                                        <button v-show="!isLoading" class="btn btn-primary" @click="copyToClipBoard">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="tooltip" data-tip="Share to someone with your mail">
                                        <button v-show="!isLoading" class="btn btn-primary" @click="shareByEmail">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="tooltip" data-tip="Close sharing">
                                        <button v-show="!isLoading" class="btn btn-primary"
                                            @click="isOpenShareOption = false">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tooltip" data-tip="Add this dish to your favorites">
                            <button v-show="!recipe.isFavorite && !isLoading" class="btn btn-primary" @click="addTofav">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </button>
                        </div>
                        <div v-show="isLoading" class="rounded-full ml-4 overflow-hidden"
                            style="width: 60px; height: 60px;">
                            <img src="../assets/images/remy.jpeg" class="rotate" width="60" height="60" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex w-full h-full">
                <div class="w-full px-4 carousel overflow-auto h-20 max-w-[790px]">
                    <div v-for="(rating, index) in ratings" :key="index" :id="`slide` + index"
                        class="carousel-item relative border-white rounded-box border h-10 flex justify-center items-center mr-2">
                        <!-- <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" class="w-full" /> -->
                        <div class="tooltip tooltip-bottom w-full mx-20" :data-tip="rating.comment">
                            <p>Rating: {{ rating.rating }}/5</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import RecipesService from '../services/recipes.service';
import RatingModal from './RatingModal.vue';

export default {
    name: 'RecipeCard',
    components: {
        RatingModal
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
            calories: '',
            isOpenRating: false,
            comment: '',
            rating: 0,
            ratings: [],
            isOpenShareOption: false
        };
    },
    computed: {
        formattedShoppingList() {
            return typeof this.recipe.shoppingList !== 'undefined' ? this.recipe.shoppingList.replace(/\n/g, "<br>") : null;
        },
        textShoppingList() {
            return typeof this.recipe.shoppingList !== 'undefined' ? this.recipe.shoppingList : null;
        },
        mailUrl() {
            return `mailto:?subject=Shopping List&body=${encodeURIComponent(this.textShoppingList)}`;
        }
    },
    mounted: function () {
        RecipesService.getRatings(this.recipe.id).then(
            (response) => {
                this.ratings = response.data;
            },
            (error) => {
                console.log(error);
            }
        )
    },
    methods: {
        addTofav() {
            this.isLoading = true;
            const req = {
                recipeId: this.recipe.id
            }
            RecipesService.addToFav(req).then(
                (response) => {
                    this.isLoading = false;
                    this.recipe.isFavorite = true;
                },
                (error) => {
                    this.isLoading = false;
                    console.log(error);
                }
            )
        },
        createRating() {
            this.isOpenRating = true;
        },
        openShareOption() {
            if (typeof this.recipe.shoppingList === 'undefined' || this.recipe.shoppingList === '' ) {
                RecipesService.getShoppingList(this.recipe.id).then(
                    (response) => {
                        console.log(response);
                        this.recipe.shoppingList = response.data.shoppingListString;
                        this.isOpenShareOption = true;
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            } else {
                this.isOpenShareOption = true;
            }
        },
        copyToClipBoard() {
            navigator.clipboard.writeText(this.textShoppingList);
            this.isOpenShareOption = false;
        },
        shareOnTwitter() {
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.textShoppingList)}`;
            window.open(url, '_blank');
            this.isOpenShareOption = false;
        },
        shareByEmail() {
            // Create the mailto URL
            const subject = encodeURIComponent("Shopping List");
            const body = encodeURIComponent(this.textShoppingList);
            const mailUrl = `mailto:vietanhc12@gmail.com?subject=${subject}&body=${body}`;

            // Create a temporary anchor element
            const tempLink = document.createElement('a');
            tempLink.href = mailUrl;
            tempLink.style.display = 'none'; // Hide the link
            document.body.appendChild(tempLink); // Add it to the document

            // Trigger the click
            tempLink.click();

            // Remove the element from the document
            document.body.removeChild(tempLink);
            this.isOpenShareOption = false;
        },
        submitRating() {
            this.isLoading = true;
            const req = {
                rating: this.rating,
                comment: this.comment
            }
            RecipesService.rateRecipe(this.recipe.id, req).then(
                (response) => {
                    this.isLoading = false;
                    this.isOpenRating = false;
                    this.rating = 0;
                    this.comment = '';
                    this.ratings = this.ratings.length > 0 ? [
                        {
                            point: response.data.rating,
                            comment: response.data.comment
                        },
                        ...this.ratings,
                    ] : [
                        {
                            rating: response.data.rating,
                            comment: response.data.comment
                        }
                    ]
                },
                (error) => {
                    this.isLoading = false;
                    console.log(error);
                }
            )
        },
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