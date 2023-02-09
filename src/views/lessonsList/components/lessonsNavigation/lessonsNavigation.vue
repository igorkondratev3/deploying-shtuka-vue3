<script setup>
  import AboutCircle from './components/aboutCircles.vue';
  import NavigationControl from './components/navigationControl.vue';

  defineEmits(['changeCircle', 'changeGrade']);

  const aboutCircles = {
    first: `1 круг 
Изучение тем школьной программы в общем виде`,
    second: `2 круг 
Углубленное изучение тем школьной программы`,
  };
</script>

<template>
  <div class="lessons-list__navigation navigation">
    <AboutCircle :aboutCircle="aboutCircles.first" />
    <NavigationControl
      class="navigation__control"
      @changeCircle="
        (chooseCircleNumber) => $emit('changeCircle', chooseCircleNumber)
      "
      @changeGrade="
        (chooseGradeNumber) => $emit('changeGrade', chooseGradeNumber)
      "
    />
    <AboutCircle :aboutCircle="aboutCircles.second" />
  </div>
</template>

<style>
  .lessons-list__navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 20px;
    margin-bottom: 40px;
  }

  @media (max-width: 1318px) {
    .navigation__control {
      order: 2;
      margin-top: 25px;
    }
  }

  @media (max-width: 1080px) {
    .lessons-list__navigation {
      flex-direction: column;
    }
  }
</style>
