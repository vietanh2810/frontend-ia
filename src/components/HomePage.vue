<template>
    <div class="w-full h-full">
        <nav class="bg-gray-800 h-20">
            <!-- Navbar content -->
            <NavBar />
        </nav>
        <main class="flex justify-center w-full h-full items-center bg-image"
                :style="{ backgroundImage: 'url(' + bgImageUrl + ')' }"
                style="background-repeat: no-repeat; background-size: cover; background-position: center; height: 100%; width: 100%; opacity: 0.9;">
            <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full max-w-xs" />
        </main>
    </div>
</template>

<script>
import NavBar from './NavBar.vue'
import bgImage from '../assets/images/scale.jpeg';

export default {
    name: 'HomePage',
    components: {
        NavBar
    },
    data() {
        return {
            bgImageUrl: bgImage
        };
    }
}
</script>

<style>

</style>
