import { Card2 } from 'shared/ui/card2';
import imgInstall from 'shared/assets/hp-bg/install.jpg';
import { ContainerStyled } from './home-page-install-app.styled';
import { Link } from 'shared/ui/link';

interface HomePageInstallAppProps {
  id: string;
}

export const HomePageInstallApp = (props: HomePageInstallAppProps) => {
  const { id } = props;

  return (
    <ContainerStyled id={id}>
      <Card2
        img={imgInstall}
        imgHeight={400}
        items={[
          { title: '', description: 'Мы рекомендуем вам установить это веб-приложение на свой телефон' },
          {
            title: 'Android',
            description: (
              <ul>
                <li>- Нажать 3 точки</li>
                <li>- Выбрать пункт "Добавить на гл.экран"</li>
                <li>- В открывшемся окне нажать "Установить"</li>
              </ul>
            ),
          },
          {
            title: 'Iphone',
            description: (
              <ul>
                <li>- Откройте Chrome на iPhone или iPad</li>
                <li>
                  - Перейдите на сайт <Link href={window.location.origin}>Post-AFF</Link>
                </li>
                <li>- Справа от адресной строки нажмите на значок "Поделиться" </li>
                <li>- Выберите "Добавить на главный экран"</li>
                <li>- Измените или подтвердите сведения о сайте и нажмите "Добавить"</li>
              </ul>
            ),
          },
        ]}
        title="Установка приложения"
      />
    </ContainerStyled>
  );
};
