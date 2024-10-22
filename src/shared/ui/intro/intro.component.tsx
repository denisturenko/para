import IntroImg from 'shared/assets/intro.png';
import { ContainerStyled, ImgStyled, BlockStyled, ReactLoadingStyled } from 'shared/ui/intro/intro.styled';

export const Intro = () => (
  <ContainerStyled>
    <ImgStyled alt="" src={IntroImg} />
    <BlockStyled>
      1. Меняйте параметры погоды, характеристики купола и т.д.
      <br />
      2. Маневрируйте, как стропами управления
      <br />
      3. Нажимайте на экран, что бы поменять угол обзора
      <br />
    </BlockStyled>
    <ReactLoadingStyled color="white" height={20} type="bubbles" width={100} />
  </ContainerStyled>
);
