import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { WebhookForm } from '../index';

describe('WebhookForm', () => {
  const setFormData = jest.fn();
  const formData = {
    name: '',
    description: '',
    featureFlag: '',
  };

  const sampleFormData = {
    name: 'test.name',
    description: 'Test description',
    featureFlag: 'test_feature_flag',
  };

  it('renders WebhookForm and handles input changes', async () => {
    render(<WebhookForm formData={formData} setFormData={setFormData} prevData={null} />);

    // Check if input fields are rendered
    const nameInput = screen.getByPlaceholderText('e.g. invoice.paid');
    const descriptionInput = screen.getByPlaceholderText('Description of your webhook');
    const featureFlagInput = screen.getByPlaceholderText('Feature flag name for this webhook');

    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(featureFlagInput).toBeInTheDocument();

    // Type into the name input field
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'user.signup' } });
    });
    expect(setFormData).toHaveBeenCalledWith({ ...formData, name: 'user.signup' });

    // Type into the description input field
    await act(async () => {
      fireEvent.change(descriptionInput, { target: { value: 'User signs up' } });
    });
    expect(setFormData).toHaveBeenCalledWith({ ...formData, description: 'User signs up' });

    // Type into the feature flag input field
    await act(async () => {
      fireEvent.change(featureFlagInput, { target: { value: 'user-signup' } });
    });
    expect(setFormData).toHaveBeenCalledWith({ ...formData, featureFlag: 'user-signup' });
  });

  // Test if the component renders the correct number of input fields:
  it('renders 3 input fields', () => {
    render(<WebhookForm formData={sampleFormData} setFormData={jest.fn()} prevData={null} />);
    const inputFields = screen.getAllByRole('textbox');
    expect(inputFields.length).toBe(3);
  });

  it('updates the name field on change', async () => {
    const setFormData = jest.fn();
    render(<WebhookForm formData={sampleFormData} setFormData={setFormData} prevData={null} />);
    const nameField = screen.getByLabelText(/name/i);
    await act(async () => {
      fireEvent.change(nameField, { target: { value: 'new.name' } });
    });
    expect(setFormData).toHaveBeenCalledWith({ ...sampleFormData, name: 'new.name' });
  });

  it('updates the description field on change', async () => {
    const setFormData = jest.fn();
    render(<WebhookForm formData={sampleFormData} setFormData={setFormData} prevData={null} />);
    const descriptionField = screen.getByLabelText(/description/i);
    await act(async () => {
      fireEvent.change(descriptionField, { target: { value: 'New description' } });
    });
    expect(setFormData).toHaveBeenCalledWith({ ...sampleFormData, description: 'New description' });
  });

  it('updates the feature flag field on change', async () => {
    const setFormData = jest.fn();
    render(<WebhookForm formData={sampleFormData} setFormData={setFormData} prevData={null} />);
    const featureFlagField = screen.getByLabelText(/feature flag/i);
    await act(async () => {
      fireEvent.change(featureFlagField, { target: { value: 'new_feature_flag' } });
    });
    expect(setFormData).toHaveBeenCalledWith({ ...sampleFormData, featureFlag: 'new_feature_flag' });
  });

  it('disables the name field when prevData is provided', () => {
    render(<WebhookForm formData={sampleFormData} setFormData={jest.fn()} prevData={sampleFormData} />);
    const nameField = screen.getByLabelText(/name/i);
    expect(nameField).toBeDisabled();
  });
});
