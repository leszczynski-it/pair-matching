import { configureStore } from '@reduxjs/toolkit';
import { PAIR_MATCHING_FEATURE_KEY, pairMatchingReducer } from './pair-matching.slice';

export const store = configureStore({
  reducer: { [PAIR_MATCHING_FEATURE_KEY]: pairMatchingReducer },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
