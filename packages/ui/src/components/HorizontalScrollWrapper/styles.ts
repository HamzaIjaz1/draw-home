import { css, styled } from '@mui/material';
import { $Props, $props } from '../../utils/$props';

export const Container = styled('div', $props())<$Props<{
  $showScrollbar: boolean;
}>>(({ $showScrollbar }) => css`
  position: relative;
  width: 100%;

  ${$showScrollbar === true && css`
    padding-bottom: 6px;
  `}
`);

export const Content = styled('div')`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrollbarTrack = styled('div')`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background-color: #f0f0f0;
`;

export const ScrollbarThumb = styled('div')`
  height: 100%;
  background-color: #BEBEBE;
  border-radius: 10px;
  opacity: 0.9;

  &:hover {
    background-color: #9b9b9b;
    opacity: 1;
  }
`;

export const ScrollButton = styled('button', $props())<$Props<{
  $position: 'left' | 'right';
}>>(({ theme, $position }) => css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${$position === 'left' ? 'left: 0;' : 'right: 0;'}
  
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  opacity: 0.5;
  transition: opacity 0.2s, background-color 0.2s, box-shadow 0.2s;

  &:hover {
    opacity: 1;
    background: #e8e8e8;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

    svg path {
      stroke: #ff5b4a;
    }
  }

  &:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 16px;
    height: 16px;
    transition: all 0.2s;
  }
`);
