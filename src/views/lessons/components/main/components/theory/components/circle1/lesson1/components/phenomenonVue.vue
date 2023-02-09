<script setup>
  import { ref, onMounted } from 'vue';
  import {
    calculateCoordinatesForLine,
    drawLinesBetweenWords,
    setWidthAreaForLinesBetweenWords,
  } from './functions.js';

  const firstLetterPhenomenon = ref(null);
  const lastLetterPhenomenon = ref(null);
  const lastLetterNature = ref(null);
  const firstLetterPhysics = ref(null);
  const areaForLinesBetweenWords = ref(null);

  onMounted(() => {
    setWidthAreaForLinesBetweenWords(
      areaForLinesBetweenWords,
      lastLetterNature,
      firstLetterPhysics
    );
    let areaForLines = areaForLinesBetweenWords.value.getContext('2d');
    drawLinesBetweenWords(
      areaForLines,
      calculateCoordinatesForLine(
        areaForLinesBetweenWords,
        firstLetterPhenomenon,
        lastLetterNature
      )
    );
    drawLinesBetweenWords(
      areaForLines,
      calculateCoordinatesForLine(
        areaForLinesBetweenWords,
        lastLetterPhenomenon,
        firstLetterPhysics
      )
    );
  });
</script>

<template>
  <div class="theory-content__phenomenon phenomenon">
    <p class="phenomenon__p">
      <b>Явления</b> – изменения в окружающем нас мире.<br />
    </p>

    <p class="phenomenon__p phenomenon__word">
      <span ref="firstLetterPhenomenon"
        ><br />
        Я</span
      >вление<span ref="lastLetterPhenomenon"> </span>
    </p>
    <div class="phenomenon__area-for-lines-between-words">
      <canvas
        ref="areaForLinesBetweenWords"
        height="34"
      >
      </canvas>
    </div>
    <div class="phenomenon__nature-and-physics nature-and-physics">
      <div class="nature-and-physics__nature">
        неживой природы<span ref="lastLetterNature"></span> <br />(молния,
        снегопад...)
      </div>
      <div class="nature-and-physics__physics">
        <span ref="firstLetterPhysics">ф</span>изическое <br />(световое,
        звуковое...)
      </div>
    </div>

    <p class="phenomenon__p">
      <br /><br />
      Явления природы раскладываются на физические явления (см. пример).
    </p>
  </div>
</template>

<style>
  .theory-content__phenomenon {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 1px dotted black;
    border-radius: 30px;
    max-width: 500px;
    padding: 5px 0px;
    margin-right: 10px;
    margin-top: 15px;
  }

  .phenomenon__p {
    font: oblique 18px 'Times New Roman';
    text-align: left;
    color: black;
    padding: 0px 5px 0px 16px;
  }
  .phenomenon__word {
    align-self: center;
    font-weight: bold;
    padding: 0;
  }
  .phenomenon__area-for-lines-between-words {
    align-self: center;
    line-height: 0; /*помогает убрать 4 лишних пикселя в родителе(место для спусков: буква j)*/
  }

  .nature-and-physics {
    align-self: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font: oblique 18px Times New Roman;
    text-align: center;
  }
  .nature-and-physics__nature {
    margin-right: 130px;
  }
</style>
