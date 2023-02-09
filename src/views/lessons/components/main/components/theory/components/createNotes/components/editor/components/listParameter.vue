<script setup>
  import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
  import {
    drawArrowDown,
    changeListParameterValue,
    changeSeenOfListOfParameterValues,
    closeListOfPararmeterValues,
    translateParameter,
  } from './functions.js';

  const emits = defineEmits(['changeStyleForNotesContent']);
  const props = defineProps({
    parameterListValue: Array,
    flagClearStyleForNotesContent: Number,
    startValueForEditNote: String,
  });

  const parameterTuningValues = ref({
    listOfValuesSeen: false,
    choosenValueSeen: true,
    arrowOpenListOfValues: true,
    borderValue: '0.5px solid black',
    choosenValueText:
      translateParameter(props.startValueForEditNote) ||
      props.parameterListValue[0],
  });

  watch(
    () => props.flagClearStyleForNotesContent,
    () => {
      parameterTuningValues.value.choosenValueText =
        props.parameterListValue[0];
    }
  );

  const border = computed(() => {
    return {
      border: parameterTuningValues.value.borderValue,
    };
  });

  const arrowOpenList = ref(null);
  onMounted(() => {
    drawArrowDown(arrowOpenList.value.getContext('2d'));
  });

  const closeListParameter = () => {
    closeListOfPararmeterValues(parameterTuningValues.value)
  }

  document.addEventListener('click', closeListParameter);

  onUnmounted(() => {
    document.removeEventListener('click', closeListParameter);
  });
</script>

<template>
  <div
    class="create-note-editor__list list"
    :style="border"
    @click.stop="changeSeenOfListOfParameterValues(parameterTuningValues)"
  >
    <div class="list__choosen">
      <div
        class="list__choosen-value"
        v-show="parameterTuningValues.choosenValueSeen"
      >
        {{ parameterTuningValues.choosenValueText }}
      </div>
      <canvas
        class="list__open-list-of-values"
        ref="arrowOpenList"
        v-show="parameterTuningValues.arrowOpenListOfValues"
        width="14"
        height="14"
      >
      </canvas>
    </div>

    <div
      class="list__list-of-values list-of-values"
      @click.stop="
        emits(
          'changeStyleForNotesContent',
          changeListParameterValue(parameterTuningValues, $event)
        )
      "
      v-if="parameterTuningValues.listOfValuesSeen"
    >
      <div
        class="list-of-values__value"
        v-for="parameter in props.parameterListValue"
        :key="parameter.id"
      >
        {{ parameter }}
      </div>
    </div>
  </div>
</template>

<style>
  .create-note-editor__list {
    font: 14px 'Times New Roman';
    cursor: default;
    user-select: none;
    background-color: #c5c8cb;
    border-radius: 30px;
    z-index: 7;
    width: 75px;
    height: 18px;
    margin-left: 3px;
  }

  .create-note-editor__list:hover {
    background-color: #e0e0e6;
  }

  .list__choosen {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .list__choosen-value {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 1px 0px 0px 3px;
  }
  .list__open-list-of-values {
    padding-right: 3px;
  }
  .list__list-of-values {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;
    cursor: default;
    user-select: none;
    z-index: 7;
    background-color: white; /*в мозиле красится скролл*/
    border: 0.5px solid black;
    border-radius: 10px 0px 0px 10px;
    max-height: 75px;
  }

  .list-of-values__value {
    font: 14px 'Times New Roman';
    text-align: left;
    white-space: nowrap;
    cursor: default;
    user-select: none;
    z-index: 7;
    background-color: #c5c8cb;
    width: 100%; /*позволит при увеличении экрана оставлять цвет скрола корректным*/
    padding: 5px 0px 5px 3px;
    transition: background-color linear;
  }
  .list-of-values__value:hover {
    background-color: #e0e0e6;
  }
</style>
