import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Results from '../src/view/results/Results';

describe('Results - card list', () => {
  it('renders list', () => {
    render(
      <BrowserRouter>
        <Results />
      </BrowserRouter>
    );

    const resultSection = screen.getByTestId('results');

    expect(resultSection).toBeInTheDocument();
  });
});
