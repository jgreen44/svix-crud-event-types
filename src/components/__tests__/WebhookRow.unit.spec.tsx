import '@testing-library/jest-dom/extend-expect';

import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';

import { WebhookRow } from '../index';

describe('WebhookRow', () => {
  const webhookRowMock = {
    name: 'test.name',
    description: 'Test Description',
    featureFlag: 'test_flag',
    createdAt: '2022-03-03T00:01:00.000Z',
    updatedAt: '2022-03-04T00:01:00.000Z',
  };

  it('renders webhook row with correct data', () => {
    const { getByText } = render(<WebhookRow webhookRow={webhookRowMock} onEdit={() => {}} />);

    expect(getByText(webhookRowMock.name)).toBeInTheDocument();
    expect(getByText(webhookRowMock.description)).toBeInTheDocument();
    expect(getByText(webhookRowMock.featureFlag)).toBeInTheDocument();
    expect(getByText('3/2/2022, 6:01:00 PM')).toBeInTheDocument();
    expect(getByText('3/3/2022, 6:01:00 PM')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', async () => {
    const onEditMock = jest.fn();
    const { getByRole } = render(<WebhookRow webhookRow={webhookRowMock} onEdit={onEditMock} />);

    await act(async () => {
      fireEvent.click(getByRole('button'));
    });
    expect(onEditMock).toHaveBeenCalledTimes(1);
    expect(onEditMock).toHaveBeenCalledWith(webhookRowMock);
  });

  it('displays edit button with correct text', () => {
    const { getByText } = render(<WebhookRow webhookRow={webhookRowMock} onEdit={() => {}} />);
    const editButton = getByText('...');
    expect(editButton).toBeInTheDocument();
    expect(editButton.tagName).toBe('BUTTON');
  });

  it('does not call onEdit when not clicking the edit button', async () => {
    const onEditMock = jest.fn();
    const { container } = render(<WebhookRow webhookRow={webhookRowMock} onEdit={onEditMock} />);
    await act(async () => {
      fireEvent.click(container);
    });
    expect(onEditMock).toHaveBeenCalledTimes(0);
  });

  it('formats timestamp correctly for different dates', () => {
    const differentDateMock = {
      ...webhookRowMock,
      createdAt: '2023-03-15T10:30:00.000Z',
      updatedAt: '2023-03-16T12:45:00.000Z',
    };

    const { getByText } = render(<WebhookRow webhookRow={differentDateMock} onEdit={() => {}} />);
    expect(getByText('3/15/2023, 5:30:00 AM')).toBeInTheDocument();
    expect(getByText('3/16/2023, 7:45:00 AM')).toBeInTheDocument();
  });
});
