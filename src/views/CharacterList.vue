<template>
  <div class="q-pa-md">
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
      <div class="col-12 flex flex-center">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </div>

    <div v-else-if="error" class="q-pa-md text-center">
      <q-icon name="error" color="negative" size="50px" />
      <p class="text-h6 text-negative">Ocorreu um erro ao carregar os personagens</p>
      <q-btn color="primary" @click="refetch">Tentar novamente</q-btn>
    </div>

  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
