import styled from 'styled-components';
import ReactLoading from 'react-loading';

export const ContainerStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImgStyled = styled.img`
  width: 100%;
  height: 100%;

  @media (orientation: landscape) {
    height: auto;
  }

  @media (orientation: portrait) {
    height: 25%;
  }
`;

export const BlockStyled = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  padding: 5px;
  background-color: white;
  border: solid 3px #729fcf;
  color: black;

  @media (orientation: landscape) {
    top: 20%;
    left: 20%;
  }

  @media (orientation: portrait) {
    top: 20%;
  }
`;

export const ReactLoadingStyled = styled(ReactLoading)`
  position: absolute;
  left: 0;
  top: 0;

  @media (orientation: landscape) {
    top: 50%;
    left: 45%;
  }

  @media (orientation: portrait) {
    top: 70%;
    left: 40%;
  }
`;
