import { ContainerStyled, LinkStyled, LiStyled, LogoWrapperStyled, NavStyled, NavWrapperStyled } from './home-page-header.styled';
import logoImg from 'shared/assets/logo.png';
import { Link } from 'shared/ui/link';

interface HomePageHeaderProps {
  aboutLink: string;
}

export const HomePageHeaderComponent = (props: HomePageHeaderProps) => {
  const { aboutLink } = props;

  return (
    <ContainerStyled>
      <LogoWrapperStyled style={{ backgroundImage: `url("${logoImg}")` }}>
        <LinkStyled href="./">P-AFF</LinkStyled>
      </LogoWrapperStyled>
      <NavWrapperStyled>
        <NavStyled>
          <LiStyled>
            <Link href={'#' + aboutLink}>О приложении</Link>
          </LiStyled>
          <LiStyled>
            <Link href={'#2'}>Отзывы</Link>
          </LiStyled>
        </NavStyled>
      </NavWrapperStyled>
    </ContainerStyled>
  );
};
