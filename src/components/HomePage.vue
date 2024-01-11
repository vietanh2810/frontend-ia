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
                                    class="input input-bordered input-secondary w-[416px] h-16 text-white" v-model="inputSearch"
                                    @keyup.enter="handleSubmitInput" />
                    <span v-show="isLoading" class="loading loading-spinner text-error loading-lg"></span>
                </div>
                <div>    
        <!-- Bouton pour partager sur Twitter -->
        <button @click="shareOnTwitter" class="flex items-center bg-blue-500 text-white px-4 py-2 rounded">
        <i class="fab fa-twitter mr-2"></i> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
      </button>
    
        <!-- Bouton pour partager sur Facebook -->
        <button @click="shareOnFacebook" class="flex items-center bg-blue-800 text-white px-4 py-2 rounded">
        <i class="fab fa-facebook mr-2"></i> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
      </button>
    
        <!-- Bouton pour partager par e-mail -->
        <button @click="shareByEmail" class="flex items-center bg-gray-700 text-white px-4 py-2 rounded">
        <i class="fas fa-envelope mr-2"></i> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
      </button>
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
        },
    shareOnTwitter() {
        console.log("twitter");
      const textToShare = this.inputSearch;
      const twitterUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(textToShare);
      window.open(twitterUrl, '_blank');
    },
    shareOnFacebook() {
        console.log('fb');
      const textToShare = this.inputSearch;
      const facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(textToShare);
      window.open(facebookUrl, '_blank');
    },
    shareByEmail() {
        const textToShare = this.inputSearch;
        const emailSubject = 'Partage de texte';  
        console.log("mail", textToShare, emailSubject);
      const emailBody = encodeURIComponent(textToShare);
      const mailtoUrl = 'mailto:?subject=' + emailSubject + '&body=' + emailBody;
      window.location.href = mailtoUrl;
    },
        
    },
    
}
</script>

<style>
input[type='text'] {
    color: white;
}
button {
    margin: 5px;
    padding: 10px;
    background-color: #007bff; /* Couleur Twitter */
    color: white;
    border: none;
    cursor: pointer;
    height: 2rem;
    width: 4rem;
  }
</style>