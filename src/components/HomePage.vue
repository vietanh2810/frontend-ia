<style>
    .active{
        background-color: green;
    }
    .inactive{
        background-color: red;
    }
</style>
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
                                    class="input input-bordered input-secondary w-[416px]" id="transcript" v-model="inputSearch"
                                    @keyup.enter="handleSubmitInput" />
                    <div class="speech">
                        <button type="button" 
                        :class="true ? 'active' : 'inactive'"
                        class="input input-bordered input-secondary voiceInput"
                        @click="startVoiceRecognition()">
                    <img src="https://webocreation.com/wp-content/uploads/2022/02/voice-icons.png"/></button>
                    </div>
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
import * as annyang from "annyang";

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
        },
        startVoiceRecognition() {
            if(annyang === null) return;
            console.log("annyang : ", annyang.isListening());
            console.log("web voice ? ", window.hasOwnProperty('webkitSpeechRecognition'));
                if (!annyang.isListening()) {
                    annyang.setLanguage('fr-FR'); // Définissez la langue selon vos besoins
                    let commands = {
                        'Hello' : recipes
                    }
                    function recipes(){
                        var inputElement = document.getElementById('transcript');
                        inputElement.value = "Recette de pates";
                    }
                    annyang.addCommands(commands);
                    annyang.addCommands({
                    'recherche *term': (term) => {
                        // Traitez la saisie vocale ici (par exemple, effectuez une recherche et redirigez l'utilisateur)
                        console.log('Recherche:', term);
                        // Redirigez l'utilisateur vers la page de résultats de recherche
                        this.$router.push({ path: '/search', query: { term } });
                    },
                    });
                    annyang.start();
                } else if (annyang.isListening()){
                    annyang.abort();
                } else {
                    console.error("La reconnaissance vocale n'est pas prise en charge dans ce navigateur.");
                }
        }
    },
}
</script>

<style>
input[type='text'] {
    color: white;
}
</style>