import { css, styled } from '@mui/material';
import { menuRowPadding } from '../../utils/styles';
import { BaseButton } from '../BaseButton';
import { createStyledOptions } from '../../utils/createStyledOptions';

export const Container = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 6px;
  ${menuRowPadding()}
  padding-bottom: 6px;
`;


type ButtonProps = {
  state: 'default' | 'active' | 'disabled';
};
const ButtonOptions = createStyledOptions<ButtonProps>({
  state: true,
});

export const IconButton = styled(BaseButton, ButtonOptions)<ButtonProps>(({ theme, state }) => css`
  min-width: 36px;
  min-height: 36px;
  border-radius: 6px;
  background: none;
  box-shadow: none;
  border: 1px solid transparent;
  padding: 0;
  transition: border-color 0.15s ease, background-color 0.15s ease;

  &:hover {
    background-color: #f4f4f5;
  }

  ${state === 'active' && css`
    border: 1px solid #d7d7d7;
    && {
      background-color: #efecf3;
    }
  `}

  ${state === 'disabled' && css`
    filter: grayscale(100%);
  `}
`);

export const WithText = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Text = styled('span')(({ theme }) => css`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: ${theme.palette.text.secondary};
`);
