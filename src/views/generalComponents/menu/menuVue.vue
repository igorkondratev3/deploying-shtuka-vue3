<script setup>
  import { ref, onUnmounted } from 'vue';
  import MenuButton from './components/menuButton/menuButton.vue';
  import MenuContent from './components/menuContent/menuContent.vue';
  const menuContentSeen = ref(false);

  const closeMenu = () => {
    menuContentSeen.value = false;
  };

  const changeMenuContentSeen = () => {
    if (!menuContentSeen.value) {
      const clickEvent = new Event('click');
      document.dispatchEvent(clickEvent);
    }
    menuContentSeen.value = !menuContentSeen.value;
  }

  document.addEventListener('click', closeMenu);

  onUnmounted(() => {
    document.removeEventListener('click', closeMenu);
  })
</script>

<template>
  <MenuButton
    @changeMenuContentSeen="changeMenuContentSeen"
    :menuContentSeen="menuContentSeen"
  />
  <MenuContent
    v-show="menuContentSeen"
    @closeMenu="menuContentSeen = false"
  />
</template>

<style></style>
