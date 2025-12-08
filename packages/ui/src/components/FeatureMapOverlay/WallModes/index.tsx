import { css, styled, useMediaQuery, useTheme } from '@mui/material';
import { ArrowDesktopIcon, ArrowMobileIcon, CircleDesktopIcon, CircleMobileIcon } from './icons';
import { textStyles } from '../styles';
import { createStyledOptions } from '../../../utils/createStyledOptions';

type Props = {
  isTouchScreen: boolean;
};
const options = createStyledOptions<Props>({
  isTouchScreen: true,
});

const Text = styled('span', options)<Props>(({ theme, isTouchScreen }) => css`
  ${textStyles(theme)}

  position: absolute;
  top: 302px;
  right: 155px;
  width: 172px;

  ${theme.breakpoints.up('md')} {
    top: 82px;
    right: 210px;
    width: 340px;
  }
  ${theme.breakpoints.up(1800)} {
    top: 90px;
    right: 220px;
  }

  ${isTouchScreen === true && css`
    top: 280px;
  `}
`);

const ArrowMobile = styled(ArrowMobileIcon, options)<Props>(({ isTouchScreen }) => css`
  position: absolute;
  top: 185px;
  right: 50px;

  ${isTouchScreen === true && css`
    top: 175px;
    height: 118px;
  `}
`);

const ArrowDesktop = styled(ArrowDesktopIcon)(({ theme }) => css`
  position: absolute;
  top: 70px;
  right: 70px;

  ${theme.breakpoints.up(1800)} {
    top: 83px;
    right: 78px;
  }
`);

const CircleMobile = styled(CircleMobileIcon)`
  position: absolute;
  top: 66px;
  right: -6px;
`;

const CircleDesktop = styled(CircleDesktopIcon)(({ theme }) => css`
  position: absolute;
  top: 97px;
  right: -3px;

  ${theme.breakpoints.up(1800)} {
    top: 112px;
    right: 7px;
  }
`);

export type WallModesProps = {
  isTouchScreen: boolean;
  text: string;
};

export const WallModes = ({ isTouchScreen, text }: WallModesProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Text isTouchScreen={isTouchScreen}>{text}</Text>
      {
        isDesktop === true
          ? (
            <>
              <ArrowDesktop />
              <CircleDesktop />
            </>
          )
          : (
            <>
              <ArrowMobile isTouchScreen={isTouchScreen} />
              <CircleMobile />
            </>
          )
      }
    </>
  );
};
