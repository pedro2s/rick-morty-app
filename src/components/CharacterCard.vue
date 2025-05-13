<template>
  <q-card class="character-card cursor-pointer" @click="$emit('click')" bordered v-ripple>
    <q-img :src="character.image" height="250px">
      <div class="absolute-bottom-right bg-transparent">
        <q-badge :color="useStatusColor(character.status)" class="q-mr-sm q-mb-sm">
          {{ character.status }}
        </q-badge>
      </div>
    </q-img>

    <q-card-section>
      <div class="text-h6 ellipsis">{{ character.name }}</div>
      <div class="text-subtitle2">{{ character.species }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="row items-center">
        <q-icon name="place" color="primary" size="18px" class="q-mr-xs" />
        <div class="ellipsis">{{ character.location.name }}</div>
      </div>
      <div class="row items-center q-mt-xs">
        <q-icon name="home" color="primary" size="18px" class="q-mr-xs" />
        <div class="ellipsis">{{ character.origin.name }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useStatusColor } from '@/composables/useStatusColor'
import type { Character } from '@/types/rick-morty'

defineProps<{
  character: Character
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.character-card {
  transition: transform 0.3s ease;
}

.character-card:hover {
  transform: translateY(-5px);
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
