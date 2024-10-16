import { ContainerStyled, LinkStyled, LiStyled, LogoWrapperStyled, NavStyled, NavWrapperStyled } from './home-page-header.styled';
import logoImg from 'shared/assets/logo.png';
import { Link } from 'shared/ui/link';
import { projectName } from 'shared/lib/configs';

interface HomePageHeaderProps {
  aboutLink: string;
  dataTestId: string;
  installLink: string;
}

export const HomePageHeaderComponent = (props: HomePageHeaderProps) => {
  const { aboutLink, installLink, dataTestId } = props;

  return (
    <ContainerStyled data-testid={dataTestId}>
      <LogoWrapperStyled style={{ backgroundImage: `url("${logoImg}")` }}>
        <LinkStyled href="./">{projectName}</LinkStyled>
      </LogoWrapperStyled>
      <NavWrapperStyled>
        <NavStyled>
          <LiStyled>
            <Link href={'#' + aboutLink}>О приложении</Link>
          </LiStyled>
          <LiStyled>
            <Link href={'#' + installLink}>Установка</Link>
          </LiStyled>
        </NavStyled>
      </NavWrapperStyled>
    </ContainerStyled>
  );
};
