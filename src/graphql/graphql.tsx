import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Character = {
  __typename?: 'Character';
  /** Time at which the character was created in the database. */
  created?: Maybe<Scalars['String']>;
  /** Episodes in which this character appeared. */
  episode: Array<Maybe<Episode>>;
  /** The gender of the character ('Female', 'Male', 'Genderless' or 'unknown'). */
  gender?: Maybe<Scalars['String']>;
  /** The id of the character. */
  id?: Maybe<Scalars['ID']>;
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image?: Maybe<Scalars['String']>;
  /** The character's last known location */
  location?: Maybe<Location>;
  /** The name of the character. */
  name?: Maybe<Scalars['String']>;
  /** The character's origin location */
  origin?: Maybe<Location>;
  /** The species of the character. */
  species?: Maybe<Scalars['String']>;
  /** The status of the character ('Alive', 'Dead' or 'unknown'). */
  status?: Maybe<Scalars['String']>;
  /** The type or subspecies of the character. */
  type?: Maybe<Scalars['String']>;
};

export type Characters = {
  __typename?: 'Characters';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Character>>>;
};

export type Episode = {
  __typename?: 'Episode';
  /** The air date of the episode. */
  air_date?: Maybe<Scalars['String']>;
  /** List of characters who have been seen in the episode. */
  characters: Array<Maybe<Character>>;
  /** Time at which the episode was created in the database. */
  created?: Maybe<Scalars['String']>;
  /** The code of the episode. */
  episode?: Maybe<Scalars['String']>;
  /** The id of the episode. */
  id?: Maybe<Scalars['ID']>;
  /** The name of the episode. */
  name?: Maybe<Scalars['String']>;
};

export type Episodes = {
  __typename?: 'Episodes';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Episode>>>;
};

