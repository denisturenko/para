import React from 'react';
import {
  BrandStyled,
  ContainerStyled,
  CopyAndLogoWrapperStyled,
  CopyStyled,
  ItemListStyled,
  ListStyled,
  TelegramLink,
} from 'entities/ui/home-page-footer/home-page-footer.styled';
import { FaTelegram } from 'react-icons/fa6';
import { projectName } from 'shared/lib/configs';

const telegramLink = 'https://t.me/';

interface IProps {
  className?: string;
}

export const HomePageFooterComponent: React.FC<IProps> = () => (
  <ContainerStyled>
    <CopyAndLogoWrapperStyled>
      <CopyStyled>
        {'\u00a9'}2023 - {new Date().getFullYear()}
      </CopyStyled>
      <BrandStyled>{projectName}</BrandStyled>
    </CopyAndLogoWrapperStyled>

    <ListStyled>
      <ItemListStyled>
        <TelegramLink href={telegramLink} id="footer-section_order-link" rel={'Связаться со мною'} target="_blank">
          <FaTelegram /> {telegramLink}
        </TelegramLink>
      </ItemListStyled>
    </ListStyled>
  </ContainerStyled>
);
