<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { drawCross } from '@/views/generalComponents/menu/components/menuButton/functions.js';

  const router = useRouter();

  const cross = ref(null);
  onMounted(() => {
    drawCross(
      cross.value.getContext('2d'),
      cross.value.width,
      cross.value.height
    );
  });

  const goToBack = () => {
    if (window.history.state.back) {
      window.history.back();
    } else {
      router.push({ path: '/' });
    }
  };
</script>

<template>
  <button
    @click="goToBack"
    class="lessons-list__close-button"
  >
    <canvas
      ref="cross"
      width="32"
      height="32"
    >
    </canvas>
  </button>
</template>

<style>
  .lessons-list__close-button {
    position: absolute;
    right: 10px;
    top: 5px;
    cursor: default;
    z-index: 2;
    border: none;
    border-radius: 10px;
    background-color: transparent;
    padding: 5px 5px 0px;
  }
  .lessons-list__close-button:hover {
    background-color: rgba(187, 204, 203, 0.623);
  }
</style>
