import { BackBlockStyled, ButtonStyled, ContainerStyled, ContentAreaStyled, H1Styled, H2Styled } from './home-page-top-section.styled';
import SmallBgImg from 'shared/assets/hp-bg/main-small.jpg';
import BigBgImg from 'shared/assets/hp-bg/main-big.jpg';

export interface HomePageTopSectionProps {
  onClickStart?(): void;
}

export const HomePageTopSection = ({ onClickStart }: HomePageTopSectionProps) => (
  <ContainerStyled ignoreBackgroundColor>
    <BackBlockStyled style={{ backgroundImage: `url("${SmallBgImg}")` }} />
    <BackBlockStyled style={{ backgroundImage: `url("${BigBgImg}")` }} />
    <ContentAreaStyled>
      <H1Styled id="top-section_title">Хотите уверенно приземляться под куполом парашюта?</H1Styled>
      <H2Styled id="top-section_msg">Потренируйтесь в нашем веб-приложении</H2Styled>
      <ButtonStyled data-testid="btn-play-top-section" size="xl" variant="filled" onClick={onClickStart}>
        Играть
      </ButtonStyled>
    </ContentAreaStyled>
  </ContainerStyled>
);
