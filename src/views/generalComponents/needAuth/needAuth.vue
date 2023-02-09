<script setup>
  import { RouterLink } from 'vue-router';
  import { checkClose } from '@/views/generalFunctions/checkClose.js';

  const prop = defineProps({ allowedAction: String });
  defineEmits(['closeNeedAuth']);
</script>

<template>
  <div
    class="need-auth need-auth_position"
    @click="checkClose($event) ? $emit('closeNeedAuth') : undefined"
  >
    <div class="need-auth__content">
      <button
        class="need-auth__close-button"
        @click="$emit('closeNeedAuth')"
      >
        <img
          class="icon icon_delete-color icon_large-size"
          src="/src/assets/close.svg"
        />
      </button>
      Вам необходимо
      <router-link
        to="/auth?start=login"
        class="need-auth__link"
      >
        войти</router-link
      >
      или
      <router-link
        class="need-auth__link"
        to="/auth?start=signup"
      >
        зарегистрироваться</router-link
      >
      чтобы иметь возможность {{ prop.allowedAction }}
    </div>
  </div>
</template>

<style>
  .need-auth {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.664);
    backdrop-filter: blur(10px);
  }

  .need-auth_position {
    position: fixed;
    left: 0;
    top: 0;
  }

  .need-auth__content {
    font: 22px 'Times New Roman';
    color: rgb(6, 37, 63);
    text-align: justify;
    z-index: 999;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 10px;
    width: 400px;
    height: 150px;
    background-color: rgb(240, 238, 238);
    padding: 30px 20px 20px 20px;
    cursor: default;
  }
  .need-auth__close-button {
    position: absolute;
    right: 0;
    top: 0;
    cursor: default;
    border: none;
    border-radius: 10px;
    padding-top: 3px;
  }
  .need-auth__close-button:focus {
    outline: none;
  }
  .need-auth__link {
    color: rgb(6, 37, 63);
  }
  .need-auth__link:hover {
    color: red;
  }
  .need-auth__link:focus {
    outline: none;
    color: red;
  }
</style>
