import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import * as api from '../../api/api';
import { WebhookContainer } from '../index';

// Mock the API call
jest.mock('../../api/api');
const mockedGetEventTypes = api.getEventTypes as jest.Mock;

describe('WebhookContainer', () => {
  const fakeEventData = [
    {
      id: '1',
      name: 'user.signup',
      description: 'User signs up',
      featureFlag: 'user-signup',
    },
    {
      id: '2',
      name: 'user.login',
      description: 'User logs in',
      featureFlag: 'user-login',
    },
  ];

  beforeEach(() => {
    mockedGetEventTypes.mockResolvedValue({ data: fakeEventData });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<WebhookContainer />);
  });

  it('renders WebhookContainer and fetches event data', async () => {
    render(<WebhookContainer />);

    // Check if buttons are rendered
    const createNewEventTypeButton = screen.getByRole('button', { name: '+ Create New Event Type' });
    const refreshDataButton = screen.getByRole('button', { name: 'Refresh Data' });
    expect(createNewEventTypeButton).toBeInTheDocument();
    expect(refreshDataButton).toBeInTheDocument();

    // Check if search input is rendered
    const searchInput = screen.getByPlaceholderText('user.signup');
    expect(searchInput).toBeInTheDocument();

    // Wait for event data to be fetched and displayed
    await waitFor(() => expect(screen.getByText('user.signup')).toBeInTheDocument());
    expect(screen.getByText('user.login')).toBeInTheDocument();
  });

  it('searches event data', async () => {
    render(<WebhookContainer />);
    await waitFor(() => expect(screen.getByText('user.signup')).toBeInTheDocument());

    // Type into the search input
    const searchInput = screen.getByPlaceholderText('user.signup');
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'login' } });
    });

    // Expect the table to show only the user.login event
    await waitFor(() => expect(screen.queryByText('user.signup')).not.toBeInTheDocument());
    expect(screen.getByText('user.login')).toBeInTheDocument();
  });

  it('fetches data on component mount', () => {
    const fetchDataMock = jest.spyOn(api, 'getEventTypes');
    render(<WebhookContainer />);
    expect(fetchDataMock).toHaveBeenCalledTimes(1);
  });

  it('updates searchField on input change', async () => {
    render(<WebhookContainer />);
    const searchInput = screen.getByPlaceholderText('user.signup');
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'test' } });
    });
    await waitFor(() => {
      expect(screen.getByDisplayValue('test')).toBeInTheDocument();
    });
  });

  it('opens the modal on clicking "Create New Event Type" button', async () => {
    render(<WebhookContainer />);
    const createButton = screen.getByText('+ Create New Event Type');
    await act(async () => {
      fireEvent.click(createButton);
    });
    expect(screen.getByText('Create New Event Type')).toBeInTheDocument();
  });

  it('calls fetchData on clicking "Refresh Data" button', async () => {
    const fetchDataMock = jest.spyOn(api, 'getEventTypes');
    render(<WebhookContainer />);
    const refreshButton = screen.getByText('Refresh Data');
    await act(async () => {
      fireEvent.click(refreshButton);
    });
    expect(fetchDataMock).toHaveBeenCalledTimes(2);
  });
});
