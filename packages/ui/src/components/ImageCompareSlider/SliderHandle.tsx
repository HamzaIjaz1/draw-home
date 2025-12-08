import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  pointer-events: none;
  cursor: ew-resize;
`;

const Separator = styled('div')(({ theme }) => css`
  width: 2px;
  height: 100%;
  background-color: ${theme.palette.primary.main};
  pointer-events: auto;
`);

const Handle = styled('div')(({ theme }) => css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;
  background-color: ${theme.palette.primary.main};
  border-radius: 50%;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  pointer-events: auto;
`);

const ArrowIcon = () => (
  <svg width='20' height='8' viewBox='0 0 20 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M16.03 5.03H3.97v2.91L0 3.97 3.97 0v2.912h12.06V0L20 3.97l-3.97 3.972V5.029Z' fill='#fff' />
  </svg>
);

export const SliderHandle = ({ className }: WithClassName) => (
  <Container className={className}>
    <Separator />
    <Handle>
      <ArrowIcon />
    </Handle>
  </Container>
);
