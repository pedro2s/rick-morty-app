import { ref, watch, onMounted } from 'vue'
import { Dark } from 'quasar'

export function useTheme() {
  const isDark = ref(false)

  // Alternar tema
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    Dark.set(isDark.value)
    localStorage.setItem('darkMode', isDark.value ? 'true' : 'false')
  }

  // Definir um tema específico
  const setDarkMode = (value: boolean) => {
    isDark.value = value
    Dark.set(isDark.value)
    localStorage.setItem('darkMode', isDark.value ? 'true' : 'false')
  }

  // Observa as mudanças nas preferências do sistema
  watch(
    () => Dark.isActive,
    (newValue) => {
      isDark.value = newValue
    },
  )

  // Inicializa o tema
  onMounted(() => {
    // Verifica se o tema está salvo no local storage
    const savedDarkMode = localStorage.getItem('darkMode')

    if (savedDarkMode !== null) {
      isDark.value = savedDarkMode === 'true'
    } else {
      // Verifica preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
    }

    // Aplica o tema
    Dark.set(isDark.value)
  })

  return {
    isDark,
    toggleDarkMode,
    setDarkMode,
  }
}
