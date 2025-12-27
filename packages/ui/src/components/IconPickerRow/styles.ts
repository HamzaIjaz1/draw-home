import { css, styled } from '@mui/material';
import { menuRowPadding } from '../../utils/styles';
import { BaseButton } from '../BaseButton';
import { createStyledOptions } from '../../utils/createStyledOptions';

export const Container = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 10px;
  ${menuRowPadding()}
  padding-bottom: 8px;
`;


type ButtonProps = {
  state: 'default' | 'active' | 'disabled';
};
const ButtonOptions = createStyledOptions<ButtonProps>({
  state: true,
});

export const IconButton = styled(BaseButton, ButtonOptions)<ButtonProps>(({ theme, state }) => css`
  min-width: 48px;
  min-height: 48px;
  border-radius: 8px;
  background: none;
  box-shadow: none;
  border: 1px solid ${theme.palette.background.paper};
  padding: 0;

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
