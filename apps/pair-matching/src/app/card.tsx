import styled from 'styled-components';
import { cover } from './const';

const StyledCard = styled.div`
  font-size: 4rem;
  padding: 2rem;
  border: 1px solid silver;
  border-radius: 5px;
  display: inline-block;
  margin: 1rem auto;
  cursor: pointer;

  &.CORRECT {
    background-color: rgba(0, 128, 0, 20%);
  }

  &.WRONG {
    background-color: rgba(255, 0, 0, 20%);
  }
`;

export function Card(props: { emoji: string, flipped: boolean, status?: 'CORRECT' | 'WRONG', onClick?: () => void }) {
  return (
    <StyledCard className={props.status} onClick={props.onClick}>
      {!props.flipped ? <span role='img' aria-labelledby='Cover'>{cover}</span> :
        <span role='img' aria-labelledby='Image'>{props.emoji}</span>}
    </StyledCard>
  );
}
