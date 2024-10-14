import { Card2 } from 'shared/ui/card2';
import imgSettings from 'shared/assets/hp-bg/settings.jpg';
import imgTarget from 'shared/assets/hp-bg/target.jpg';
import imgControls from 'shared/assets/hp-bg/controls.jpg';
import { ContainerStyled } from './home-page-about-app.styled';

interface HomePageAboutAppProps {
  id: string;
}

export const HomePageAboutApp = (props: HomePageAboutAppProps) => {
  const { id } = props;

  return (
    <ContainerStyled id={id}>
      <Card2
        img={imgControls}
        items={[
          {
            title: 'Стропы управления',
            description: 'Используйте полоски по бокам для маневрирования, как стропами управления',
          },
          {
            title: 'Вид',
            description: 'Нажимайте на экран, что бы поменять угол обзора игрока',
          },
        ]}
        title="Управление"
      />
      <Card2
        img={imgTarget}
        items={[
          {
            title: 'Графические компоненты',
            description:
              'Ориентируйтесь на круги радиусом 50 и 100 метров вокруг точки приземления. Накладывайте линии створа и траверза, чтобы улучшить свою технику.',
          },
          {
            title: 'Настройка сигналов пищалки',
            description:
              'Слушайте настраиваемые звуковые сигналы на разных высотах и вы всегда будете знать, когда начинать первый разворот',
          },
        ]}
        title="Виртуальные помощники"
      />
      <Card2
        img={imgSettings}
        items={[
          { title: 'Направление и сила ветра', description: 'Изменяйте параметры и учитесь адаптироваться к различным метеоусловиям' },
          {
            title: 'Ветер по высотам',
            description: 'Устанавливайте разные скорости ветра на разных высотах – идеальный способ для отработки навыков',
          },
          {
            title: 'Горизонтальная и вертикальная скорости',
            description: 'Настраивайте параметры вашего парашюта для идеального захода.',
          },
          {
            title: 'Инертность купола',
            description: 'Узнайте, как различные характеристики влияют на постоение захода и управляемость',
          },
        ]}
        title="Настройки"
      />
    </ContainerStyled>
  );
};
