import { css, styled } from '@mui/material';
import { BracketIcon } from './icons';
import { textStyles } from '../styles';
import { createStyledOptions } from '../../../utils/createStyledOptions';

const Text = styled('span')(({ theme }) => css`
  ${textStyles(theme)}

  position: absolute;
  top: 178px;
  right: 150px;
  width: 210px;

  ${theme.breakpoints.up('md')} {
    top: 195px;
    right: 160px;
    width: 280px;
  }
  ${theme.breakpoints.up(1800)} {
    top: 205px;
    right: 170px;
  }
`);

type Props = {
  isTouchScreen: boolean;
};
const options = createStyledOptions<Props>({
  isTouchScreen: true,
});

const Bracket = styled(BracketIcon, options)<Props>(({ theme, isTouchScreen }) => css`
  position: absolute;
  top: 82px;
  right: 110px;

  ${theme.breakpoints.up('md')} {
    top: 115px;
    right: 125px;
  }

  ${theme.breakpoints.up(1800)} {
    top: 127px;
    right: 135px;
  }

  ${isTouchScreen === true && css`
    height: 185px;
  `}
`);

export type DrawToolsProps = {
  isTouchScreen: boolean;
  text: string;
};

export const DrawTools = ({ isTouchScreen, text }: DrawToolsProps) => (
  <>
    <Text>{text}</Text>
    <Bracket isTouchScreen={isTouchScreen} />
  </>
);
