import '@draw-house/common/dist/polyfills';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import assert from 'assert';
import { isNull } from '@arthurka/ts-utils';
import { App } from './App';

const rootElement = document.getElementById('root');

assert(!isNull(rootElement), 'Something went wrong. |mre2a9|');

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
