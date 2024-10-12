import { BackBlockStyled, ButtonStyled, ContainerStyled, ContentAreaStyled, H1Styled, H2Styled } from './home-page-top-section.styled';
import { useState } from 'react';
import BgImg from 'shared/assets/hp-bg/img1.png';
import BgImg1 from 'shared/assets/hp-bg/tmp1.jpg';
import BgImg2 from 'shared/assets/hp-bg/tmp2.jpg';

export interface HomePageTopSectionProps {
  onClickStart?(): void;
}

export const HomePageTopSection = ({ onClickStart }: HomePageTopSectionProps) => (
  <ContainerStyled ignoreBackgroundColor>
    <BackBlockStyled style={{ backgroundImage: `url("${BgImg2}")` }} />
    <ContentAreaStyled>
      <H1Styled id="top-section_title">Хотите уверенно приземляться под куполом парашюта?</H1Styled>
      <H2Styled id="top-section_msg">Потренеруйтесь в нашем веб-приложении</H2Styled>
      <ButtonStyled id="top-section_order-link" size="xl" variant="filled" onClick={onClickStart}>
        Играть
      </ButtonStyled>
    </ContentAreaStyled>
  </ContainerStyled>
);
