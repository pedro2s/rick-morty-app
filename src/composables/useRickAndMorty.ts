import type { Ref } from 'vue'
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_CHARACTERS, GET_CHARACTER } from '@/graphql/queries'
import type {
  Character,
  CharactersResponse,
  CharacterResponse,
  CharacterFilter,
  Info,
} from '@/types/rick-morty'

export function useCharacters(page: Ref<number>, filter: Ref<CharacterFilter>) {
  const { result, loading, error, refetch } = useQuery<CharactersResponse>(
    GET_CHARACTERS,
    () => ({
      page: Math.max(1, page.value),
      filter: filter.value,
    }),
    { fetchPolicy: 'no-cache' },
  )

  const characters = computed<Character[]>(() => result.value?.characters.results ?? [])

  const info = computed<Info>(
    () => result.value?.characters.info ?? { count: 0, pages: 0, next: null, prev: null },
  )

  return {
    characters,
    info,
    loading,
    error,
    refetch,
  }
}

export function useCharacter(id: Ref<string>) {
  const { result, loading, error } = useQuery<CharacterResponse>(
    GET_CHARACTER,
    { id: id.value },
    { fetchPolicy: 'cache-and-network' },
  )

  const character = computed(() => result.value?.character ?? null)

  return {
    character,
    loading,
    error,
  }
}
