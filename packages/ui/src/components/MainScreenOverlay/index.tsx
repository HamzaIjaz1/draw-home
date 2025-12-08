import { isNull } from '@arthurka/ts-utils';
import { topRightComponentId } from '@draw-house/common/dist/constants';
import { BottomCenter, BottomCenterPriority, BottomLeft, BottomRight, TopCenter, TopLeft, TopRight } from './styles';

export { IconMenuContainer, FloatingMenuContainer } from './styles';

type Element = React.ReactElement | null;

export type MainScreenOverlayProps = {
  topLeft: Element;
  topCenter: Element;
  topRight: Element;
  bottomLeft: Element;
  bottomCenter: Element;
  bottomCenterPriority: Element;
  bottomRight: Element;
};

export const MainScreenOverlay = ({
  topLeft,
  topCenter,
  topRight,
  bottomLeft,
  bottomCenter,
  bottomCenterPriority,
  bottomRight,
}: MainScreenOverlayProps) => (
  <>
    <TopLeft>{topLeft}</TopLeft>
    <TopCenter>{topCenter}</TopCenter>
    <TopRight id={topRightComponentId}>{topRight}</TopRight>

    <BottomLeft hide={!isNull(bottomCenterPriority)}>{bottomLeft}</BottomLeft>
    <BottomCenter hide={!isNull(bottomCenterPriority)}>{bottomCenter}</BottomCenter>
    <BottomRight hide={!isNull(bottomCenterPriority)}>{bottomRight}</BottomRight>

    <BottomCenterPriority>{bottomCenterPriority}</BottomCenterPriority>
  </>
);
