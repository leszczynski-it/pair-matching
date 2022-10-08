import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { emojiList } from './const';
import _ from 'lodash';

export const PAIR_MATCHING_FEATURE_KEY = 'pairMatching';

function shuffleBoard(size: number) {
  const shuffledItems = _.shuffle(emojiList).slice(0, size / 2);
  const shuffledBoard = _.shuffle([...shuffledItems, ...shuffledItems]);
  return shuffledBoard.map(item => ({emoji: item, flipped: false}));
}

export interface CardState {
  emoji: string;
  flipped: boolean;
  status?: 'CORRECT' | 'WRONG';
}

export interface PairMatchingState  {
  width: number;
  height: number;

  finished: boolean;

  selected: number | null;

  board: CardState[];
}

export const initialPairMatchingState: PairMatchingState = {
  width: 3,
  height: 4,
  selected: null,
  finished: false,
  board: shuffleBoard(12)
}

export const pairMatchingSlice = createSlice({
  name: PAIR_MATCHING_FEATURE_KEY,
  initialState: initialPairMatchingState,
  reducers: {
    reset: (state) => {
      state.board = shuffleBoard(state.width * state.height);
      state.selected = null;
      state.finished = false;
    },
    hideWrongSelections: (state) => {
      state.board.forEach(card => {
        if (card.status !== 'CORRECT') {
          card.flipped = false;
          delete card.status;
        }
      });
      state.selected = null;
    },
    flip: (state, {payload}: PayloadAction<number>) => {
      const previousSelection = state.selected;
      const latestSelection = payload;

      if (previousSelection === latestSelection) {
        return;
      }

      state.board[latestSelection].flipped = true;
      if (previousSelection === null) {
        state.selected = latestSelection;
      } else {
        const status = state.board[latestSelection].emoji === state.board[previousSelection].emoji ? 'CORRECT' : 'WRONG';

        state.board[latestSelection].status = status;
        state.board[previousSelection].status = status;

        state.selected = null;
        state.finished = state.board.every(item => item.flipped);
      }
    }
  },
});

export const pairMatchingReducer = pairMatchingSlice.reducer;

export const pairMatchingActions = pairMatchingSlice.actions;

export const { reset, flip, hideWrongSelections } = pairMatchingSlice.actions;

