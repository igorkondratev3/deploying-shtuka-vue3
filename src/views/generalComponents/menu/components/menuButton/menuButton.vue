<script setup>
  import { ref, onMounted, watch } from 'vue';
  import { changeColor } from '@/views/generalFunctions/changeColor.js';
  import { drawLines, drawCross } from './functions.js';

  const emits = defineEmits(['changeMenuContentSeen']);
  const props = defineProps({ menuContentSeen: Boolean });
  const menuButton = ref(null);
  const areaForLinesAndCross = ref(null);
  let contextAreaForLinesAndCross;

  onMounted(() => {
    contextAreaForLinesAndCross = areaForLinesAndCross.value.getContext('2d');
    drawLines(
      contextAreaForLinesAndCross,
      areaForLinesAndCross.value.width,
      areaForLinesAndCross.value.height
    );
    changeColor(menuButton.value);
  });

  watch(
    () => props.menuContentSeen,
    () => {
      if (props.menuContentSeen) {
        drawCross(
          contextAreaForLinesAndCross,
          areaForLinesAndCross.value.width,
          areaForLinesAndCross.value.height
        );
      } else {
        drawLines(
          contextAreaForLinesAndCross,
          areaForLinesAndCross.value.width,
          areaForLinesAndCross.value.height
        );
      }
    }
  );
</script>

<template>
  <button
    ref="menuButton"
    class="menu-button round-button menu-button_position"
    @click.stop="emits('changeMenuContentSeen')"
  >
    <canvas
      ref="areaForLinesAndCross"
      width="32"
      height="32"
    >
    </canvas>
  </button>
</template>

<style>
  /*round-button в app.vue*/
  .menu-button {
    background-color: transparent;
  }

  .menu-button_position {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
