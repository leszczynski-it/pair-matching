import styled from 'styled-components';
import { Board } from './board';
import { SplashScreen } from './splash-screen';

const StyledGame = styled.div`
  h1 {
    text-align: center;
  }
`;

export function Game() {
  return (<StyledGame>
    <h1>Pair Matching</h1>
    <Board />
    <SplashScreen />
  </StyledGame>);
}
