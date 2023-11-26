import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import Search from '@/components/Search';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

describe('Search test', () => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {},
    push: pushMock,
  });

  it('renders Search button', () => {
    render(<Search />);
    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeInTheDocument();
  });

  it('renders Search input', () => {
    render(<Search />);
    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
  });

  it('click on searchButton changes query', () => {
    render(<Search />);
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);
    expect(pushMock).toHaveBeenCalledTimes(1);
  });
});
