import styled from 'styled-components';
import { Board } from './board';

const StyledGame = styled.div`
  h1 {
    text-align: center;
  }
`;

export function Game() {
  return (<StyledGame>
    <h1>Pair Matching</h1>
    <Board />
  </StyledGame>);
}
