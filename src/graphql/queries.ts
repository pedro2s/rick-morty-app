import gql from 'graphql-tag'

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        location {
          name
        }
        origin {
          name
        }
      }
    }
  }
`;


export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      location {
        name
      }
      origin {
        name
      }
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`;
