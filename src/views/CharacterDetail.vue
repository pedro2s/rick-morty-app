<template>
  <q-page class="q-pa-md">
    <q-btn
      color="primary"
      label="Voltar"
      icon="arrow_back"
      class="q-mb-md"
      @click="router.back()"
      flat
      no-caps
    />

    <div v-if="loading" class="q-pa-xl column items-center">
      <q-spinner-dots color="primary" size="40px" />
      <div class="text-subtitle1 q-mt-md">Carregando detalhes do personagem...</div>
    </div>

    <div v-else-if="error" class="q-pa-xl text-center">
      <q-icon name="error" color="negative" size="50px" />
      <p class="text-h6 text-negative">Ocorreu um erro ao carregar os detalhes do personagem</p>
    </div>

    <div v-else-if="!character" class="q-pa-xl text-center">
      <q-icon name="sentiment_dissatisfied" color="primary" size="50px" />
      <p class="text-h6">Personagem não encontrada</p>
    </div>

    <div v-else class="row q-col-gutter-lg">
      <!-- Lado esquerdo - Imagem e informação básica -->
      <div class="col-12 col-md-5">
        <q-card class="character-image-card">
          <q-img :src="character?.image" height="350px">
            <div class="absolute-bottom-right bg-transparent">
              <q-badge class="q-mr-sm q-mb-sm status-badge">
                {{ useStatusColor(character?.status) }}
              </q-badge>
            </div>
          </q-img>

          <q-card-section>
            <div class="text-h5">{{ character?.name }}</div>
            <div class="text-subtitle1">{{ character?.species }}</div>
          </q-card-section>

          <q-separator />

          <q-list dense>
            <q-item>
              <q-item-section avatar>
                <q-icon name="person" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Gênero</q-item-label>
                <q-item-label>{{ character?.gender }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-if="character?.type">
              <q-item-section avatar>
                <q-icon name="category" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Tipo</q-item-label>
                <q-item-label>{{ character?.type }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="place" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Localização Atual</q-item-label>
                <q-item-label>{{ character?.location.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <!-- Lado direito - Lista de episódios -->
      <div class="col-12 col-md-7">
        <q-card class="episodes-card">
          <q-card-section>
            <div class="text-h6">
              <q-icon name="tv" class="q-mr-sm" />
              Episódios
            </div>
            <div class="text-subtitle2">
              {{ character?.name }} aparece em {{ character?.episode.length }} episódios
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-list>
              <q-expansion-item
                v-for="episode in character?.episode"
                :key="episode.id"
                expand-separator
                :icon="getSeasonIcon(episode.episode)"
                :label="episode.name"
                :caption="episode.episode"
                group="episodes"
                class="episode-item"
              >
                <q-card>
                  <q-card-section>
                    <div class="row items-center q-gutter-sm">
                      <q-icon name="event" color="primary" size="18px" />
                      <div>Data de exibição: {{ episode.air_date }}</div>
                    </div>
                    <div class="row items-center q-gutter-sm q-mt-sm">
                      <q-icon name="tv" color="primary" size="18px" />
                      <div>Código do episódio: {{ episode.episode }}</div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCharacter } from '@/composables/useRickAndMorty'
import { useStatusColor } from '@/composables/useStatusColor'

const router = useRouter()
const route = useRoute()
const id = ref(route.params.id as string)

const { character, loading, error } = useCharacter(id)

function getSeasonIcon(episodeCode: string): string {
  // Episódios seguem o formato S01E01, S02E01, etc.
  if (episodeCode.startsWith('S01')) {
    return 'filter_1'
  } else if (episodeCode.startsWith('S02')) {
    return 'filter_2'
  } else if (episodeCode.startsWith('S03')) {
    return 'filter_3'
  } else if (episodeCode.startsWith('S04')) {
    return 'filter_4'
  } else if (episodeCode.startsWith('S05')) {
    return 'filter_5'
  } else {
    return 'tv'
  }
}
</script>

<style scoped>
.character-image-card {
  border-radius: 10px;
  overflow: hidden;
}

.status-badge {
  font-size: 16px;
  padding: 4px 8px;
}

.episodes-card {
  border-radius: 10px;
  overflow: hidden;
}

.episode-item {
  transition: background-color 0.3s ease;
}

.episode-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
