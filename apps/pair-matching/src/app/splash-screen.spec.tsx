import { render } from '@testing-library/react';
import { SplashScreen } from './splash-screen';

// todo: we need adapter for redux first
describe.skip('SplashScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SplashScreen />);
    expect(baseElement).toBeTruthy();
  });
});
