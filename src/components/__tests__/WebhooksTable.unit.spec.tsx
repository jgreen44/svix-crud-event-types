import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';

import { WebhooksTable } from '../index';

describe('WebhooksTable', () => {
  const eventDataMock = [
    {
      name: 'test.name',
      description: 'Test Description',
      featureFlag: 'test_flag',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-02T00:00:00.000Z',
    },
    {
      name: 'test.name2',
      description: 'Test Description 2',
      featureFlag: 'test_flag2',
      createdAt: '2022-01-03T00:00:00.000Z',
      updatedAt: '2022-01-04T00:00:00.000Z',
    },
  ];

  it('renders table headers', () => {
    const { getByText } = render(<WebhooksTable eventData={eventDataMock} />);
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Description')).toBeInTheDocument();
    expect(getByText('Feature Flag')).toBeInTheDocument();
    expect(getByText('Created At')).toBeInTheDocument();
    expect(getByText('Updated At')).toBeInTheDocument();
    expect(getByText('Edit')).toBeInTheDocument();
  });

  it('renders WebhookRow components for each eventData item', () => {
    const { getByText } = render(<WebhooksTable eventData={eventDataMock} />);
    expect(getByText('test.name')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
    expect(getByText('test.name2')).toBeInTheDocument();
    expect(getByText('Test Description 2')).toBeInTheDocument();
  });
});
