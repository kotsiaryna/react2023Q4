import Home from '@/pages';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Home Page', () => {
  it('renders HomePage', () => {
    render(<Home />);
  });
  const body = screen.getByText('');
  expect(body).toBeEmptyDOMElement();
});
