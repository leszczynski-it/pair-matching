import styled from 'styled-components';
import { cover } from './const';

const StyledCard = styled.div`
  font-size: 6rem;
  padding: 3rem;
  border: 1px solid silver;
  border-radius: 5px;
  display: inline-block;
  margin: 3rem auto;
`;

export function Card(props: {emoji: string, flipped: boolean}) {
  return (
    <StyledCard>
      {!props.flipped ? <span role='img' aria-labelledby='Cover'>{cover}</span> : <span role='img' aria-labelledby='Image'>{props.emoji}</span>}
    </StyledCard>
  );
}
