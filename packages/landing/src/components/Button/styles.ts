'use client';

import { css, styled } from 'styled-components';
import { breakpointMd, primaryColor } from '../../commonStyles';
import type { ButtonProps } from '.';
import { SofiaPro } from '../../fonts';

type BaseButtonProsp = {
  $variant: ButtonProps['variant'];
};

const darkColor = '#222733';

const secondaryCommonStyles = css`
  height: 48px;
  padding: 16px 30px;

  font-weight: 600;
  font-size: 15px;
  line-height: 1em;
  vertical-align: middle;

  @media (min-width: ${breakpointMd}) {
    font-size: 16px;
    line-height: 1em;
  }
`;

export const BaseButton = styled.button<BaseButtonProsp>(({ $variant }) => css`
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-width: fit-content;
  box-sizing: border-box;
  border-radius: 100px;

  font-family: ${SofiaPro};

  ${$variant === 'primary' && css`
    height: 52px;
    padding: 14px 26px;
    background-color: ${primaryColor};
    box-shadow: 0px 9px 20px 0px #ff84774d;

    font-weight: 600;
    font-size: 15px;
    line-height: 1em;
    vertical-align: middle;
    color: #fff;

    @media (min-width: ${breakpointMd}) {
      height: 56px;
      padding: 16px 34px;

      font-weight: 600;
      font-size: 17px;
    }
  `}

  ${$variant === 'secondary-contained' && css`
    ${secondaryCommonStyles}
    background-color: ${darkColor};
    color: #fff;
  `}

  ${$variant === 'secondary-outlined' && css`
    ${secondaryCommonStyles}
    border: 1.5px solid ${darkColor};
    background-color: transparent;
    color: ${darkColor};
  `}

  &:hover {
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.994);
  }
`);
