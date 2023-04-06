import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';

import App from './App';

describe('App', () => {
  it('renders header', () => {
    const { getByText } = render(<App />);
    expect(getByText('Webhook Event Types')).toBeInTheDocument();
  });
});
