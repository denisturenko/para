import { BackBlockStyled, ContainerStyled, ContentAreaStyled, H1Styled, H2Styled } from './home-page-top-section.styled';
import SmallBgImg from 'shared/assets/hp-bg/main-small.jpg';
import BigBgImg from 'shared/assets/hp-bg/main-big.jpg';
import { urls } from 'entities/lib/config';
import { Link } from 'shared/ui/link';
import { FaTelegram } from 'react-icons/fa6';
import { TelegramLink } from 'entities/ui/home-page-footer/home-page-footer.styled';
import React from 'react';

export interface HomePageTopSectionProps {
  onClickPlay(): void;
  telegramLink: string;
}

export const HomePageTopSection = ({ onClickPlay, telegramLink }: HomePageTopSectionProps) => (
  <ContainerStyled ignoreBackgroundColor>
    <BackBlockStyled style={{ backgroundImage: `url("${SmallBgImg}")` }} />
    <BackBlockStyled style={{ backgroundImage: `url("${BigBgImg}")` }} />
    <ContentAreaStyled>
      <H1Styled id="top-section_title">Хотите уверенно приземляться под куполом парашюта?</H1Styled>
      <H2Styled id="top-section_msg">Потренируйтесь в нашем веб-приложении</H2Styled>
      <Link data-testid="btn-play-top-section" size="xl" to={urls.GAME} variant="filled" onClick={onClickPlay}>
        Играть
      </Link>
      <TelegramLink data-testid="top-section_tg-link" href={telegramLink} rel={'Связаться со мною'} target="_blank">
        <FaTelegram /> {telegramLink}
      </TelegramLink>
    </ContentAreaStyled>
  </ContainerStyled>
);
