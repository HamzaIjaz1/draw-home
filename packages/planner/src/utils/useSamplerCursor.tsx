import { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ColorPickerIcon } from '@draw-house/ui/dist/components/Icons';
import { theme } from '@draw-house/ui/dist/theme';
import { isNull } from '@arthurka/ts-utils';
import { useAppearanceSampler } from '../zustand/useAppearanceSampler';

const CLASS_NAME = '__sampler-cursor-active__';
const STYLE_ID = '__sampler-cursor-style__';
const HOTSPOT = { x: 12, y: 12 };
const FALLBACK = 'crosshair';

const ensureStyleTag = () => {
  let tag = document.getElementById(STYLE_ID);
  if(isNull(tag)) {
    tag = document.createElement('style');
    tag.id = STYLE_ID;
    tag.textContent = `
      .${CLASS_NAME}, .${CLASS_NAME} * {
        cursor: var(--sampler-cursor) !important;
      }
    `;
    document.head.appendChild(tag);
  }

  return tag;
};

const buildCursorUrl = () => {
  const svgEl = (
    <svg width={28} height={28} viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'>
      <ColorPickerIcon color={theme.palette.primary.main} />
    </svg>
  );
  let s = renderToStaticMarkup(svgEl);
  if(!/^\s*<svg[^>]*\sxmlns=/.test(s)) {
    s = s.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  const encoded = encodeURIComponent(s).replace(/'/g, '%27').replace(/"/g, '%22');

  return `data:image/svg+xml;charset=utf-8,${encoded}`;
};

export const useSamplerCursor = () => {
  const isActive = useAppearanceSampler(s => s.isActive);
  const CURSOR_URL = buildCursorUrl();

  useEffect(() => {
    const el = document.body;
    if(isActive === true) {
      ensureStyleTag();
      el.style.setProperty(
        '--sampler-cursor',
        `url("${CURSOR_URL}") ${HOTSPOT.x} ${HOTSPOT.y}, ${FALLBACK}`,
      );
      el.classList.add(CLASS_NAME);

      return () => {
        el.classList.remove(CLASS_NAME);
        el.style.removeProperty('--sampler-cursor');
      };
    }
    el.classList.remove(CLASS_NAME);
    el.style.removeProperty('--sampler-cursor');
  }, [CURSOR_URL, isActive]);
};
