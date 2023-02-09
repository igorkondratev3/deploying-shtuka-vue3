<script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { authContext } from '@/stores/authContext.js';

  const router = useRouter();
  const storeAuthContext = authContext();

  const userName = computed(() => {
    return storeAuthContext.user?.email;
  });

  const sections = ref([
    'Главная',
    'Список уроков',
    'Библиотека',
    'Формулы',
    'Справочники',
    'Контакты',
  ]);

  const chooseSection = (section) => {
    switch (section) {
      case 'Главная':
        router.push({ path: '/' });
        break;
      case 'Список уроков':
        router.push({ path: '/lessonsList' });
        break;
    }
  };
</script>

<template>
  <transition name="changeSeenMenu">
    <div
      class="menu menu_position"
      @click.stop
    >
      <div class="menu__sections menu__user-name">
        {{ userName }}
      </div>
      <button
        class="menu__sections"
        v-for="section in sections"
        :key="section.id"
        @click="chooseSection(section)"
      >
        {{ section }}
    </button>
    </div>
  </transition>
</template>

<style>
  .menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: transparent;
  }

  .menu_position {
    position: absolute;
    top: -5px;
    right: -5px;
    z-index: 8;
  }

  .menu__sections {
    font: 18px 'Times New Roman';
    text-align: center;
    box-sizing: content-box;
    cursor: default;
    color: white;
    background-color: rgb(89, 90, 97);
    border: 0.5px solid black;
    border-radius: 10px;
    padding: 10px;
    margin-top: 5px;
    animation: anim 1s linear forwards;
    transition: background-color 1s linear;
  }

  .menu__sections:hover {
    background-color: white;
    color: black;
  }

  .menu__user-name {
    text-align: left;
    overflow-x: hidden;
    color: black;
    background-color: transparent;
    border: 0;
    min-height: 15px;
    max-width: 80px;
    padding-left: 3px;
  }

  .changeSeenMenu-leave-to {
    opacity: 0;
  }
  .changeSeenMenu-leave-active {
    transition: opacity 1s;
  }
  .changeSeenMenu-leave-from {
    opacity: 100;
  }

  @keyframes anim {
    from {
      margin-top: -40px;
    }
    to {
      margin-top: 5px;
    }
  }
</style>
