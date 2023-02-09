<script setup>
  import { ref } from 'vue';
  import CreateNoteEditor from './components/editor/editorVue.vue';
  import CreateNoteContent from './components/content/contentVue.vue';

  const props = defineProps({
    noteForEdit: Object,
    editFormSeen: Boolean,
    notesSeen: Boolean,
  });

  defineEmits(['closeEditNoteForm']);

  const styleForNotesContent = ref({
    color: '',
    fontSize: '16px',
    fontFamily: 'Times New Roman',
    fontWeight: '',
    fontStyle: '',
    textDecoration: '',
  });

  if (props.noteForEdit) {
    for (const key in props.noteForEdit.textStyle) {
      styleForNotesContent.value[key] = props.noteForEdit.textStyle[key];
    }
  }

  const changeStyleForNotesContent = (changedParameter) => {
    for (let key in changedParameter) {
      styleForNotesContent.value[key] = changedParameter[key];
    }
  };

  const flagClearStyleForNotesContent = ref(1);

  const clearStyleForNotesContent = () => {
    styleForNotesContent.value.color = '';
    styleForNotesContent.value.fontSize = '16px';
    styleForNotesContent.value.fontFamily = 'Times New Roman';
    styleForNotesContent.value.fontWeight = '';
    styleForNotesContent.value.fontStyle = '';
    styleForNotesContent.value.textDecoration = '';
    flagClearStyleForNotesContent.value++;
  };
</script>

<template>
  <div class="lesson-theory__create-note create-note">
    <CreateNoteEditor
      @changeStyleForNotesContent="changeStyleForNotesContent"
      :flagClearStyleForNotesContent="flagClearStyleForNotesContent"
      :currentValuesForEditNote="props.noteForEdit?.textStyle"
    />
    <CreateNoteContent
      :styleForNotesContent="styleForNotesContent"
      :textForEditNote="props.noteForEdit?.text"
      :editNoteID="props.noteForEdit?._id"
      :editFormSeen="editFormSeen"
      :notesSeen="notesSeen"
      @closeEditNoteForm="$emit('closeEditNoteForm')"
      @clearStyleForNotesContent="clearStyleForNotesContent"
    />
  </div>
</template>

<style>
  .create-note {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-height: 300px;
  }

  .lesson-theory__create-note {
    margin: 10px auto;
  }
</style>
