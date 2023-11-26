import Document from '@/pages';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Document', () => {
  it('renders Document', () => {
    render(<Document />);
  });
  const smth = screen.getByText('');
  expect(smth).toBeEmptyDOMElement();
});
