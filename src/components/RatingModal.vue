<template>
    <div class="absolute h-screen w-screen bg-gray-100 flex items-center justify-center">
        <!-- Overlay with blur effect -->
        <div class="absolute top-0 left-0 right-0 bottom-0 bg-slate-400 bg-opacity-50 backdrop-blur-md"></div>

        <!-- Centered box -->
        <div class="z-10 p-10 bg-white rounded-lg shadow-lg">
            <!-- Your content here -->
            <h2 class="text-lg font-bold mb-4">Centered Box Content</h2>
            <!-- Add more content as needed -->
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'RatingModal',
    // Component data and methods go here
};
</script>
  
<style scoped>
/* Add additional styles if needed */
</style>
  