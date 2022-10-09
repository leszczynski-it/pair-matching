import { Card } from './card';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from './hooks';
import { flip, hideWrongSelections } from './pair-matching.slice';
import { useCallback, useEffect } from 'react';

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  grid-template-rows: repeat(3, 1fr);
`;

export function Board() {
  const { board, locked } = useAppSelector((state) => state.pairMatching);
  const dispatch = useAppDispatch();

  const flipCard = useCallback((index: number) => {
    dispatch(flip(index));
  }, [dispatch]);

  useEffect(() => {
    if (locked) {
      setTimeout(() => {
        dispatch(hideWrongSelections());
      }, 800);
    }
  }, [locked, dispatch]);

  return (
    <StyledBoard>
      {board.map((item, index) => (
        <Card key={index}
              onClick={() => flipCard(index)}
              emoji={item.emoji}
              flipped={item.flipped}
              status={item.status} />
      ))}
    </StyledBoard>
  );
}
