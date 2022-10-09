import {
  flip, hideWrongSelections,
  pairMatchingActions,
  pairMatchingReducer, PairMatchingState
} from './pair-matching.slice';

describe('pairMatching reducer', () => {
  const getFirstIndex = (state: PairMatchingState) => {
    return state.board.findIndex(card => !card.flipped);
  };

  const findPair = (state: PairMatchingState, initialIndex: number) => {
    return state.board.findIndex((card, index) => {
      return card.emoji === state.board[initialIndex].emoji && index !== initialIndex;
    });
  };

  const findDifferent = (state: PairMatchingState, index: number) => {
    return state.board.findIndex(card => card.emoji !== state.board[index].emoji);
  };

  const getInitialState = () => {
    return pairMatchingReducer(
      undefined,
      pairMatchingActions.reset()
    );
  };

  it('should handle initial state', () => {
    const state = getInitialState();
    expect(state.board.length).toEqual(12);
    expect(state.finished).toBeFalsy();
    expect(state.locked).toBeFalsy();
  });

  describe('reset', () => {
    it('should flip the card', () => {
      let state = getInitialState();
      state = pairMatchingReducer(state, flip(2));
      expect(state.board[2].flipped).toBeTruthy();
    });
  });

  describe('flip', () => {
    it('should flip the card', () => {
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

      const correctIndex = findPair(state, initialIndex);
      state = pairMatchingReducer(state, flip(correctIndex));

      expect(state.board[initialIndex].flipped).toBeTruthy();
      expect(state.board[initialIndex].status).toBe('CORRECT');

      expect(state.board[correctIndex].flipped).toBeTruthy();
      expect(state.board[correctIndex].status).toBe('CORRECT');
    });

    it('should set open state and wrong flag after incorrect selection', () => {
      let state = getInitialState();
      const initialIndex = getFirstIndex(state);
      state = pairMatchingReducer(state, flip(initialIndex));

      const correctIndex = findDifferent(state, initialIndex);
      state = pairMatchingReducer(state, flip(correctIndex));

      expect(state.board[initialIndex].flipped).toBeTruthy();
      expect(state.board[initialIndex].status).toBe('WRONG');

      expect(state.board[correctIndex].flipped).toBeTruthy();
      expect(state.board[correctIndex].status).toBe('WRONG');

      expect(state.locked).toBeTruthy();
    });
  });

  describe('hide wrong selections', () => {
    it('should reset state of cards', () => {
      let state = getInitialState();
      state = pairMatchingReducer(state, flip(0));
      const incorrectCardIndex = findDifferent(state, 0);
      state = pairMatchingReducer(state, flip(incorrectCardIndex));

      expect(state.locked).toBeTruthy();
      expect(state.board.filter(card => !card.flipped).length).toEqual(10);

      state = pairMatchingReducer(state, hideWrongSelections());

      expect(state.locked).toBeFalsy();
      expect(state.board.filter(card => !card.flipped).length).toEqual(12);
    });
  });
});

