<template>
    <div class="d-flex" style="width: 80vw;">
        <!-- First Div - Image -->
        <div class="container">
            <div class="content">
                <img src="../assets/images/login_ratatouille.jpeg" alt="Vue logo" />
            </div>
        </div>

        <!-- Second Div - Login Form -->
        <div class="">
            <h2>Recherche vocal</h2>
            
            <p class="d-flex mt=1 justify-content-between" style="margin-top: 2rem;">
                <button @click="startVoiceRecognition">Commencer la reconnaissance vocale</button>
            </p>
        </div>
    </div>
</template>

<script>
    import annyang from "annyang";
    export default {
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
</script>