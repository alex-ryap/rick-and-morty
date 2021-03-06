import { forwardRef, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Location } from '../graphql/graphql';
import { LOCATIONS_PAGE } from '../utils/constants';

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

  &:hover {
    transform: scale(1.05);
  }

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

interface ILocationCardProps {
  location: Location;
}

const LocationComponent = forwardRef<HTMLHeadingElement, ILocationCardProps>(
  ({ location }, ref) => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
      const link = `${LOCATIONS_PAGE}/${location.id}`;
      navigate(link);
    }, [navigate, location.id]);

    return (
      <Card ref={ref} onClick={handleClick}>
        <Title>{location.name}</Title>
        <Subtitle>{location.type}</Subtitle>
      </Card>
    );
  }
);

export const LocationCard = memo(LocationComponent);
