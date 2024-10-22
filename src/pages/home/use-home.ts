import type { HomePageTopSectionProps } from 'entities/ui/home-page-top-section';
import { useYandexMetricGoals } from 'entities/lib/hooks/use-yandex-metric-goals';

interface UseHomeResult {
  ui: {
    topSection: HomePageTopSectionProps;
  };
}

export const useHome = (): UseHomeResult => {
  const { clickPlayButton } = useYandexMetricGoals();

  return {
    ui: {
      topSection: {
        onClickPlay: clickPlayButton,
      },
    },
  };
};
