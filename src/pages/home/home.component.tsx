import React, { memo } from 'react';
import { HomePageHeaderComponent } from 'entities/ui/home-page-header';
import { HomePageTopSection } from 'entities/ui/home-page-top-section';
import { HomePageFooterComponent } from 'entities/ui/home-page-footer';
import { HomePageAboutApp } from 'entities/ui/home-page-about-app/home-page-about-app.component';
import { links } from './home.constants';
import { HomePageInstallApp } from 'entities/ui/home-page-install-app';
import { useHome } from 'pages/home/use-home';

export const Home = memo(() => {
  const {
    ui: { topSection },
  } = useHome();

  return (
    <div data-testid="hp">
      <HomePageHeaderComponent aboutLink={links.about} dataTestId="hp-header" installLink={links.install} />
      <HomePageTopSection {...topSection} />
      <HomePageAboutApp id={links.about} />
      <HomePageInstallApp id={links.install} />
      <HomePageFooterComponent />
    </div>
  );
});

Home.displayName = 'Home';
