<script setup>
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import MenuVue from '@/views/generalComponents/menu/menuVue.vue';
  import LoginAuth from './components/loginAuth.vue';
  import SignupAuth from './components/signupAuth.vue';
  import ErrorVue from '@/views/generalComponents/error/errorVue.vue'
  import { goBack } from '@/views/generalFunctions/goBack.js';
  import { authContext } from '@/stores/authContext.js';

  const isSignup = ref(false);
  const urlSearchParams = new URLSearchParams(document.location.search);
  if (urlSearchParams.get('start') === 'signup') isSignup.value = true;

  const storeAuthContext = authContext();
  const router = useRouter();

  const error = ref('');

  watch(
    () => storeAuthContext.user,
    () => {
      if (storeAuthContext.user) goBack(window, router);
    }
  );
</script>

<template>
  <header class="header header_margin header_height">
    <MenuVue />
  </header>
  <div class="auth auth_margin">
    <component 
      :is="isSignup ? SignupAuth : LoginAuth"
      @showError="(message) => error=message"
    >
    </component>
    <a
      class="auth__link nav-auth__login"
      v-show="isSignup"
      @click="isSignup = false"
    >
      Вход
    </a>
    <a
      class="auth__link nav-auth__signup"
      v-show="!isSignup"
      @click="isSignup = true"
    >
      Регистрация
    </a>
  </div>
  <ErrorVue
    class="auth-error"
    v-if="error"
    :error="error"
    @closeError="error = ''"
  />
</template>

<style scoped>
  @import '/src/assets/css/header.css';
  @import '/src/assets/css/authNav.css';

  .auth {
    font-family: 'Times New Roman', Times, serif;
    max-width: 400px;
    padding: 20px;
    border-radius: 30px;
    background-color: rgb(239, 240, 236);
  }

  .auth_margin {
    margin: 40px auto;
  }

  .auth__link {
    top: 20px;
    cursor: pointer;
  }

  .auth-error {
    display: block;
    max-width: 400px;
    margin: 40px auto;
  }
</style>
