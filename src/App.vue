<template>
  <q-layout view="lHh lpR lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat no-caps no-wrap to="/">
            <div class="row items-center no-wrap">
              <img
                src="@/assets/rick-and-morty-logo.png"
                width="40"
                height="40"
                class="logo q-mr-sm"
              />
              <div class="text-h6">Rick and Morty Explorer</div>
            </div>
          </q-btn>
        </q-toolbar-title>

        <q-space />

        <q-select
          v-model="currentLocale"
          :options="localeOptions"
          dense
          borderless
          emit-value
          map-options
          style="min-width: 120px"
          @update:model-value="setLocale"
          class="q-mr-md"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-translate" />
          </template>
        </q-select>

        <q-btn
          flat
          round
          dense
          :icon="isDark ? 'light_mode' : 'dark_mode'"
          @click="toggleDarkMode()"
        />
        <q-btn
          flat
          round
          dense
          icon="mdi-github"
          type="a"
          target="_blank"
          href="https://github.com/pedro2s/rick-morty-app"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-dark text-white text-center">
      <q-toolbar>
        <q-toolbar-title>
          Rick and Morty Explorer &copy; {{ new Date().getFullYear() }}
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useTheme } from './composables/useTheme'
import { useI18n } from './composables/useI18n'

const { isDark, toggleDarkMode } = useTheme()
const { currentLocale, setLocale } = useI18n()

const localeOptions = [
  { label: 'Português', value: 'pt-BR' },
  { label: 'English', value: 'en-US' },
]
</script>

<style scoped>
.logo {
  animation: spin infinite 20s linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
