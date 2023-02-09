<script setup>
  import { ref, watch } from 'vue';
  import {
    parameterOver,
    parameterOut,
    changeButtonParameterValue,
    letterParameterDefinition,
  } from './functions.js';

  const emits = defineEmits(['changeStyleForNotesContent']);
  const props = defineProps({
    parameter: String,
    flagClearStyleForNotesContent: Number,
    startValueForEditNote: String,
  });
  const parameterPressed = ref(false);
  const parameterTuningValues = ref({
    backgroundColor: '#C5C8CB',
    boxShadow: '2px 0px 1px #454B4E',
    fontWeight: '',
    fontStyle: '',
    textDecoration: '',
  });

  if (
    props.startValueForEditNote === 'bold' ||
    props.startValueForEditNote === 'oblique' ||
    props.startValueForEditNote === 'underline'
  ) {
    parameterPressed.value = true;
    parameterTuningValues.value.backgroundColor = '#8795A5';
    parameterTuningValues.value.boxShadow = 'none';
  }

  parameterTuningValues.value[props.parameter] = props.startValueForEditNote;

  watch(
    () => props.flagClearStyleForNotesContent,
    () => {
      parameterPressed.value = false;
      switch (props.parameter) {
        case 'fontWeight':
          parameterTuningValues.value.fontWeight = 'normal';
          break;
        case 'fontStyle':
          parameterTuningValues.value.fontStyle = 'normal';
          break;
        case 'textDecoration':
          parameterTuningValues.value.textDecoration = 'none';
          break;
      }
      parameterTuningValues.value.backgroundColor = '#C5C8CB';
    }
  );

  const changeStyleForNotesContent = () => {
    emits(
      'changeStyleForNotesContent',
      changeButtonParameterValue(
        props.parameter,
        parameterTuningValues,
        parameterPressed
      )
    );
  };
</script>

<template>
  <div
    class="create-note-editor__button"
    @pointerover="parameterOver(parameterTuningValues, parameterPressed)"
    @pointerout="parameterOut(parameterTuningValues, parameterPressed)"
    @click="changeStyleForNotesContent"
    :style="parameterTuningValues"
  >
    {{ letterParameterDefinition(props.parameter) }}
  </div>
</template>

<style>
  .create-note-editor__button {
    font-family: 'Times New Roman';
    text-align: center;
    line-height: 13px;
    cursor: default;
    user-select: none;
    border: 0.5px solid black;
    border-radius: 30px;
    width: 20px;
    margin-left: 3px;
  }
</style>
