import { FC } from 'react';
import styled from 'styled-components';
import logo from '../img/logo.png';

const LoaderContent = styled.div`
  padding-top: 50px;
  text-align: center;

  & > img {
    width: 100px;
    animation: Rotate 1.5s infinite;
  }

  @keyframes Rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Loader: FC = () => {
  return (
    <LoaderContent>
      <img src={logo} alt="Loader" />
    </LoaderContent>
  );
};
