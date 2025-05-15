import { ref, computed } from 'vue'
import { pt_BR, en_US, type Translation } from '@/i18n/translations'

// Locais disponíveis
const locales = {
  'pt-BR': pt_BR,
  'en-US': en_US,
}

// Localidade atual (padrão para a localidade do navegador, se disponível, caso contrário, pt-BR)
const currentLocale = ref(navigator.language in locales ? navigator.language : 'pt-BR')

export function useI18n() {
  // Obter traduções para o local atual
  const t = computed<Translation>(() => {
    return currentLocale.value in locales
      ? locales[currentLocale.value as keyof typeof locales]
      : pt_BR
  })

  // Definir localidade
  const setLocale = (locale: string) => {
    if (locale in locales) {
      currentLocale.value = locale
      // Armazena locale em local storage
      localStorage.setItem('locale', locale)
    }
  }

  // Obter tradução pelo caminho da chave (suporta chaves aninhadas como 'characters.title')
  const translate = (keyPath: string, params: Record<string, string | number> = {}): string => {
    const keys = keyPath.split('.')

    // Navegar pelo objeto de tradução aninhado
    let result: Translation | string = t.value

    for (const key of keys) {
      if (!result || typeof result !== 'object') {
        return keyPath // Key não encontrada
      }
      result = result[key] as string
    }

    if (typeof result !== 'string') {
      return keyPath // Key não encontrada
    }

    // Substituir parâmetros
    return Object.entries(params).reduce(
      (str, [key, value]) => str.replace(`{${key}}`, value.toString()),
      result,
    )
  }

  return {
    currentLocale,
    setLocale,
    translate,
  }
}

if (typeof window !== 'undefined') {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && savedLocale in locales) {
    currentLocale.value = savedLocale
  }
}
