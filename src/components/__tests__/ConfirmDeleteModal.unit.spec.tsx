import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { ConfirmDeleteModal } from '../index';

describe('ConfirmDeleteModal', () => {
  it('calls onDelete and onCancel when the respective buttons are clicked and the input matches the form name', async () => {
    const formName = 'sampleForm';
    const onDelete = jest.fn();
    const onCancel = jest.fn();

    render(<ConfirmDeleteModal formName={formName} onDelete={onDelete} onCancel={onCancel} />);

    const cancelButton = screen.getByRole('button', { name: /no, go back/i });
    const deleteButton = screen.getByRole('button', { name: /yes, delete/i });
    const input = screen.getByRole('textbox');

    await act(async () => {
      fireEvent.click(cancelButton);
    });
    expect(onCancel).toHaveBeenCalledTimes(1);

    // Test the case when the input doesn't match the formName
    await act(async () => {
      fireEvent.change(input, { target: { value: 'wrongName' } });
    });

    await act(async () => {
      fireEvent.click(deleteButton);
    });
    expect(onDelete).toHaveBeenCalledTimes(0); // onDelete should not be called

    // Test the case when the input matches the formName
    await act(async () => {
      fireEvent.change(input, { target: { value: formName } });
    });

    await act(async () => {
      fireEvent.click(deleteButton);
    });
    expect(onDelete).toHaveBeenCalledTimes(1); // onDelete should be called
  });
});
