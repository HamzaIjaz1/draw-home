import { css, styled } from '@mui/material';
import { BracketIcon } from './icons';
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
  right: 150px;
  width: 205px;

  ${theme.breakpoints.up('md')} {
    right: 170px;
    width: 345px;
  }
  ${theme.breakpoints.up(1800)} {
    right: 180px;
  }

  ${isTouchScreen === false && css`
    top: 378px;
    ${theme.breakpoints.up('md')} {
      top: 400px;
    }
    ${theme.breakpoints.up(1800)} {
      top: 415px;
    }
  `}

  ${isTouchScreen === true && css`
    top: 350px;
    ${theme.breakpoints.up('md')} {
      top: 370px;
    }
    ${theme.breakpoints.up(1800)} {
      top: 385px;
    }
  `}
`);

const Bracket = styled(BracketIcon, options)<Props>(({ theme, isTouchScreen }) => css`
  position: absolute;
  right: 111px;

  ${theme.breakpoints.up('md')} {
    right: 125px;
  }

  ${theme.breakpoints.up(1800)} {
    right: 135px;
  }

  ${isTouchScreen === false && css`
    top: 325px;
    ${theme.breakpoints.up('md')} {
      top: 360px;
    }
    ${theme.breakpoints.up(1800)} {
      top: 376px;
    }
  `}

  ${isTouchScreen === true && css`
    top: 292px;
    ${theme.breakpoints.up('md')} {
      top: 325px;
    }
    ${theme.breakpoints.up(1800)} {
      top: 340px;
    }
  `}
`);

export type AutoGenerationToolsProps = {
  isTouchScreen: boolean;
  text: string;
};

export const AutoGenerationTools = ({ isTouchScreen, text }: AutoGenerationToolsProps) => (
  <>
    <Text isTouchScreen={isTouchScreen}>{text}</Text>
    <Bracket isTouchScreen={isTouchScreen} />
  </>
);