export type FilterCharacter = {
  gender?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  species?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type FilterEpisode = {
  episode?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FilterLocation = {
  dimension?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Info = {
  __typename?: 'Info';
  /** The length of the response. */
  count?: Maybe<Scalars['Int']>;
  /** Number of the next page (if it exists) */
  next?: Maybe<Scalars['Int']>;
  /** The amount of pages. */
  pages?: Maybe<Scalars['Int']>;
  /** Number of the previous page (if it exists) */
  prev?: Maybe<Scalars['Int']>;
};

export type Location = {
  __typename?: 'Location';
  /** Time at which the location was created in the database. */
  created?: Maybe<Scalars['String']>;
  /** The dimension in which the location is located. */
  dimension?: Maybe<Scalars['String']>;
  /** The id of the location. */
  id?: Maybe<Scalars['ID']>;
  /** The name of the location. */
  name?: Maybe<Scalars['String']>;
  /** List of characters who have been last seen in the location. */
  residents: Array<Maybe<Character>>;
  /** The type of the location. */
  type?: Maybe<Scalars['String']>;
};

export type Locations = {
  __typename?: 'Locations';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Location>>>;
};

export type Query = {
  __typename?: 'Query';
  /** Get a specific character by ID */
  character?: Maybe<Character>;
  /** Get the list of all characters */
  characters?: Maybe<Characters>;
  /** Get a list of characters selected by ids */
  charactersByIds?: Maybe<Array<Maybe<Character>>>;
  /** Get a specific episode by ID */
  episode?: Maybe<Episode>;
  /** Get the list of all episodes */
  episodes?: Maybe<Episodes>;
  /** Get a list of episodes selected by ids */
  episodesByIds?: Maybe<Array<Maybe<Episode>>>;
  /** Get a specific locations by ID */
  location?: Maybe<Location>;
  /** Get the list of all locations */
  locations?: Maybe<Locations>;
  /** Get a list of locations selected by ids */
  locationsByIds?: Maybe<Array<Maybe<Location>>>;
};


export type QueryCharacterArgs = {
  id: Scalars['ID'];
};


export type QueryCharactersArgs = {
  filter?: InputMaybe<FilterCharacter>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryCharactersByIdsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryEpisodeArgs = {
  id: Scalars['ID'];
};


export type QueryEpisodesArgs = {
  filter?: InputMaybe<FilterEpisode>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryEpisodesByIdsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryLocationArgs = {
  id: Scalars['ID'];
};


export type QueryLocationsArgs = {
  filter?: InputMaybe<FilterLocation>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryLocationsByIdsArgs = {
  ids: Array<Scalars['ID']>;
};

export type AllCharactersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
}>;


export type AllCharactersQuery = { __typename?: 'Query', characters?: { __typename?: 'Characters', info?: { __typename?: 'Info', count?: number | null, pages?: number | null } | null, results?: Array<{ __typename?: 'Character', id?: string | null, name?: string | null, image?: string | null, gender?: string | null, status?: string | null, species?: string | null } | null> | null } | null };

export type CharacterQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CharacterQuery = { __typename?: 'Query', character?: { __typename?: 'Character', id?: string | null, name?: string | null, image?: string | null, status?: string | null, species?: string | null, gender?: string | null, origin?: { __typename?: 'Location', id?: string | null, name?: string | null, type?: string | null } | null, location?: { __typename?: 'Location', id?: string | null, name?: string | null, type?: string | null } | null, episode: Array<{ __typename?: 'Episode', id?: string | null, name?: string | null, air_date?: string | null, episode?: string | null } | null> } | null };

export type GetCountsOfCharactersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCountsOfCharactersQuery = { __typename?: 'Query', characters?: { __typename?: 'Characters', info?: { __typename?: 'Info', count?: number | null } | null } | null };

export type CharactersByIdsQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type CharactersByIdsQuery = { __typename?: 'Query', charactersByIds?: Array<{ __typename?: 'Character', id?: string | null, name?: string | null, image?: string | null, gender?: string | null, location?: { __typename?: 'Location', name?: string | null } | null } | null> | null };

export type GetCountsOfEpisodesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCountsOfEpisodesQuery = { __typename?: 'Query', episodes?: { __typename?: 'Episodes', info?: { __typename?: 'Info', count?: number | null } | null } | null };

export type GetCountsOfLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCountsOfLocationsQuery = { __typename?: 'Query', locations?: { __typename?: 'Locations', info?: { __typename?: 'Info', count?: number | null } | null } | null };

export type LocationQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LocationQuery = { __typename?: 'Query', location?: { __typename?: 'Location', id?: string | null, name?: string | null, type?: string | null, dimension?: string | null, residents: Array<{ __typename?: 'Character', id?: string | null, image?: string | null, name?: string | null, species?: string | null } | null> } | null };

export type LocationsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
}>;


export type LocationsQuery = { __typename?: 'Query', locations?: { __typename?: 'Locations', info?: { __typename?: 'Info', pages?: number | null } | null, results?: Array<{ __typename?: 'Location', id?: string | null, name?: string | null, type?: string | null } | null> | null } | null };

export type LocationsByIdsQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type LocationsByIdsQuery = { __typename?: 'Query', locationsByIds?: Array<{ __typename?: 'Location', id?: string | null, name?: string | null, type?: string | null, dimension?: string | null } | null> | null };


export const AllCharactersDocument = gql`
    query allCharacters($page: Int) {
  characters(page: $page) {
    info {
      count
      pages
    }
    results {
      id
      name
      image
      gender
      status
      species
    }
  }
}
    `;

/**
 * __useAllCharactersQuery__
 *
 * To run a query within a React component, call `useAllCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCharactersQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAllCharactersQuery(baseOptions?: Apollo.QueryHookOptions<AllCharactersQuery, AllCharactersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCharactersQuery, AllCharactersQueryVariables>(AllCharactersDocument, options);
      }
export function useAllCharactersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCharactersQuery, AllCharactersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCharactersQuery, AllCharactersQueryVariables>(AllCharactersDocument, options);
        }
export type AllCharactersQueryHookResult = ReturnType<typeof useAllCharactersQuery>;
export type AllCharactersLazyQueryHookResult = ReturnType<typeof useAllCharactersLazyQuery>;
export type AllCharactersQueryResult = Apollo.QueryResult<AllCharactersQuery, AllCharactersQueryVariables>;
export const CharacterDocument = gql`
    query character($id: ID!) {
  character(id: $id) {
    id
    name
    image
    status
    species
    gender
    origin {
      id
      name
      type
    }
    location {
      id
      name
      type
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

/**
 * __useCharacterQuery__
 *
 * To run a query within a React component, call `useCharacterQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCharacterQuery(baseOptions: Apollo.QueryHookOptions<CharacterQuery, CharacterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterQuery, CharacterQueryVariables>(CharacterDocument, options);
      }
export function useCharacterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterQuery, CharacterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterQuery, CharacterQueryVariables>(CharacterDocument, options);
        }
export type CharacterQueryHookResult = ReturnType<typeof useCharacterQuery>;
export type CharacterLazyQueryHookResult = ReturnType<typeof useCharacterLazyQuery>;
export type CharacterQueryResult = Apollo.QueryResult<CharacterQuery, CharacterQueryVariables>;
export const GetCountsOfCharactersDocument = gql`
    query getCountsOfCharacters {
  characters {
    info {
      count
    }
  }
}
    `;

/**
 * __useGetCountsOfCharactersQuery__
 *
 * To run a query within a React component, call `useGetCountsOfCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountsOfCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountsOfCharactersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCountsOfCharactersQuery(baseOptions?: Apollo.QueryHookOptions<GetCountsOfCharactersQuery, GetCountsOfCharactersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCountsOfCharactersQuery, GetCountsOfCharactersQueryVariables>(GetCountsOfCharactersDocument, options);
      }
export function useGetCountsOfCharactersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCountsOfCharactersQuery, GetCountsOfCharactersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCountsOfCharactersQuery, GetCountsOfCharactersQueryVariables>(GetCountsOfCharactersDocument, options);
        }
export type GetCountsOfCharactersQueryHookResult = ReturnType<typeof useGetCountsOfCharactersQuery>;
export type GetCountsOfCharactersLazyQueryHookResult = ReturnType<typeof useGetCountsOfCharactersLazyQuery>;
export type GetCountsOfCharactersQueryResult = Apollo.QueryResult<GetCountsOfCharactersQuery, GetCountsOfCharactersQueryVariables>;
export const CharactersByIdsDocument = gql`
    query charactersByIds($ids: [ID!]!) {
  charactersByIds(ids: $ids) {
    id
    name
    image
    gender
    location {
      name
    }
  }
}
    `;

/**
 * __useCharactersByIdsQuery__
 *
 * To run a query within a React component, call `useCharactersByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharactersByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharactersByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useCharactersByIdsQuery(baseOptions: Apollo.QueryHookOptions<CharactersByIdsQuery, CharactersByIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharactersByIdsQuery, CharactersByIdsQueryVariables>(CharactersByIdsDocument, options);
      }
export function useCharactersByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharactersByIdsQuery, CharactersByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharactersByIdsQuery, CharactersByIdsQueryVariables>(CharactersByIdsDocument, options);
        }
export type CharactersByIdsQueryHookResult = ReturnType<typeof useCharactersByIdsQuery>;
export type CharactersByIdsLazyQueryHookResult = ReturnType<typeof useCharactersByIdsLazyQuery>;
export type CharactersByIdsQueryResult = Apollo.QueryResult<CharactersByIdsQuery, CharactersByIdsQueryVariables>;
export const GetCountsOfEpisodesDocument = gql`
    query getCountsOfEpisodes {
  episodes {
    info {
      count
    }
  }
}
    `;

/**
 * __useGetCountsOfEpisodesQuery__
 *
 * To run a query within a React component, call `useGetCountsOfEpisodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountsOfEpisodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountsOfEpisodesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCountsOfEpisodesQuery(baseOptions?: Apollo.QueryHookOptions<GetCountsOfEpisodesQuery, GetCountsOfEpisodesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCountsOfEpisodesQuery, GetCountsOfEpisodesQueryVariables>(GetCountsOfEpisodesDocument, options);
      }
export function useGetCountsOfEpisodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCountsOfEpisodesQuery, GetCountsOfEpisodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCountsOfEpisodesQuery, GetCountsOfEpisodesQueryVariables>(GetCountsOfEpisodesDocument, options);
        }
export type GetCountsOfEpisodesQueryHookResult = ReturnType<typeof useGetCountsOfEpisodesQuery>;
export type GetCountsOfEpisodesLazyQueryHookResult = ReturnType<typeof useGetCountsOfEpisodesLazyQuery>;
export type GetCountsOfEpisodesQueryResult = Apollo.QueryResult<GetCountsOfEpisodesQuery, GetCountsOfEpisodesQueryVariables>;
export const GetCountsOfLocationsDocument = gql`
    query getCountsOfLocations {
  locations {
    info {
      count
    }
  }
}
    `;

/**
 * __useGetCountsOfLocationsQuery__
 *
 * To run a query within a React component, call `useGetCountsOfLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountsOfLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountsOfLocationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCountsOfLocationsQuery(baseOptions?: Apollo.QueryHookOptions<GetCountsOfLocationsQuery, GetCountsOfLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCountsOfLocationsQuery, GetCountsOfLocationsQueryVariables>(GetCountsOfLocationsDocument, options);
      }
export function useGetCountsOfLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCountsOfLocationsQuery, GetCountsOfLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCountsOfLocationsQuery, GetCountsOfLocationsQueryVariables>(GetCountsOfLocationsDocument, options);
        }
export type GetCountsOfLocationsQueryHookResult = ReturnType<typeof useGetCountsOfLocationsQuery>;
export type GetCountsOfLocationsLazyQueryHookResult = ReturnType<typeof useGetCountsOfLocationsLazyQuery>;
export type GetCountsOfLocationsQueryResult = Apollo.QueryResult<GetCountsOfLocationsQuery, GetCountsOfLocationsQueryVariables>;
export const LocationDocument = gql`
    query location($id: ID!) {
  location(id: $id) {
    id
    name
    type
    dimension
    residents {
      id
      image
      name
      species
    }
  }
}
    `;

/**
 * __useLocationQuery__
 *
 * To run a query within a React component, call `useLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLocationQuery(baseOptions: Apollo.QueryHookOptions<LocationQuery, LocationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LocationQuery, LocationQueryVariables>(LocationDocument, options);
      }
export function useLocationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LocationQuery, LocationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LocationQuery, LocationQueryVariables>(LocationDocument, options);
        }
export type LocationQueryHookResult = ReturnType<typeof useLocationQuery>;
export type LocationLazyQueryHookResult = ReturnType<typeof useLocationLazyQuery>;
export type LocationQueryResult = Apollo.QueryResult<LocationQuery, LocationQueryVariables>;
export const LocationsDocument = gql`
    query locations($page: Int) {
  locations(page: $page) {
    info {
      pages
    }
    results {
      id
      name
      type
    }
  }
}
    `;

/**
 * __useLocationsQuery__
 *
 * To run a query within a React component, call `useLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationsQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useLocationsQuery(baseOptions?: Apollo.QueryHookOptions<LocationsQuery, LocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LocationsQuery, LocationsQueryVariables>(LocationsDocument, options);
      }
export function useLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LocationsQuery, LocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LocationsQuery, LocationsQueryVariables>(LocationsDocument, options);
        }
export type LocationsQueryHookResult = ReturnType<typeof useLocationsQuery>;
export type LocationsLazyQueryHookResult = ReturnType<typeof useLocationsLazyQuery>;
export type LocationsQueryResult = Apollo.QueryResult<LocationsQuery, LocationsQueryVariables>;
export const LocationsByIdsDocument = gql`
    query locationsByIds($ids: [ID!]!) {
  locationsByIds(ids: $ids) {
    id
    name
    type
    dimension
  }
}
    `;

/**
 * __useLocationsByIdsQuery__
 *
 * To run a query within a React component, call `useLocationsByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationsByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationsByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useLocationsByIdsQuery(baseOptions: Apollo.QueryHookOptions<LocationsByIdsQuery, LocationsByIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LocationsByIdsQuery, LocationsByIdsQueryVariables>(LocationsByIdsDocument, options);
      }
export function useLocationsByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LocationsByIdsQuery, LocationsByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LocationsByIdsQuery, LocationsByIdsQueryVariables>(LocationsByIdsDocument, options);
        }
export type LocationsByIdsQueryHookResult = ReturnType<typeof useLocationsByIdsQuery>;
export type LocationsByIdsLazyQueryHookResult = ReturnType<typeof useLocationsByIdsLazyQuery>;
export type LocationsByIdsQueryResult = Apollo.QueryResult<LocationsByIdsQuery, LocationsByIdsQueryVariables>;