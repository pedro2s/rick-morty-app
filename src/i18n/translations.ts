// src/i18n/translations.ts
export interface Translation {
  [key: string]: string | Translation
}

export const pt_BR: Translation = {
  common: {
    loading: 'Carregando...',
    error: 'Ocorreu um erro',
    tryAgain: 'Tentar novamente',
    back: 'Voltar',
    search: 'Buscar',
    notFound: 'Não encontrado',
    loadMore: 'Carregar mais',
  },
  characters: {
    title: 'Personagens de Rick and Morty',
    subtitle: 'Explore os personagens do multiverso!',
    searchByName: 'Buscar por nome',
    noCharactersFound: 'Nenhum personagem encontrado com este nome',
    species: 'Espécie',
    gender: 'Gênero',
    status: 'Status',
    origin: 'Origem',
    location: 'Localização',
    type: 'Tipo',
    episodes: 'Episódios',
    appearsIn: 'aparece em {count} episódios',
  },
  episodes: {
    title: 'Episódios',
    airDate: 'Data de exibição',
    episodeCode: 'Código do episódio',
  },
  status: {
    Alive: 'Vivo',
    Dead: 'Morto',
    unknown: 'Desconhecido',
  },
}

export const en_US: Translation = {
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    tryAgain: 'Try again',
    back: 'Back',
    search: 'Search',
    notFound: 'Not found',
    loadMore: 'Load more',
  },
  characters: {
    title: 'Rick and Morty Characters',
    subtitle: 'Explore the multiverse characters!',
    searchByName: 'Search by name',
    noCharactersFound: 'No characters found with this name',
    species: 'Species',
    gender: 'Gender',
    status: 'Status',
    origin: 'Origin',
    location: 'Location',
    type: 'Type',
    episodes: 'Episodes',
    appearsIn: 'appears in {count} episodes',
  },
  episodes: {
    title: 'Episodes',
    airDate: 'Air date',
    episodeCode: 'Episode code',
  },
  status: {
    Alive: 'Alive',
    Dead: 'Dead',
    unknown: 'Unknown',
  },
}

// Padrão é Português
export default pt_BR
