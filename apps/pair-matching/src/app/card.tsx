import styled from 'styled-components';

const StyledCard = styled.div`
  // Your style here
`;

export function Card(props: {emoji: string, flipped: boolean}) {
  return (
    <StyledCard>
      {!props.flipped ? <span role='img' aria-labelledby='Cover'>❓</span> : <span role='img' aria-labelledby='Image'>{props.emoji}</span>}
    </StyledCard>
  );
}
