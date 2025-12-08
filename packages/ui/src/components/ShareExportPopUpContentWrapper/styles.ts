import { styled, Typography } from '@mui/material';
import { IconButton } from '../IconButton';
import { menuHorizontalGutterWidth } from '../../utils/styles';

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 0;
`;

export const Header = styled('div')`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-bottom: 16px;
`;

export const Title = styled(Typography)`
  font-weight: 500;
  font-size: 19px;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: center;
  max-width: 75%;
  overflow-wrap: anywhere;
`;

export const Content = styled('div')`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  right: ${menuHorizontalGutterWidth}px;
`;
