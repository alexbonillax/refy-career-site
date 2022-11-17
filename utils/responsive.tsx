import { useMediaQuery } from '@mountain-ui/react-hooks';

export const responsive =() => {
  const isMobile = useMediaQuery('screen and (min-width: 1px) and (max-width: 1279px)');
  return {
    isMobile,
    isDesktop: !isMobile
  };
}