import styled from 'styled-components';
import { Anhor } from 'shared/ui/anhor';

export const ContainerStyled = styled.header`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: 1s fadein 0.2s forwards;
  opacity: 0;
  color: #fff;
  z-index: 2;

  @keyframes fadein {
    100% {
      opacity: 1;
    }
  }
  @media (min-width: 600px) {
    @media screen and (orientation: landscape) {
      padding: 10px 100px 0;
    }
  }
  @media (max-width: 600px) {
    @media screen and (orientation: portrait) {
      padding-top: 50px;
    }
    flex-direction: column;
  }
`;

export const LogoWrapperStyled = styled.p`
  font-family: \"Amatic SC\", sans-serif;
  font-size: 40px;
  font-weight: bold;

  padding-left: 70px;
  background-size: contain;
  background-repeat: no-repeat;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 40px;
  }

  @media (max-width: 600px) {
    margin-bottom: 15px;
  }
`;

export const LinkStyled = styled(Anhor)`
  color: #f56946;
`;

export const NavWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const NavStyled = styled.nav`
  height: 30px;
  display: flex;
  align-items: center;
  list-style: none;
  border-radius: 5px;

  background-color: rgba(85, 85, 85, 0.5);
`;

export const LiStyled = styled.li`
  margin: 0 15px;
`;
