"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoaderStyles = void 0;
const react_1 = require("@emotion/react");
const makeLoaderStyles = (pseudoElement, isLoading, color) => (0, react_1.css) `
  ${pseudoElement} {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    top: 4px;
    left: 4px;
    border-radius: 50%;
    background-color: ${color};
    opacity: 0;
    transform: scale(1);
  }

  ${isLoading === true && (0, react_1.css) `
    ${pseudoElement} {
      transition: opacity 0.4s ease-in-out;
      opacity: 1;
      animation: pulse 1.5s infinite ease-in-out;
    }
  `}

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
  }
`;
exports.makeLoaderStyles = makeLoaderStyles;
//# sourceMappingURL=makeLoaderStyles.js.map