import { css } from '@emotion/react';

export const makeLoaderStyles = (pseudoElement: '::before' | '::after', isLoading: boolean, color: string) => css`
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

  ${isLoading === true && css`
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
