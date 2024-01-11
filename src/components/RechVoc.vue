<style>
    .speech {
        float: left;
        border: 1px solid #ccc;
        border-radius: 10px 0px 0px 10px;
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
        border-right: 0px;
        align-items: center;
        display: flex;
        height: 40px;
        padding: 0px 10px;
    }

    .speech img {
        width: 20px;
        position: relative;
        margin: auto;
    }

    #search .input-lg {
        height: 42px;
        line-height: 20px;
        padding: 0 10px;
        border-radius: 0px;
        border: 1px solid #ccc;
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
        border-left-width: 0px;
    }

    .btn {
        height: 42px;
        border: 1px solid #ccc;
        padding: 0px 10px;
        border-radius: 0px 10px 10px 0px;
    }
</style>
<template>
    <div class="w-full h-full">
        <nav class="bg-gray-800 h-20">
            <!-- Navbar content -->
            <NavBar />
        </nav>
        <div class="">
            <h2>Recherche vocal</h2>
            
            <p class="d-flex mt=1 justify-content-between" style="margin-top: 2rem;">
                <button @click="startVoiceRecognition">Commencer la reconnaissance vocale</button>
            </p>
        </div>
        <main class="flex justify-center w-full h-full items-center bg-image"
                :style="{ backgroundImage: 'url(' + bgImageUrl + ')' }"
                style="background-repeat: no-repeat; background-size: cover; background-position: center; height: 100%; width: 100%; opacity: 0.9;">
                <form>
<div style="display:inline-flex">
    <div class="speech">
        <img onclick="startDictation()"
            src="https://webocreation.com/wp-content/uploads/2022/02/voice-icons.png" />
    </div>
    <div id="search" class="input-group">
        <input type="text" name="search" value="" placeholder="Search" class="form-control input-lg" />
    </div>
    <div class="input-group-btn">
        <button type="button" class="btn ">GO</button>
    </div>
</div>
</form>
                <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full max-w-xs" />
        </main>


    </div>
</template>

<script>

import NavBar from './NavBar.vue'

import bgImage from '../assets/images/rechercheVoc.jpg';
    import * as annyang from "annyang";
    export default {
        name: 'RechVoc',
    components: {
        NavBar
    },
    data() {
        return {
            bgImageUrl: bgImage
        };
    },
        methods: {
            startVoiceRecognition() {
                if (annyang) {
                    annyang.setLanguage('fr-FR'); // Définissez la langue selon vos besoins
                    
                    annyang.addCommands({
                    'recherche *term': (term) => {
                        // Traitez la saisie vocale ici (par exemple, effectuez une recherche et redirigez l'utilisateur)
                        console.log('Recherche:', term);
                        // Redirigez l'utilisateur vers la page de résultats de recherche
                        this.$router.push({ path: '/search', query: { term } });
                    },
                    });

                    annyang.start();
                } else {
                    console.error("La reconnaissance vocale n'est pas prise en charge dans ce navigateur.");
                }
            }
        }
    };


    function startDictation() {
        if (window.hasOwnProperty('webkitSpeechRecognition')) {
            var recognition = new webkitSpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.lang = 'en-US';
            recognition.start();

            recognition.onresult = function (e) {
                document.getElementsByClassName('form-control')[0].value = e.results[0][0].transcript;
                recognition.stop();
                document.getElementsByClassName('btn-default')[0].submit();
            };

            recognition.onerror = function (e) {
                recognition.stop();
            };
        }
    }
</script>
