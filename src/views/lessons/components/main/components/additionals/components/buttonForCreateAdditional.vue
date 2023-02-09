<script setup>
  import { ref, onMounted } from 'vue';
  import { drawPlus } from '@/views/generalFunctions/drawing.js';
  import { changeColor } from '@/views/generalFunctions/changeColor.js';

  const plus = ref(null);
  const buttonShowCreateAdditionalsForm = ref(null);

  onMounted(() => {
    drawPlus(plus.value.getContext('2d'));
    changeColor(buttonShowCreateAdditionalsForm.value);
  });
</script>

<template>
  <div
    class="additionals__button round-button"
    ref="buttonShowCreateAdditionalsForm"
  >
    <canvas
      ref="plus"
      width="32"
      height="32"
    >
    </canvas>
  </div>
</template>

<style>
  .additionals__button {
    border: 0;
    z-index: 0;
    padding-top: 1px;
    margin-top: 10px;
    align-self: center;
    z-index: 10;
  }
</style>
