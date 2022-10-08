import { render } from '@testing-library/react';

import { Card } from './card';

describe('Card', () => {
  it('should have default cover', () => {
    const { getByText } = render(<Card flipped={false} emoji={'🧙'} />);

    expect(getByText(/❓/)).toBeTruthy();
  });

  it('should have selected emoji', () => {
    const { getByText } = render(<Card flipped={true} emoji={'🧙'} />);

    expect(getByText(/🧙/)).toBeTruthy();
  });
});
