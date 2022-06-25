import { FC } from 'react';
import styled from 'styled-components';
import { Loader } from '../components/Loader';
import {
  useGetCountsOfCharactersQuery,
  useGetCountsOfEpisodesQuery,
  useGetCountsOfLocationsQuery,
} from '../graphql/graphql';

const HomeContent = styled.div`
  height: calc(100vh - 73px);
  display: flex;
  flex-direction: column;
`;

const Part = styled.div`
  height: 50%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Top = styled(Part)`
  background-color: #fff;
`;

const Title = styled.h1`
  text-align: center;
  color: #202329;
  font-size: 100px;
  font-weight: 800;

  @media (max-width: 1040px) {
    font-size: 60px;
  }

  @media (max-width: 668px) {
    font-size: 30px;
  }
`;

const Bottom = styled(Part)`
  gap: 30px;

  @media (max-width: 668px) {
    gap: 10px;
  }
`;

const Subtitle = styled.h2`
  text-align: center;
  font-size: 25px;
  color: #9e9e9e;
  @media (max-width: 1040px) {
    font-size: 18px;
  }

  @media (max-width: 668px) {
    font-size: 1rem;
  }
`;

export const Home: FC = () => {
  const { data: charactersData, loading: charactersLoading } =
    useGetCountsOfCharactersQuery();
  const { data: locationsData, loading: locationsLoading } =
    useGetCountsOfLocationsQuery();
  const { data: episodesData, loading: episodesLoading } =
    useGetCountsOfEpisodesQuery();

  const charactersCount = charactersData?.characters?.info?.count;
  const locationsCount = locationsData?.locations?.info?.count;
  const episodesCount = episodesData?.episodes?.info?.count;

  return (
    <HomeContent>
      <Top>
        <Title>The Rick and Motry GraphQL</Title>
      </Top>
      <Bottom>
        {charactersLoading || locationsLoading || episodesLoading ? (
          <Loader />
        ) : (
          <>
            <Subtitle>CHARACTERS: {charactersCount}</Subtitle>
            <Subtitle>LOCATIONS: {locationsCount}</Subtitle>
            <Subtitle>EPISODES: {episodesCount}</Subtitle>
          </>
        )}
      </Bottom>
    </HomeContent>
  );
};
