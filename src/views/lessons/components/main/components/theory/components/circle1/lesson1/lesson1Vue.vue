<script setup>
  import PhysicDefinition from './components/physicDefinition.vue';
  import PhenomenonVue from './components/phenomenonVue.vue';
  import NatureVue from './components/natureVue.vue';
  import HeadThemesOfPhysic from './components/headThemesOfPhysic.vue';
  import OtherThemesOfPhysic from './components/otherThemesOfPhysic.vue';
</script>

<template>
  <div class="lesson-theory__content theory-content">
    <PhysicDefinition />
    <div class="theory-content__blocks theory-content__phenomenon-and-nature">
      <PhenomenonVue />
      <NatureVue />
    </div>
    <div class="theory-content__blocks theory-content__themes-of-physic">
      <HeadThemesOfPhysic />
      <OtherThemesOfPhysic />
    </div>
  </div>
</template>

<style>
  /*lesson-theory__content в родителе*/

  .theory-content__blocks {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .theory-content__phenomenon-and-nature {
    justify-content: center;
  }
</style>
