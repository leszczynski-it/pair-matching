import { reset } from './pair-matching.slice';
import { useAppDispatch, useAppSelector } from './hooks';
import styled from 'styled-components';

const StyledSplashScreen = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: none;

  &.visible {
    display: block;
    background-color: rgba(10, 10, 10, 20%);
  }

  button {
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    height: 50px;
  }
`;

export function SplashScreen() {
  const finished = useAppSelector((state) => state.pairMatching.finished);
  const dispatch = useAppDispatch();

  return (
    <StyledSplashScreen className={`${finished ? 'visible' : ''}`}>
      <div><button onClick={() => dispatch(reset())}>START A NEW GAME</button></div>
    </StyledSplashScreen>
  );
}
