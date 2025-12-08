"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevationText = exports.Triangle = exports.PillText = exports.Pill = exports.RailLine = exports.Overlay = void 0;
const material_1 = require("@mui/material");
const OVERLAY_Z = 2;
const LINE_HEIGHT = 1;
exports.Overlay = (0, material_1.styled)('div')(({ $visible, $rightPad }) => (0, material_1.css) `
  position: fixed;
  inset: 0;
  pointer-events: none;
  display: ${$visible === true ? 'block' : 'none'};
  right: ${$rightPad}px;
  left: 0;
  z-index: ${OVERLAY_Z};
`);
exports.RailLine = (0, material_1.styled)('div')(({ $y, $x1, $x2 }) => {
    const dpr = window.devicePixelRatio;
    const snap = (e) => Math.round(e * dpr) / dpr;
    const top = snap(Math.round($y)) - 1;
    const left = snap(Math.min($x1, $x2));
    const width = snap(Math.max(0, Math.abs($x2 - $x1)));
    const color = '#9aa0a6';
    return (0, material_1.css) `
    position: absolute;
    top: ${top}px;
    left: ${left}px;
    width: ${width}px;
    height: ${LINE_HEIGHT}px;
    pointer-events: none;
    background-color: ${color};
    will-change: transform;
  `;
});
exports.Pill = (0, material_1.styled)('div')(({ $y, $x }) => (0, material_1.css) `
  position: absolute;
  top: ${$y}px;
  left: ${$x - 66}px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 66px;
  height: 20px;
  padding: 3px 6px;
  gap: 4px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.1);
  transform: matrix(1, 0, -0.5, 0.9, 0, 0);
  pointer-events: auto;
  user-select: none;
`);
exports.PillText = (0, material_1.styled)('div')(() => (0, material_1.css) `
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 14px;
  max-width: 100px;
  color: #19172c;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`);
exports.Triangle = (0, material_1.styled)('div')(({ $active }) => (0, material_1.css) `
  position: relative;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 7px solid ${$active === true ? '#fd5631' : '#31bcfd'};
  margin-top: 2px;
  transform: none;
`);
exports.ElevationText = (0, material_1.styled)('div')(({ $y, $x }) => (0, material_1.css) `
  position: absolute;
  top: ${$y}px;
  left: ${$x - 33}px;
  transform: matrix(1, 0, -0.5, 0.9, 0, 0) translate(-50%, 0);
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 15px;
  color: #19172c;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0.9;
`);
//# sourceMappingURL=styles.js.map