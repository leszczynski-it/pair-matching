import {
  flip, hideWrongSelections,
  pairMatchingActions,
  pairMatchingReducer, PairMatchingState
} from './pair-matching.slice';

import { store } from './store';

describe('pairMatching reducer', () => {
  const getFirstIndex = (state: PairMatchingState) => {
    return state.board.findIndex(card => !card.flipped);
  }

  const findNextPairIndex = (state: PairMatchingState, initialIndex: number) => {
    return state.board.findIndex((card, index) => {
      return card.emoji === state.board[initialIndex].emoji && index !== initialIndex;
    });
  }

  const findDifferentCard = (state: PairMatchingState, index: number) => {
    return state.board.findIndex(card => card.emoji !== state.board[index].emoji);
  }

  const getInitialState = () => {
    return pairMatchingReducer(
      undefined,
      pairMatchingActions.reset()
    );
  };

  it('should handle initial state', () => {
    const state = store.getState().pairMatching;

    expect(state.board.length).toEqual(12);
  });

  it('should handle fetchPairMatchings', () => {
    const state = pairMatchingReducer(
      undefined,
      pairMatchingActions.reset()
    );

    expect(state.board.length).toEqual(12);
  });

  it('should handle flip', () => {
    let state = getInitialState();

    state = pairMatchingReducer(state, flip(2));
    expect(state.board[2].flipped).toBeTruthy();
  });

  it('should not allow to flip same element again', () => {
    let state = getInitialState();
    state = pairMatchingReducer(state, flip(2));
    state = pairMatchingReducer(state, flip(2));
    expect(state.board[2].flipped).toBeTruthy();
  });

  it('should set finished state after revealing all pairs', () => {
    let state = getInitialState();
    for (let i = 0; i < state.board.length; i++) {
      state = pairMatchingReducer(state, flip(i));
    }
    expect(state.finished).toBeTruthy();
  });

  it('should flip back after incorrect selection', () => {
    let state = getInitialState();
    state = pairMatchingReducer(state, flip(0));

    const incorrectIndex = state.board.findIndex(card => card.emoji !== state.board[0].emoji);
    state = pairMatchingReducer(state, flip(incorrectIndex));

    expect(state.board.every(card => card.flipped)).toBeFalsy();
  });

  it('should set open state after right selection', () => {
    let state = getInitialState();
    const initialIndex = getFirstIndex(state);
    state = pairMatchingReducer(state, flip(initialIndex));

    const correctIndex = findNextPairIndex(state, initialIndex);
    state = pairMatchingReducer(state, flip(correctIndex));

    expect(state.board[initialIndex].flipped).toBeTruthy();
    expect(state.board[initialIndex].status).toBe('CORRECT');

    expect(state.board[correctIndex].flipped).toBeTruthy();
    expect(state.board[correctIndex].status).toBe('CORRECT');
  });

  describe('hide wrong selections', () => {
    it('should reset state of cards', () => {
      let state = getInitialState();
      state = pairMatchingReducer(state, flip(0));
      const incorrectCardIndex = findDifferentCard(state, 0);
      state = pairMatchingReducer(state, flip(incorrectCardIndex));

      state = pairMatchingReducer(state, hideWrongSelections());
      expect(state.board.every(card => !card.flipped)).toBeTruthy();
    });

    it('should reset state of cards keeping correct one', () => {
      let state = getInitialState();
      state = pairMatchingReducer(state, flip(0));
      const incorrectCardIndex = findDifferentCard(state, 0);
      state = pairMatchingReducer(state, flip(incorrectCardIndex));

      state = pairMatchingReducer(state, hideWrongSelections());
      expect(state.board.every(card => !card.flipped)).toBeTruthy();
    });
  });
});

