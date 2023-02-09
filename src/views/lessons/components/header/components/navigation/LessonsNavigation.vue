<script setup>
  import { ref } from 'vue';
  import LessonsListButton from './components/lessonsListButton.vue';
  import LessonsButton from './components/lessonsButton.vue';

  const seenNavigation = ref(true);
</script>

<template>
  <div class="lesson-layout__navigation navigation">
    <nav
      class="navigation__options"
      v-show="seenNavigation"
    >
      <LessonsButton where="previous" />
      <LessonsListButton />
      <LessonsButton where="next" />
    </nav>
    <button
      class="navigation__seen"
      :title="seenNavigation ? 'скрыть' : 'раскрыть область навигации'"
      @click="seenNavigation = !seenNavigation"
    >
      ...
  </button>
  </div>
</template>

<style>
  .lesson-layout__navigation {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 100;
    left: 50%;
    transform: translateX(-50%);
    top: 5px;
  }

  .navigation__options {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .navigation__seen {
    font-size: 20px;
    line-height: 0;
    cursor: default;
    user-select: none;
    border: none;
  }

  .navigation__seen:hover {
    font-size: 30px;
    color: #0f7b9c;
  }
</style>
