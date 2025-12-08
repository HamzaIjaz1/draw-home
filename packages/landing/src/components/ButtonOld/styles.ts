'use client';

import { styled } from 'styled-components';
import { primaryColor } from '../../commonStyles';

const textColorMain = 'rgb(39, 42, 52)';
const primaryColorHover = 'rgba(253, 68, 49, 1)';

export const DefaultButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  border-radius: 5px;
  border-radius: 1.5rem;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);
  }
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 5px;
`;

export const IconWithCounter = styled.div`
  position: relative;
`;

export const Counter = styled.span`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  color: white;
  background-color: ${primaryColor};
  position: absolute;
  bottom: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PrimaryButton = styled(DefaultButton)`
  padding: 15px 30px;
  background-color: ${primaryColor};
  color: white;
  border-radius: 1.5rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${primaryColorHover};
  }
`;

export const BlackButton = styled(DefaultButton)`
  padding: 15px 30px;
  border: 1px solid ${textColorMain};
  color: ${textColorMain};
  border-radius: 1.5rem;
  transition: background-color 0.3s, opacity 0.3s;
  &:hover {
    opacity: 0.7;
    background-color: white;
  }
`;

export const OutlinedButton = styled(DefaultButton)`
  padding: 15px 30px;
  border: 1px solid ${primaryColor};
  color: ${primaryColor};
  border-radius: 1.5rem;
  transition: background-color 0.3s, opacity 0.3s;
  &:hover {
    opacity: 0.7;
    background-color: white;
  }
`;

export const CardWithIconButton = styled(DefaultButton)`
  border-radius: 50%;
  box-shadow: 0 0px 4px 0px gray;
  svg {
    width: 28px;
    min-width: 28px;
    height: 28px;
  }
`;
