<script setup>
  import { ref, watch } from 'vue';

  defineEmits(['changeStyleForNotesContent']);
  const props = defineProps({
    flagClearStyleForNotesContent: Number,
    startValueForEditNote: String,
  });

  const color = ref(props.startValueForEditNote || '#000000');

  watch(
    () => props.flagClearStyleForNotesContent,
    () => {
      color.value = '#000000';
    }
  );
</script>

<template>
  <input
    class="create-note-editor__color"
    type="color"
    v-model="color"
    ref="colorElement"
    @input="$emit('changeStyleForNotesContent', { color })"
  />
</template>

<style>
  .create-note-editor__color {
    width: 50px;
    height: 18px;
  }
</style>
