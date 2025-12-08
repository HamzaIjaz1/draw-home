import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';

const Container = styled('div')`
  position: relative;
  display: inline-block;
`;

const commonFrameCss = css`
  border: 1px solid #999;
  border-radius: 6px;
  background: #fff;
`;

const FrontFrame = styled('div')`
  ${commonFrameCss}
  padding: 6px 7px;
  min-width: 26px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: 1;
`;

const BackFrame = styled('div')`
  ${commonFrameCss}
  position: absolute;
  top: 5px;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
`;

const Label = styled('span')(({ theme }) => css`
  font-size: 13px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0px;
  color: ${theme.palette.primary.main};
  user-select: none;
`);

export type HotkeyLegendProps = {
  label: string;
};

export const HotkeyLegend = ({ className, label }: HotkeyLegendProps & WithClassName) => (
  <Container className={className}>
    <BackFrame />

    <FrontFrame>
      <Label>{label}</Label>
    </FrontFrame>
  </Container>
);
