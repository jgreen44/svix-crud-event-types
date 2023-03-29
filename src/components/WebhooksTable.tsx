import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';

import { WebhookModal, WebhookRow } from './index';
import { WebhooksTableProps } from './types';

export const WebhooksTable = ({ eventData }: WebhooksTableProps) => {
  const [show, setShow] = useState(false);
  const [selectedWebhookRow, setSelectedWebhookRow] = useState(null);

  const handleShow = (webhookRow: any) => {
    setSelectedWebhookRow(webhookRow);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const reload = () => window.location.reload();

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Feature Flag</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {eventData.map((webhookRow: any, _index: number) => (
            <WebhookRow key={_index} webhookRow={webhookRow} onEdit={handleShow} />
          ))}
        </tbody>
      </Table>
      <WebhookModal show={show} onHide={handleClose} onExit={reload} prevData={selectedWebhookRow} />
    </>
  );
};
