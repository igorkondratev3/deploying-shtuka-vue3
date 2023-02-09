<script setup>
  import { ref } from 'vue';
  import { fetchAuth } from './fetch.js';
  import { authContext } from '@/stores/authContext.js';
  import { shtukaChannel } from '@/shtukaChannel.js';

  const emits = defineEmits(['showError'])

  const storeAuthContext = authContext();
  const email = ref('');
  const password = ref('');
  const isLoading = ref(false);
  const formLogin = ref(null);
  const emailLogin = ref(null);
  const passwordLogin = ref(null);

  const isPasswordEventListener = ref(false);
  const validate = () => {
    if (isPasswordEventListener.value) {
      passwordLogin.value.setCustomValidity('');
      passwordLogin.value.removeEventListener('input', validate);
      isPasswordEventListener.value = false;
    }

    if (!emailLogin.value.reportValidity()) return false;

    if (passwordLogin.value.validity.valueMissing) {
      passwordLogin.value.setCustomValidity('Заполните это поле');
      passwordLogin.value.reportValidity();
      passwordLogin.value.addEventListener('input', validate);
      isPasswordEventListener.value = true;
      return false;
    }

    if (passwordLogin.value.validity.patternMismatch) {
      passwordLogin.value.setCustomValidity('Некорректный пароль');
      passwordLogin.value.reportValidity();
      passwordLogin.value.addEventListener('input', validate);
      isPasswordEventListener.value = true;
      return false;
    }
    return true;
  };

  const checkAuth = (user) => {
    if (user.error) {
      isLoading.value = false;
      if (user.error === 'Некорректный пароль') {
        passwordLogin.value.setCustomValidity('Некорректный пароль');
        passwordLogin.value.reportValidity();
        setTimeout(() => passwordLogin.value.setCustomValidity(''), 1500);
        return false;
      }
      if (user.error === 'Ошибка доступа к серверу') {
        emits('showError', user.error);
        return false;
      }
      emailLogin.value.setCustomValidity('Некорректный email');
      emailLogin.value.reportValidity();
      setTimeout(() => emailLogin.value.setCustomValidity(''), 1500);
      return false;
    }
    return true;
  };

  const login = async (email, password) => {
    if (!validate()) return;
    isLoading.value = true;
    const user = await fetchAuth('login', email, password);
    if (!checkAuth(user)) return;
    localStorage.setItem('user', JSON.stringify(user));
    storeAuthContext.login(user);
    isLoading.value = false;
    shtukaChannel.postMessage('login');
  };
</script>

<template>
  <h3 class="auth__title">Вход</h3>
  <form
    ref="formLogin"
    class="auth__form form-auth"
  >
    <label for="email">Email:</label>
    <input
      class="form-auth__input"
      id="email"
      type="email"
      ref="emailLogin"
      v-model="email"
      maxlength="40"
      required
    />
    <label for="password">Пароль:</label>
    <input
      class="form-auth__input"
      id="password"
      type="password"
      ref="passwordLogin"
      v-model="password"
      maxlength="80"
      pattern="(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}"
      required
    />
    <button
      class="form-auth__button"
      :class="{ disabled: isLoading }"
      :disabled="isLoading"
      @click.prevent="login(email, password)"
    >
      Войти
    </button>
  </form>
</template>

<style>
  .auth__title {
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
  }

  .form-auth__input {
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
  }

  .form-auth__input:focus {
    border: 1px solid rgb(84, 207, 201);
  }

  input:valid {
    border-color: rgb(37, 5, 219);
  }

  /*buttons в app.vue*/
</style>
