<script setup>
  defineEmits(['openEditNoteForm']);
</script>

<template>
  <button
    class="note-editor__button editor-button"
    title="изменить"
    @click="$emit('openEditNoteForm')"
  >
    <img
      class="icon_middle-size icon_edit-color"
      src="/src/assets/edit.svg"
    />
  </button>
</template>

<style>
  /*editor-button, icon в app.vue*/
</style>
