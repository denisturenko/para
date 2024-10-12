import { ContainerStyled, LinkStyled, LiStyled, LogoWrapperStyled, NavStyled, NavWrapperStyled } from './home-page-header.styled';
import logoImg from 'shared/assets/logo.png';
import { Link } from 'shared/ui/link';

export const HomePageHeaderComponent = () => (
  <ContainerStyled>
    <LogoWrapperStyled style={{ backgroundImage: `url("${logoImg}")` }}>
      <LinkStyled href="./">P-AFF</LinkStyled>
    </LogoWrapperStyled>
    <NavWrapperStyled>
      <NavStyled>
        <LiStyled>
          <Link href={'#1'}>О приложении</Link>
        </LiStyled>
        <LiStyled>
          <Link href={'#2'}>Отзывы</Link>
        </LiStyled>
      </NavStyled>
    </NavWrapperStyled>
  </ContainerStyled>
);
