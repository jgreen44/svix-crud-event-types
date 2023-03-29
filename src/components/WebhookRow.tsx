import React from 'react';
import Button from 'react-bootstrap/Button';

import { WebhookRowProps } from './types';

export const WebhookRow = ({ webhookRow, onEdit }: WebhookRowProps) => {
  const timestamp = (time: string) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  const handleEdit = () => {
    onEdit(webhookRow);
  };

  return (
    <tr>
      <td>{webhookRow.name}</td>
      <td>{webhookRow.description}</td>
      <td>{webhookRow.featureFlag}</td>
      <td>{timestamp(webhookRow.createdAt)}</td>
      <td>{timestamp(webhookRow.updatedAt)}</td>
      <td>
        <Button className={'btn btn-secondary btn-sm'} onClick={handleEdit}>
          ...
        </Button>
      </td>
    </tr>
  );
};
