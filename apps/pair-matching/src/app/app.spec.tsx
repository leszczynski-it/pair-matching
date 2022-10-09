import { render } from '@testing-library/react';

import App from './app';

// todo: we need adapter for redux first
describe.skip('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />);

    expect(getByText(/Pair Matching/gi)).toBeTruthy();
  });
});
