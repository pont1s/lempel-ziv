<script lang="ts" setup>
import {
  NScrollbar,
} from 'naive-ui';

</script>

<template>
  <n-scrollbar>
    <div class="control-panel">
      <slot />
    </div>
  </n-scrollbar>
</template>

<style lang="scss" scoped>
.control-panel {
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .bitmap-manipulation-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .manipulation {
      padding: 0.5rem 0;
    }
  }
}
</style>
