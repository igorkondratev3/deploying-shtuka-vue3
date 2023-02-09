<script setup>
  import { ref, provide } from 'vue';
  import CreateNotes from '../theory/components/createNotes/CreateNotes.vue';
  import NotesEditor from './components/notesEditor/notesEditor.vue';
  import ErrorVue from '@/views/generalComponents/error/errorVue.vue';
  import { showErrorSymbol } from './symbols';

  const props = defineProps({
    note: Object,
  });
  provide(showErrorSymbol, showError);

  const editFormSeen = ref(false);
  const error = ref('');

  function showError(errorValue) {
    error.value = errorValue;
  }
</script>

<template>
  <div class="lessons-main__note note">
    <CreateNotes
      :noteForEdit="props.note"
      v-if="editFormSeen"
      :editFormSeen="editFormSeen"
      @closeEditNoteForm="editFormSeen = false"
    />
    <NotesEditor
      v-show="!editFormSeen"
      :noteID="props.note._id"
      @openEditNoteForm="editFormSeen = true"
    />
    <div
      class="note__content"
      v-show="!editFormSeen"
      :style="props.note.textStyle"
    >
      {{ note.text }}
    </div>
    <ErrorVue
      v-if="error"
      :error="error"
      @closeError="error = ''"
    />
  </div>
</template>

<style>
  .lesson-main__note {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .note__content {
    overflow-wrap: break-word;
    white-space: pre-line;
    overflow-y: auto;
    background-color: rgba(231, 229, 229, 0.548);
    border-radius: 10px;
    margin: 5px;
    margin-top: 0;
    padding: 5px 25px 5px 5px;
    max-width: 600px;
    max-height: 400px;
  }
</style>
