import { clamp, WithClassName } from '@draw-house/common/dist/utils';
import { getNotUndefined, isNull, isUndefined, Union } from '@arthurka/ts-utils';
import { useTheme } from '@mui/material';
import { useLayoutEffect, useRef, useState } from 'react';
import assert from 'assert';
import { Anchor, Container, ExpandableItemsContainer } from './styles';
import { ToolbarButton } from '../IconButton/variants';

const AnimatedExpandableItemsContainer = ({ expand, children }: {
  expand: boolean;
  children: React.ReactElement;
}) => {
  const animation = (
    expand === true
      ? {
        height: 'auto',
        opacity: 1,
        visibility: 'visible',
      } as const
      : {
        height: 0,
        opacity: 0,
        visibility: 'hidden',
      } as const
  );

  return (
    <ExpandableItemsContainer
      initial={animation}
      animate={animation}
    >
      {children}
    </ExpandableItemsContainer>
  );
};

type Items = JSX.Element;

export type PopUpToolbarProps = Union<
  & { items: Items }
  & (
    | { orientation?: 'horizontal' }
    | (
      & { orientation: 'vertical' }
      & (
        | {}
        | {
          expandableItems: Items;
          defaultCollapsed?: boolean;
        }
      )
    )
  )
  & (
    | {
      mode?: 'floating';
      x: number;
      y: number;
    }
    | {
      mode: 'static';
    }
  )
>;

const toolbarCellWidth = 38;
const toolbarRowHeight = 40;
const toolbarScreenSafeZoneOffset = 50;

export const PopUpToolbar = ({
  className,
  items,
  expandableItems,
  defaultCollapsed = false,
  mode = 'floating',
  x: _x = 0,
  y: _y = 0,
  orientation = 'horizontal',
}: PopUpToolbarProps & WithClassName) => {
  const theme = useTheme();
  const [expand, setExpand] = useState(defaultCollapsed === false);
  const [toolbarItemsAmount, setToolbarItemsAmount] = useState(0);

  const [moveXY, setMoveXY] = useState<{ x: number; y: number } | null>(null);
  const [moveOffset, setMoveOffset] = useState<{ offsetX: number; offsetY: number } >({ offsetX: 0, offsetY: 0 });

  const itemsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    assert(!isNull(itemsContainerRef.current), 'This should never happen. |ld2t3i|');

    setToolbarItemsAmount(itemsContainerRef.current.childNodes.length);
  }, [items]);

  const safeZoneWidth = window.innerWidth - toolbarScreenSafeZoneOffset - toolbarItemsAmount * toolbarCellWidth;
  const x = clamp(0, !isNull(moveXY) ? moveXY.x : _x, safeZoneWidth);
  const y = clamp(
    toolbarScreenSafeZoneOffset,
    !isNull(moveXY) ? moveXY.y : _y - toolbarRowHeight,
    window.innerHeight - toolbarScreenSafeZoneOffset - toolbarRowHeight,
  );
  const maxWidth = (
    mode === 'floating' && safeZoneWidth < 0
      ? (toolbarItemsAmount - Math.ceil(-safeZoneWidth / toolbarCellWidth)) * toolbarCellWidth
      : null
  );

  const toolbarJSX = (
    <Container
      ref={itemsContainerRef}
      className={mode === 'static' ? className : undefined}
      mode={mode}
      orientation={orientation}
      sx={{
        ...isNull(maxWidth) ? {} : { maxWidth },
      }}
    >
      {items}
      {
        !isUndefined(expandableItems) && (
          <>
            <ToolbarButton
              icon='downArrow'
              rotate={expand === true ? -180 : 0}
              transitionDurationMs={200}
              iconColors={{
                default: theme.palette.text.disabled,
              }}
              onClick={() => {
                setExpand(!expand);
              }}
            />
            <AnimatedExpandableItemsContainer expand={expand}>
              {expandableItems}
            </AnimatedExpandableItemsContainer>
          </>
        )
      }
    </Container>
  );

  return mode === 'static' ? toolbarJSX : (
    <Anchor
      className={className}
      draggable
      onDragStart={e => {
        const rect = e.currentTarget.getBoundingClientRect();

        setMoveOffset({
          offsetX: e.clientX - rect.left,
          offsetY: e.clientY - rect.top,
        });
      }}
      onDragEnd={e => {
        setMoveXY({
          x: e.clientX - moveOffset.offsetX,
          y: e.clientY - moveOffset.offsetY,
        });
      }}
      onTouchStart={e => {
        const touch = getNotUndefined(e.touches[0], 'This should never happen. |wg477u|');
        const rect = e.currentTarget.getBoundingClientRect();

        setMoveOffset({
          offsetX: touch.clientX - rect.left,
          offsetY: touch.clientY - rect.top,
        });
      }}
      onTouchMove={e => {
        const touch = getNotUndefined(e.touches[0], 'This should never happen. |5mmz9m|');

        setMoveXY({
          x: touch.clientX - moveOffset.offsetX,
          y: touch.clientY - moveOffset.offsetY,
        });
      }}
      style={{
        left: x,
        top: y,
      }}
    >
      {toolbarJSX}
    </Anchor>
  );
};
