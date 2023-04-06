import { render, screen } from '@testing-library/react';
import React from 'react';

import { Spinner } from '../index';

describe('Spinner', () => {
  it('renders spinner with the correct attributes', () => {
    render(<Spinner />);

    const spinnerWrapper = screen.getByTestId('spinner');
    const spinner = screen.getByRole('status');
    const srOnly = screen.getByText('', { selector: '.sr-only' });

    expect(spinnerWrapper).toHaveClass('d-flex');
    expect(spinnerWrapper).toHaveClass('justify-content-center');

    expect(spinner).toHaveClass('spinner-border');

    expect(srOnly).toBeInTheDocument();
  });
});
