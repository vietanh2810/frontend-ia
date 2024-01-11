
<script>
import ChatBot from './components/ChatBot.vue';
import Login from './components/Login.vue'
import Signup from './components/SignUp.vue'

export default {
  name: 'App',
  components: {
    Login,
    Signup,
    ChatBot
  },
  data() {
    return {
      sessionInterval: null,
      botData: [],
      botOptions: [],
      socket: null,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
  setup() {
  },
};
</script>


<template>
  <div id="app" class="flex w-full h-full m-0 p-0">
    <!-- style="width: 100vw !important;height: 100% !important; margin: 0 !important; padding: 0 !important;"> -->
    <router-view />
    <ChatBot v-if="currentUser" />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>