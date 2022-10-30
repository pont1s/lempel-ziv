<template>
  <div class="main-layout">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100);

  @media (min-width: 927px) {
    height: 100%;
  }
}
</style>
