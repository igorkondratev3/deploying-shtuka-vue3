<script setup>
  const headThemesOfPhysic = [
    'световые (оптика)',
    'звуковые (акустика)',
    'тепловые (термодинамика)',
    'электромагнитные (электродинамика)',
    'механические (механика)',
  ];
</script>

<template>
  <div class="theory-content__head-themes-of-physic head-themes-of-physic">
    <h3 class="head-themes-of-physic__title">
      <b>Физические явления и изучающие их разделы физики:</b>
    </h3>
    <ul class="head-themes-of-physic__content">
      <li
        v-for="theme in headThemesOfPhysic"
        :key="theme.id"
      >
        {{ theme }}
      </li>
    </ul>
  </div>
</template>

<style>
  .theory-content__head-themes-of-physic {
    margin-right: 15px;
    margin-top: 15px;
  }
  .head-themes-of-physic__title {
    text-align: left;
    padding: 0px 5px 0px 16px;
    color: black;
    font: oblique 18px Times New Roman;
  }

  .head-themes-of-physic__content {
    font: oblique 18px Times New Roman;
    text-align: left;
    list-style: Circle inside;
    padding-left: 16px;
    color: black;
  }
</style>
