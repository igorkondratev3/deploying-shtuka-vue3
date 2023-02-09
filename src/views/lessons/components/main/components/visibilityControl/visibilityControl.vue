<script setup>
  import { ref } from 'vue';
  const props = defineProps({
    visibilityControl: Object,
    seenButtonsVisibilityControl: Object,
  });
  const emits = defineEmits(['changeVisibility']);

  const seenVisibilityControl = ref(true);
  const visibilityControlButtons = {
    titel: 'Заголовок',
    theory: 'Теория',
    example: 'Пример',
    additionals: 'Доп. материалы',
    notes: 'Пометки',
  };
</script>

<template>
  <div class="lesson-main__visibility-control visibility-control">
    <button
      class="visibility-control__seen"
      @click="seenVisibilityControl = !seenVisibilityControl"
      :title="
        seenVisibilityControl ? 'скрыть' : 'раскрыть панель видимости элементов'
      "
    >
      ...
  </button>
    <div
      class="visibility-control__buttons"
      v-show="seenVisibilityControl"
    >
      <button
        class="visibility-control__button"
        v-for="(button, keyButton) in visibilityControlButtons"
        :key="button.id"
        :class="{ button__pressed: props.visibilityControl[keyButton] }"
        @click="emits('changeVisibility', keyButton)"
        v-show="props.seenButtonsVisibilityControl[keyButton]"
      >
        {{ button }}
      </button>
    </div>
  </div>
</template>

<style>
  .visibility-control {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 998;
    overflow-x: auto;
  }

  .lesson-main__visibility-control {
    position: fixed;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
  }

  .visibility-control__seen {
    font-size: 20px;
    cursor: default;
    user-select: none;
    background-color: transparent;
    border: none;
  }

  .visibility-control__seen:hover {
    color: rgb(27, 114, 107);
    font-size: 40px;
  }

  .visibility-control__buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow-x: auto;
  }

  .visibility-control__button {
    font: 16px 'Times New Roman';
    user-select: none;
    background-color: rgba(218, 210, 210, 0.795);
    border: 1px solid black;
    border-radius: 30px;
    padding: 5px;
    margin: 0px 5px;
    white-space: nowrap;
    overflow: visible;
  }

  .visibility-control__button:hover {
    background-color: rgba(34, 125, 139, 0.685);
  }

  .button__pressed {
    background-color: rgba(78, 76, 76, 0.685);
    color: white;
  }

  @media (max-width: 444px) {
    .visibility-control {
      width: 100%; /*три строчки для появления скролла*/
    }

    .lesson-main__visibility-control {
      left: 0;
      transform: none;
    }

    .visibility-control__buttons {
      padding-left: 75px; /*так как при появлении скролла первый блок обрезается*/
    }
  }
</style>
