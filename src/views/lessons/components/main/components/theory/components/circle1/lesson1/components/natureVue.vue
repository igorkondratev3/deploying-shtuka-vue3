<script setup>
  import { ref, onMounted } from 'vue';
  import {
    calculateCoordinatesForLine,
    drawLinesBetweenWords,
    setWidthAreaForLinesBetweenWords,
  } from './functions.js';

  const firstLetterMatter = ref(null);
  const lastLetterMatter = ref(null);
  const lastLetterSubstance = ref(null);
  const firstLetterField = ref(null);
  const areaForLinesBetweenWords = ref(null);

  onMounted(() => {
    setWidthAreaForLinesBetweenWords(
      areaForLinesBetweenWords,
      lastLetterSubstance,
      firstLetterField
    );
    let areaForLines = areaForLinesBetweenWords.value.getContext('2d');
    drawLinesBetweenWords(
      areaForLines,
      calculateCoordinatesForLine(
        areaForLinesBetweenWords,
        firstLetterMatter,
        lastLetterSubstance
      )
    );
    drawLinesBetweenWords(
      areaForLines,
      calculateCoordinatesForLine(
        areaForLinesBetweenWords,
        lastLetterMatter,
        firstLetterField
      )
    );
  });
</script>

<template>
  <div class="theory-content__nature nature">
    <p class="nature__p">
      <b>Природа</b> – всё что нас окружает (вселенная). Вселенная состоит из
      материи.
    </p>
    <p class="nature__p nature__matter">
      <span ref="firstLetterMatter"> М</span>атерия<span ref="lastLetterMatter">
      </span>
    </p>
    <div class="nature__area-for-lines-between-words">
      <canvas
        ref="areaForLinesBetweenWords"
        height="34"
      >
      </canvas>
    </div>
    <div class="nature__substance-and-field substance-and-field">
      <div class="substance-and-field__substance">
        вещество<span ref="lastLetterSubstance"></span> <br />(воспринимается с
        помощью<br />органов чувств)
      </div>
      <div class="substance-and-field__field">
        <span ref="firstLetterField">п</span>оле <br />(не воспринимается с
        помощью<br />органов чувств)
      </div>
    </div>

    <p class="nature__p">
      <br />
      Тело – область пространства, занятая веществом(стол, ручка...)
    </p>
  </div>
</template>

<style>
  .theory-content__nature {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 1px dotted black;
    border-radius: 30px;
    max-width: 500px;
    padding: 5px 0px;
    margin-top: 15px;
  }

  .nature__p {
    font: oblique 18px Times New Roman;
    text-align: left;
    color: black;
    padding: 0px 5px 0px 16px;
  }
  .nature__matter {
    align-self: center;
    font-weight: bold;
    padding: 0;
  }
  .nature__area-for-lines-between-words {
    align-self: center;
    line-height: 0; /*помогает убрать 4 лишних пикселя в родителе(место для спусков: буква j)*/
  }

  .substance-and-field {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-self: center;
    font: oblique 18px Times New Roman;
    text-align: center;
  }

  .substance-and-field__substance {
    margin-right: 30px;
  }
</style>
