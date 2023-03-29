import React from 'react';
import Form from 'react-bootstrap/Form';

import { WebhookFormProps } from './types';

export const WebhookForm = ({ formData, setFormData, prevData }: WebhookFormProps) => {
  const handleChange = (field: string) => (event: { target: { value: string } }) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formEventTypeName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. invoice.paid"
          onChange={handleChange('name')}
          value={formData.name}
          disabled={!!prevData}
        />
        <Form.Text className="text-muted">Give your webhook a name</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEventTypeDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Description of your webhook"
          onChange={handleChange('description')}
          value={formData.description}
        />
        <Form.Text className="text-muted">Give a description of your webhook.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEventTypeFeatureFlag">
        <Form.Label>Feature Flag</Form.Label>
        <Form.Control
          type="text"
          onChange={handleChange('featureFlag')}
          value={formData.featureFlag}
          placeholder="Feature flag name for this webhook"
        />
        <Form.Text className="text-muted">(optional) Put your webhook behind a feature flag.</Form.Text>
      </Form.Group>
    </Form>
  );
};
