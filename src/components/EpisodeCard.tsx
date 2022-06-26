import { forwardRef, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Episode } from '../graphql/graphql';
import { EPISODES_PAGE } from '../utils/constants';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 30px;
  gap: 5px;
  cursor: pointer;
  border-radius: 10px;
  background-color: rgb(60, 62, 68);
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 6px -1px,
    rgb(0 0 0 / 6%) 0px 2px 4px -1px;
  transition: 0.2s all;
  overflow: hidden;

  &:hover h3 {
    color: #bff77e;
  }
`;

const Title = styled.h3`
  font-size: 1.3rem;
  color: #fff;
`;

const Subtitle = styled.p`
  color: #999;
`;

interface IEpisodeCardProps {
  episode: Episode;
}

const EpisodeComponent = forwardRef<HTMLHeadingElement, IEpisodeCardProps>(
  ({ episode }, ref) => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
      const link = `${EPISODES_PAGE}/${episode.id}`;
      navigate(link);
    }, [navigate, episode.id]);

    return (
      <Card ref={ref} onClick={handleClick}>
        <Subtitle>{episode.air_date}</Subtitle>
        <Title>{episode.name}</Title>
      </Card>
    );
  }
);

export const EpisodeCard = memo(EpisodeComponent);
