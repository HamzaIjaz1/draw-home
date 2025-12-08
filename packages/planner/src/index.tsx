import '@draw-house/common/dist/polyfills';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { getNotNull } from '@arthurka/ts-utils';
import { App } from './App';

import './styles.css';

const rootElement = getNotNull(document.getElementById('root'), 'Something went wrong. |t7tl4k|');

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
