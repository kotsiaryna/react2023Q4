import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import PageLimit from '@/components/PageLimit';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

describe('pageLimit', () => {
  (useRouter as jest.Mock).mockReturnValue({
    query: { limit: '10', search: 'test' },
    push: pushMock,
  });

  it('changes query on changing limit', () => {
    render(<PageLimit />);
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 5 } });
    expect(pushMock).toHaveBeenCalled();
  });
});
