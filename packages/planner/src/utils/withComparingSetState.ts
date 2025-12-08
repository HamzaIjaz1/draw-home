import { StoreApi, UseBoundStore } from 'zustand';
import assert from 'assert';
import { extendedJSON } from './safeJSONParse';

export const withComparingSetState = (e: UseBoundStore<StoreApi<object>>) => {
  const setState = e.setState;

  e.setState = newState => {
    // Note: for make sure there is no function from before type mutation
    assert(typeof newState !== 'function', 'Something went wrong. |za7zl4|');

    const state = e.getState();

    if(extendedJSON.stringify({ ...state, ...newState }) !== extendedJSON.stringify(state)) {
      setState(newState);
    }
  };
};
