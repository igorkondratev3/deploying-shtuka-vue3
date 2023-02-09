<script setup>
  import { ref } from 'vue';
  import { fetchAuth } from './fetch.js';
  import { authContext } from '@/stores/authContext.js';
  import { shtukaChannel } from '@/shtukaChannel.js';

  const emits = defineEmits(['showError'])

  const storeAuthContext = authContext();
  const email = ref('');
  const password = ref('');
  const repeatPassword = ref('');
  const isLoading = ref(false);
  const emailSignup = ref(null);
  const passwordSignup = ref(null);
  const repeatPasswordSignup = ref(null);

  const isPasswordEventListener = ref(false);
  const isRepeatPasswordEventListener = ref(false);
  const validate = () => {
    if (isPasswordEventListener.value) {
      passwordSignup.value.setCustomValidity('');
      passwordSignup.value.removeEventListener('input', validate);
      isPasswordEventListener.value = false;
    }

    if (isRepeatPasswordEventListener.value) {
      repeatPasswordSignup.value.setCustomValidity('');
      repeatPasswordSignup.value.removeEventListener('input', validate);
      isRepeatPasswordEventListener.value = false;
    }

    if (!emailSignup.value.reportValidity()) return false;

    if (passwordSignup.value.validity.valueMissing) {
      passwordSignup.value.setCustomValidity('Заполните это поле');
      passwordSignup.value.reportValidity();
      passwordSignup.value.addEventListener('input', validate);
      isPasswordEventListener.value = true;
      return false;
    }

    if (passwordSignup.value.validity.patternMismatch) {
      passwordSignup.value.setCustomValidity(
        'Пароль должен быть не менее 8 символов, содержащих латинские буквы в верхнем и нижнем регистре, цифры и спецсимволы'
      );
      passwordSignup.value.reportValidity();
      passwordSignup.value.addEventListener('input', validate);
      isPasswordEventListener.value = true;
      return false;
    }

    if (password.value !== repeatPassword.value) {
      repeatPasswordSignup.value.setCustomValidity(
        'Пароль и подтверждение не совпадают'
      );
      repeatPasswordSignup.value.reportValidity();
      repeatPasswordSignup.value.addEventListener('input', validate);
      isRepeatPasswordEventListener.value = true;
      return false;
    }
    return true;
  };

  const checkAuth = (user) => {
    if (user.error) {
      isLoading.value = false;
      if (user.error === 'Пароль недостаточно надежный') {
        passwordSignup.value.setCustomValidity(user.error);
        passwordSignup.value.reportValidity();
        setTimeout(() => passwordSignup.value.setCustomValidity(''), 1500);
        return false;
      }
      if (user.error === 'Ошибка доступа к серверу') {
        emits('showError', user.error);
        return false;
      }
      emailSignup.value.setCustomValidity(user.error);
      emailSignup.value.reportValidity();
      setTimeout(() => emailSignup.value.setCustomValidity(''), 1500);
      return false;
    }
    return true;
  };

  const signup = async (email, password) => {
    if (!validate()) return;
    isLoading.value = true;
    const user = await fetchAuth('signup', email, password);
    if (!checkAuth(user)) return;
    localStorage.setItem('user', JSON.stringify(user));
    storeAuthContext.login(user);
    isLoading.value = false;
    shtukaChannel.postMessage('login');
  };
</script>

<template>
  <h3 class="auth__title">Регистрация</h3>
  <form
    ref="formLogin"
    class="auth__form form-auth"
  >
    <label for="email">Email:</label>
    <input
      type="email"
      id="email"
      v-model="email"
      class="form-auth__input"
      ref="emailSignup"
      maxlength="40"
      required
    />
    <label for="password">Пароль:</label>
    <input
      type="password"
      v-model="password"
      class="form-auth__input"
      id="password"
      ref="passwordSignup"
      maxlength="80"
      pattern="(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}"
      required
    />
    <label for="repeat-password">Подтвердите пароль:</label>
    <input
      type="password"
      v-model="repeatPassword"
      class="form-auth__input"
      id="repeat-password"
      ref="repeatPasswordSignup"
      maxlength="80"
      required
    />
    <button
      @click.prevent="signup(email, password, repeatPassword)"
      :disabled="isLoading"
      class="form-auth__button"
      :class="{ disabled: isLoading }"
    >
      Зарегистрироваться
    </button>
  </form>
</template>

<style>
  /*стили заданы в login*/
  /*buttons в app.vue*/
</style>
