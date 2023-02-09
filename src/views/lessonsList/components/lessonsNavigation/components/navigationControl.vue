<script setup>
  import { ref } from 'vue';

  const emits = defineEmits(['changeCircle', 'changeGrade']);
  const isCircleOne = ref(true);
  const isGrade = ref({
    isGrade7: true,
    isGrade8: false,
    isGrade9: false,
    isGrade10: false,
    isGrade11: false,
  });

  const changeCircle = () => {
    isCircleOne.value = !isCircleOne.value;
    if (isCircleOne.value) {
      isGrade.value.isGrade7 = true;
      isGrade.value.isGrade8 = false;
      isGrade.value.isGrade9 = false;
      emits('changeCircle', 1);
    } else {
      isGrade.value.isGrade9 = true;
      isGrade.value.isGrade10 = false;
      isGrade.value.isGrade11 = false;
      emits('changeCircle', 2);
    }
  };

  const changeGrade = (chooseGradeNumber) => {
    isGrade.value.isGrade7 = false;
    isGrade.value.isGrade8 = false;
    isGrade.value.isGrade9 = false;
    isGrade.value.isGrade10 = false;
    isGrade.value.isGrade11 = false;
    isGrade.value['isGrade' + chooseGradeNumber] = true;
    emits('changeGrade', chooseGradeNumber);
  };
</script>

<template>
  <div class="navigation__control navigation-control">
    <div class="navigation-control__circles circles">
      <div
        class="circles__circle"
        :class="{ circles__choosen: isCircleOne }"
        @click="changeCircle"
      >
        1 круг
      </div>
      <div
        class="circles__circle"
        :class="{ circles__choosen: !isCircleOne }"
        @click="changeCircle"
      >
        2 круг
      </div>
    </div>

    <div class="navigation-control__grades grades">
      <div
        class="grades__grade"
        :class="{ grades__choosen: isGrade.isGrade7 }"
        v-show="isCircleOne"
        @click="changeGrade(7)"
      >
        7 класс
      </div>
      <div
        class="grades__grade"
        :class="{ grades__choosen: isGrade.isGrade8 }"
        v-show="isCircleOne"
        @click="changeGrade(8)"
      >
        8 класс
      </div>
      <div
        class="grades__grade"
        :class="{ grades__choosen: isGrade.isGrade9 }"
        @click="changeGrade(9)"
      >
        9 класс
      </div>
      <div
        class="grades__grade"
        :class="{ grades__choosen: isGrade.isGrade10 }"
        v-show="!isCircleOne"
        @click="changeGrade(10)"
      >
        10 класс
      </div>
      <div
        class="grades__grade"
        :class="{ grades__choosen: isGrade.isGrade11 }"
        v-show="!isCircleOne"
        @click="changeGrade(11)"
      >
        11 класс
      </div>
    </div>
  </div>
</template>

<style>
  .navigation__control {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px 10px 0px;
    font: 18px 'Times New Roman';
  }

  .navigation-control__circles {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 0.5px solid black;
    border-radius: 30px;
    margin: 0px auto;
  }

  .navigation-control__grades {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-self: center;
    border: 0.5px solid black;
    border-radius: 30px;
    margin-top: 20px;
  }

  .circles__circle,
  .grades__grade {
    cursor: default;
    user-select: none;
    border-radius: 30px;
    padding: 5px;
  }

  .circles__choosen,
  .grades__choosen {
    background-color: black;
    color: white;
  }
</style>
