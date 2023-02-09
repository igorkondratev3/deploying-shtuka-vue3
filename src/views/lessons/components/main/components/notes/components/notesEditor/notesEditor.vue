<script setup>
  import CopyNoteButton from './components/copyNoteButton.vue';
  import DeleteNoteButton from './components/deleteNoteButton.vue';
  import EditNoteButton from './components/editNoteButton.vue';

  const props = defineProps({
    noteID: String,
  });
  defineEmits(['openEditNoteForm']);
</script>

<template>
  <div class="note__editor note-editor">
    <DeleteNoteButton :noteID="props.noteID" />
    <EditNoteButton @openEditNoteForm="$emit('openEditNoteForm')" />
    <CopyNoteButton :noteID="props.noteID" />
  </div>
</template>

<style>
  .note-editor {
    display: flex;
    flex-direction: row-reverse;
    align-self: center;
  }
</style>
