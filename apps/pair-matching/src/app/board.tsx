import { Card } from './card';
import styled from 'styled-components';
import { emojiList } from './const';
import { shuffle } from 'lodash'

const StyledBoard = styled.div`
  .wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
    grid-template-rows: repeat(3, 1fr);
  }
`;

export function Board() {
  const map = shuffle(emojiList);

  return (
    <StyledBoard>
      <div className={'wrapper'}>
        {map.map((item, index) => (<Card key={index} emoji={item} flipped={true} />))}
      </div>
    </StyledBoard>
  );
}
