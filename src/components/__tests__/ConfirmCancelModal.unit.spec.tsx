import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { ConfirmCancelModal } from '../index';

describe('ConfirmCancelModal', () => {
  const onConfirm = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => {
    render(<ConfirmCancelModal onConfirm={onConfirm} onCancel={onCancel} />);
  });

  it('renders modal header with title', () => {
    const header = screen.getByText(/confirm cancel/i);
    expect(header).toBeInTheDocument();
  });

  it('renders modal body with message', () => {
    const body = screen.getByText(/are you sure you want to cancel\? there is unsaved data in the form\./i);
    expect(body).toBeInTheDocument();
  });

  it('renders modal footer with "No, go back" and "Yes, cancel" buttons', () => {
    const cancelButton = screen.getByRole('button', { name: /no, go back/i });
    const confirmButton = screen.getByRole('button', { name: /yes, cancel/i });

    expect(cancelButton).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
  });

  it('calls onCancel when "No, go back" button is clicked', async () => {
    const cancelButton = screen.getByRole('button', { name: /no, go back/i });
    await userEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when "Yes, cancel" button is clicked', async () => {
    const confirmButton = screen.getByRole('button', { name: /yes, cancel/i });
    await userEvent.click(confirmButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
