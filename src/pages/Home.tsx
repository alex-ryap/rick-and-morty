import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Loader } from '../components/Loader';
import {
  useCountOfCharactersQuery,
  useCountOfEpisodesQuery,
  useCountOfLocationsQuery,
} from '../graphql/graphql';
import {
  CHARACTERS_PAGE,
  EPISODES_PAGE,
  LOCATIONS_PAGE,
} from '../utils/constants';

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

const Subtitle = styled(Link)`
  text-decoration: none;
  text-align: center;
  font-size: 25px;
  color: #9e9e9e;

  &:hover {
    color: #93be61;
  }

  @media (max-width: 1040px) {
    font-size: 18px;
  }

  @media (max-width: 668px) {
    font-size: 1rem;
  }
`;

export const Home: FC = () => {
  const { data: charactersData, loading: charactersLoading } =
    useCountOfCharactersQuery();
  const { data: locationsData, loading: locationsLoading } =
    useCountOfLocationsQuery();
  const { data: episodesData, loading: episodesLoading } =
    useCountOfEpisodesQuery();

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
            <Subtitle to={CHARACTERS_PAGE}>
              CHARACTERS: {charactersCount}
            </Subtitle>
            <Subtitle to={LOCATIONS_PAGE}>LOCATIONS: {locationsCount}</Subtitle>
            <Subtitle to={EPISODES_PAGE}>EPISODES: {episodesCount}</Subtitle>
          </>
        )}
      </Bottom>
    </HomeContent>
  );
};
