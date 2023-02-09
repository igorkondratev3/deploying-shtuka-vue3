<script setup>
  import { RouterLink } from 'vue-router';
  import { authContext } from '@/stores/authContext.js';
  import { deleteUserInformationFromStores } from '@/views/generalFunctions/deleteUserInformationFromStores.js';
  import { deleteRefreshTokenFromDB } from '@/views/generalFunctions/refreshToken.js';
  import { shtukaChannel } from '@/shtukaChannel.js';

  const storeAuthContext = authContext();

  const logout = async () => {
    await deleteRefreshTokenFromDB(storeAuthContext.user?.refreshToken);
    localStorage.removeItem('user');
    deleteUserInformationFromStores();
    shtukaChannel.postMessage('logout');
  };
</script>

<template>
  <nav class="nav-auth">
    <button
      class="nav-auth__logout"
      v-show="storeAuthContext.user"
      @click="logout"
    >
      Выйти
    </button>
    <div v-show="!storeAuthContext.user">
      <router-link
        to="/auth?start=login"
        class="nav-auth__login"
      >
        Вход
      </router-link>
      /
      <router-link
        class="nav-auth__signup"
        to="/auth?start=signup"
      >
        Регистрация
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
  @import '/src/assets/css/authNav.css';
</style>
