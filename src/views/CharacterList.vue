<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12">
        <q-card class="bg-primary text-white">
          <q-card-section>
            <div class="text-h6">Personagens de Rick and Morty</div>
            <div class="text-subtitle2">Explore os personagens do multiverso!</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12">
        <q-input
          v-model="searchName"
          filled
          debounce="500"
          color="primary"
          label="Buscar por nome"
          clearable
          @update:model-value="resetPage"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <div v-if="loading && page === 1" class="row q-mt-lg q-mb-lg">
      <div class="col-12">
        <LoadingState message="Carregando personagens..." />
      </div>
    </div>

    <div v-else-if="error" class="q-pa-md text-center">
      <q-icon name="error" color="negative" size="50px" />
      <p class="text-h6 text-negative">Ocorreu um erro ao carregar os personagens</p>
      <q-btn color="primary" @click="refetch">Tentar novamente</q-btn>
    </div>

    <div v-else-if="characters.length === 0" class="q-pa-md text-center">
      <q-icon name="search_off" color="primary" size="50px" />
      <p class="text-h6">Nenhum personagem encontrado com este nome</p>
    </div>

    <div v-else class="row q-col-gutter-md">
      <div
        v-for="character in characters"
        :key="character.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card
          class="character-card cursor-pointer"
          @click="goToCharacter(character.id)"
          bordered
          v-ripple
        >
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
      </div>
    </div>

    <div class="row justify-center q-mt-lg">
      <q-pagination
        v-model="page"
        :max="info.pages"
        color="primary"
        direction-links
        boundary-links
        :max-pages="6"
        :boundary-numbers="false"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCharacters } from '@/composables/useRickAndMorty'
import { useStatusColor } from '@/composables/useStatusColor'
import type { CharacterFilter } from '@/types/rick-morty'
import LoadingState from '@/components/LoadingState.vue'

const router = useRouter()
const page = ref(1)
const searchName = ref('')

const filter = computed<CharacterFilter>(() => {
  return {
    name: searchName.value || undefined,
  }
})

const { characters, info, loading, error, refetch } = useCharacters(page, filter)

function resetPage() {
  page.value = 1
}

function goToCharacter(id: string) {
  router.push({ name: 'character-detail', params: { id } })
}

// Quando mudar o scroll da página para o topo
watch(page, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
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
