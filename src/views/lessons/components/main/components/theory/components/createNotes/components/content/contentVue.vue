<script setup>
  import { computed, ref, onMounted, watch, nextTick } from 'vue';
  import ButtonForCreateNote from './components/buttonForCreateNote.vue';
  import ErrorVue from '@/views/generalComponents/error/errorVue.vue';
  import ButtonForEditNote from './components/buttonForEditNote.vue';

  const emits = defineEmits(['clearStyleForNotesContent', 'closeEditNoteForm']);
  const props = defineProps({
    styleForNotesContent: Object,
    textForEditNote: String,
    editNoteID: String,
    editFormSeen: Boolean,
    notesSeen: Boolean,
  });
  const styleForNotesContent = computed(() => {
    return {
      fontSize: props.styleForNotesContent.fontSize,
      color: props.styleForNotesContent.color,
      fontFamily: props.styleForNotesContent.fontFamily,
      fontWeight: props.styleForNotesContent.fontWeight,
      fontStyle: props.styleForNotesContent.fontStyle,
      textDecoration: props.styleForNotesContent.textDecoration,
    };
  });

  const widthAndHeightForNote = ref({
    width: '',
    height: '',
  });
  const textNotes = ref('');
  const notesContent = ref(null);
  const error = ref('');

  watch(
    () => props.notesSeen,
    () => {
      if (props.notesSeen) nextTick(() => notesContent.value.focus());
    }
  );

  if (props.textForEditNote) textNotes.value = props.textForEditNote;

  onMounted(() => {
    if (props.editNoteID) {
      notesContent.value.style.height = props.styleForNotesContent.height;
      notesContent.value.style.width = props.styleForNotesContent.width;
    } // если с помощью :style и computed, то почему-то при начале ввода возвращает блок к начальной ширине
    notesContent.value.focus();
  });

  const calucalateWidthAndHeightForNote = () => {
    widthAndHeightForNote.value.width = notesContent.value.offsetWidth;
    widthAndHeightForNote.value.height = notesContent.value.offsetHeight;
  };

  const clearTextAndStyleForNotesContent = () => {
    textNotes.value = '';
    emits('clearStyleForNotesContent');
  };
</script>

<template>
  <textarea
    v-model="textNotes"
    class="create-note__content"
    :style="styleForNotesContent"
    ref="notesContent"
  ></textarea>
  <ButtonForCreateNote
    v-if="!editFormSeen"
    :textNotes="textNotes"
    :styleForNotesContent="styleForNotesContent"
    :widthAndHeightForNote="widthAndHeightForNote"
    @calucalateWidthAndHeightForNote="calucalateWidthAndHeightForNote"
    @clearTextAndStyleForNotesContent="clearTextAndStyleForNotesContent"
    @showError="(errorValue) => (error = errorValue)"
  />
  <ButtonForEditNote
    v-if="editFormSeen"
    :textNotes="textNotes"
    :styleForNotesContent="styleForNotesContent"
    :widthAndHeightForNote="widthAndHeightForNote"
    :editNoteID="props.editNoteID"
    @calucalateWidthAndHeightForNote="calucalateWidthAndHeightForNote"
    @closeEditNoteForm="emits('closeEditNoteForm')"
    @showError="(errorValue) => (error = errorValue)"
  />
  <ErrorVue
    class="create-note__error"
    v-if="error"
    :error="error"
    @closeError="error = ''"
  />
</template>

<style>
  .create-note__content {
    font: 16px 'Times New Roman';
    text-align: left;
    overflow-wrap: break-word;
    overflow-y: auto;
    outline: none; /*чтобы не появлялся коонтур при введении*/
    background-color: rgba(231, 229, 229, 0.548);
    border: 0.5px solid black;
    border-radius: 30px;
    padding: 5px 10px 5px 16px;
    max-height: 400px;
    max-width: 600px;
  }

  @media (max-width: 650px) {
    .create-note__content {
      max-width: 400px;
    }
  }

  .create-note__button {
    font: 14px 'Times New Roman';
    border-radius: 20px;
    max-width: 150px;
    margin-left: 25px;
    margin-top: 1px;
  }

  .create-note__error {
    max-width: 350px;
    margin-top: 20px;
  }
</style>
