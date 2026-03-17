/**
 * Screen component matching Figma design:
 * File: Draw-House-Sid-Proptotypes (W2nErmlGeDHUzkWgDYHv8A)
 * Node: 21963-71468
 *
 * Implemented with MUI styled components and theme to align with the UI package.
 * When Figma MCP has access to the file, run get_design_context and get_screenshot
 * to fill in pixel-perfect layout, typography, and colors in ./styles.ts.
 */
import { WithClassName } from '@draw-house/common/dist/utils';
import { Root, Title, Content } from './styles';

export type DrawHouseFigmaScreenProps = {
  title?: string;
  children?: React.ReactNode;
};

export const DrawHouseFigmaScreen = ({
  className,
  title,
  children,
}: DrawHouseFigmaScreenProps & WithClassName) => (
  <Root className={className}>
    {title !== undefined && <Title>{title}</Title>}
    <Content>{children}</Content>
  </Root>
);
