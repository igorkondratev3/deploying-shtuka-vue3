<script setup>
  import ListParameter from './components/listParameter.vue';
  import ButtonParameter from './components/buttonParameter.vue';
  import ColorEditor from './components/colorEditor.vue';

  const emits = defineEmits(['changeStyleForNotesContent']);
  const props = defineProps({
    flagClearStyleForNotesContent: Number,
    currentValuesForEditNote: Object,
  });

  const sizesList = [
    '-размер-',
    '8pt',
    '10pt',
    '12pt',
    '14pt',
    '16pt',
    '18pt',
    '20pt',
    '22pt',
    '24pt',
  ];
  const familiesList = [
    '-шрифт-',
    'Times New Roman',
    'Arial',
    'Calibri',
    'Cambria',
  ];

  function changeStyleForNotesContent(changedParameter) {
    emits('changeStyleForNotesContent', changedParameter);
  }
</script>

<template>
  <div class="create-note__editor create-note-editor">
    <ColorEditor
      @changeStyleForNotesContent="changeStyleForNotesContent"
      :flagClearStyleForNotesContent="props.flagClearStyleForNotesContent"
      :startValueForEditNote="props.currentValuesForEditNote?.color"
    />
    <ListParameter
      @changeStyleForNotesContent="changeStyleForNotesContent"
      :parameterListValue="sizesList"
      :flagClearStyleForNotesContent="props.flagClearStyleForNotesContent"
      :startValueForEditNote="props.currentValuesForEditNote?.fontSize"
    />
    <ListParameter
      @changeStyleForNotesContent="changeStyleForNotesContent"
      :parameterListValue="familiesList"
      class="create-note-editor__family-list-parameter_width"
      :flagClearStyleForNotesContent="props.flagClearStyleForNotesContent"
      :startValueForEditNote="props.currentValuesForEditNote?.fontFamily"
    />
    <ButtonParameter
      @changeStyleForNotesContent="changeStyleForNotesContent"
      parameter="fontWeight"
      :flagClearStyleForNotesContent="props.flagClearStyleForNotesContent"
      :startValueForEditNote="props.currentValuesForEditNote?.fontWeight"
    />
    <ButtonParameter
      @changeStyleForNotesContent="changeStyleForNotesContent"
      parameter="fontStyle"
      :flagClearStyleForNotesContent="props.flagClearStyleForNotesContent"
      :startValueForEditNote="props.currentValuesForEditNote?.fontStyle"
    />
    <ButtonParameter
      @changeStyleForNotesContent="changeStyleForNotesContent"
      parameter="textDecoration"
      :flagClearStyleForNotesContent="props.flagClearStyleForNotesContent"
      :startValueForEditNote="props.currentValuesForEditNote?.textDecoration"
    />
  </div>
</template>

<style>
  .create-note-editor {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .create-note__editor {
    padding-left: 25px;
    padding-right: 2px;
    margin-bottom: 1px;
  }

  .create-note-editor__family-list-parameter_width {
    width: 135px;
  }

  @media (max-width: 465px) {
    .create-note-editor__family-list-parameter_width {
      width: 75px;
    }
  }
</style>
