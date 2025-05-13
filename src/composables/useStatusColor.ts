export function useStatusColor(status: string): string {
  switch (status) {
    case 'Alive':
      return 'positive'
    case 'Dead':
      return 'negative'
    default:
      return 'grey'
  }
}
