import { render, screen } from '@testing-library/react';
import React from 'react';

import { WebhookModal } from '../index';

jest.mock('../../api/api', () => ({
  createEventTypes: jest.fn(() => Promise.resolve({ data: {} })),
  deleteEventTypes: jest.fn(() => Promise.resolve({ data: {} })),
  updateEventTypes: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('WebhookModal', () => {
  it('renders without crashing', () => {
    render(<WebhookModal show={false} onHide={jest.fn()} onExit={jest.fn()} />);
  });

  it('renders with the correct title when creating a new event type', () => {
    render(<WebhookModal show={true} onHide={jest.fn()} onExit={jest.fn()} />);
    expect(screen.getByText('Create New Event Type')).toBeInTheDocument();
  });

  it('renders with the correct title when editing an event type', () => {
    const prevData = { name: 'test', description: 'Test description', featureFlag: 'test_flag' };
    render(<WebhookModal show={true} onHide={jest.fn()} onExit={jest.fn()} prevData={prevData} />);
    expect(screen.getByText('Edit Event Type')).toBeInTheDocument();
  });
});
