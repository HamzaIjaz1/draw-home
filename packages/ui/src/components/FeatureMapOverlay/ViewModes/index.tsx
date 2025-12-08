import { css, styled, useMediaQuery, useTheme } from '@mui/material';
import { ArrowIcon, CircleDesktopIcon, CircleMobileIcon } from './icons';
import { textStyles } from '../styles';
import { topCenterBreakpoint } from '../../MainScreenOverlay/styles';
import { createStyledOptions } from '../../../utils/createStyledOptions';

const Text = styled('span')(({ theme }) => css`
  ${textStyles(theme)}

  position: absolute;
  top: 110px;
  left: clamp(10px, -158.2352px + 43.1373vw, 230px);
  width: 200px;

  ${theme.breakpoints.up('md')} {
    top: 130px;
    left: clamp(110px, -322.5808px + 48.0645vw, 1600px);
    width: 530px;
  }
`);

type Props = {
  isTouchScreen: boolean;
};
const options = createStyledOptions<Props>({
  isTouchScreen: true,
});

const Arrow = styled(ArrowIcon, options)<Props>(({ theme, isTouchScreen }) => css`
  position: absolute;
  left: 70px;

  ${theme.breakpoints.up(topCenterBreakpoint)} {
    left: clamp(96px, -104.3616px + 46.5957vw, 315px);
  }

  ${theme.breakpoints.up('md')} {
    left: clamp(280px, -172.904px + 50.3226vw, 1840px);

    width: 58px;
    height: 53px;
  }

  ${isTouchScreen === false && css`
    top: 67px;
    ${theme.breakpoints.up(topCenterBreakpoint)} {
      top: 60px;
    }
    ${theme.breakpoints.up('md')} {
      top: 68px;
    }
  `}

  ${isTouchScreen === true && css`
    top: 58px;
    ${theme.breakpoints.up('md')} {
      top: 64px;
      width: 62px;
      height: 57px;
    }
  `}
`);

const CircleMobile = styled(CircleMobileIcon, options)<Props>(({ theme, isTouchScreen }) => css`
  position: absolute;
  top: 0;

  width: 120px;
  height: 62px;

  ${isTouchScreen === false && css`
    left: clamp(88px, 40vw - 68px, 104px);
    ${theme.breakpoints.up(topCenterBreakpoint)} {
      left: clamp(118px, 49.7872vw - 96.0848px, 352px);
    }
  `}

  ${isTouchScreen === true && css`
    left: clamp(120px, -45.7504px + 42.5vw, 137px);
    ${theme.breakpoints.up(topCenterBreakpoint)} {
      left: clamp(150px, -65.9152px + 50.2128vw, 386px);
    }
  `}
`);

const CircleDesktop = styled(CircleDesktopIcon, options)<Props>(({ theme, isTouchScreen }) => css`
  position: absolute;
  top: clamp(1px, 1vw - 8px, 4px);

  width: 150px;
  height: 57px;

  ${theme.breakpoints.up(1800)} {
    top: 16px;
  }

  ${isTouchScreen === false && css`
    left: clamp(332px, 49.6667vw - 115px, 481px);
    ${theme.breakpoints.up(1200)} {
      left: clamp(481px, 49.9643vw - 118.5712px, 1880px);
    }
  `}

  ${isTouchScreen === true && css`
    left: clamp(23.125rem, -5rem + 50vw, 120rem);
  `}
`);

export type ViewModesProps = {
  isTouchScreen: boolean;
  text: string;
};

export const ViewModes = ({ isTouchScreen, text }: ViewModesProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Text>{text}</Text>
      <Arrow isTouchScreen={isTouchScreen} />
      {
        isDesktop === true
          ? <CircleDesktop isTouchScreen={isTouchScreen} />
          : <CircleMobile isTouchScreen={isTouchScreen} />
      }
    </>
  );
};
