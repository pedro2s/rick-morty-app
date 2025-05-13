<template>
  <div class="loading-container">
    <div class="loading-content">
      <q-spinner-dots :color="color" :size="size" />
      <div class="loading-text q-mt-md" :class="`text-${color}`">{{ message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string
    color?: string
    size?: string
  }>(),
  {
    message: 'Carregando...',
    color: 'primary',
    size: '40px',
  },
)
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 200px;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-text {
  font-size: 1rem;
}
</style>
