import { ContainerStyled, LinkStyled, LiStyled, LogoWrapperStyled, NavStyled, NavWrapperStyled } from './home-page-header.styled';
import logoImg from 'shared/assets/logo.png';
import { Anhor } from 'shared/ui/anhor';
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
        <LinkStyled to="./">{projectName}</LinkStyled>
      </LogoWrapperStyled>
      <NavWrapperStyled>
        <NavStyled>
          <LiStyled>
            <Anhor dataTestId="link-about-hp" href={'#' + aboutLink}>
              О приложении
            </Anhor>
          </LiStyled>
          <LiStyled>
            <Anhor dataTestId="link-install-hp" href={'#' + installLink}>
              Установка
            </Anhor>
          </LiStyled>
        </NavStyled>
      </NavWrapperStyled>
    </ContainerStyled>
  );
};
