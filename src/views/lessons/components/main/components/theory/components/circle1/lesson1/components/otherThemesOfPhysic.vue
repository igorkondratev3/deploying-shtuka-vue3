<script setup>
  const OtherThemesOfPhysic = [
    'атомная физика',
    'ядерная физика',
    'физика элементарных частиц',
  ];
</script>

<template>
  <div class="theory-content__other-themes-of-physic other-themes-of-physic">
    <p class="other-themes-of-physic__title"><b>Еще три раздела физики:</b></p>
    <ul class="other-themes-of-physic__content">
      <li
        v-for="theme in OtherThemesOfPhysic"
        :key="theme.id"
      >
        {{ theme }}
      </li>
    </ul>
  </div>
</template>

<style>
  .other-themes-of-physic__title {
    text-align: left;
    padding: 0px 5px 0px 16px;
    color: black;
    font: oblique 18px Times New Roman;
    margin-top: 15px;
  }

  .other-themes-of-physic__content {
    font: oblique 18px Times New Roman;
    text-align: left;
    list-style: Circle inside;
    padding-left: 16px;
    color: black;
  }
</style>
