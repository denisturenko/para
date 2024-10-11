import { ContainerStyled, LiStyled, LogoWrapperStyled, NavStyled, NavWrapperStyled } from './home-page-header.styled';
import logoImg from 'shared/assets/logo.png';
import { Link } from 'shared/ui/link';

export const HomePageHeaderComponent = () => (
  <ContainerStyled>
    <LogoWrapperStyled style={{ backgroundImage: `url("${logoImg}")` }}>
      <Link href="./">P-AFF</Link>
    </LogoWrapperStyled>
    <NavWrapperStyled>
      <NavStyled>
        <LiStyled>
          <Link href={'#1'}>Управление</Link>
        </LiStyled>
        <LiStyled>
          <Link href={'#2'}>Настройки</Link>
        </LiStyled>
      </NavStyled>
    </NavWrapperStyled>
  </ContainerStyled>
);
