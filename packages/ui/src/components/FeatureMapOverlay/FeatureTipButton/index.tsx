import { css, styled, useMediaQuery, useTheme } from '@mui/material';
import { ArrowDesktopIcon, ArrowMobileIcon } from './icons';
import { textStyles } from '../styles';

const Text = styled('span')(({ theme }) => css`
  ${textStyles(theme)}

  position: absolute;
  bottom: 86px;
  right: 118px;
  width: 170px;

  ${theme.breakpoints.up('md')} {
    bottom: 60px;
    right: 175px;
    width: 260px;
  }
  ${theme.breakpoints.up(1800)} {
    right: 190px;
  }
`);

const ArrowMobile = styled(ArrowMobileIcon)`
  position: absolute;
  bottom: 52px;
  right: 30px;
`;

const ArrowDesktop = styled(ArrowDesktopIcon)(({ theme }) => css`
  position: absolute;
  bottom: 52px;
  right: 50px;
  ${theme.breakpoints.up(1800)} {
    bottom: 65px;
    right: 65px;
  }
`);

export type FeatureTipButtonProps = {
  text: string;
};

export const FeatureTipButton = ({ text }: FeatureTipButtonProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Text>{text}</Text>
      {isDesktop === true ? <ArrowDesktop /> : <ArrowMobile />}
    </>
  );
};
