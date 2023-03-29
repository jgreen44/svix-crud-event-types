import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { ConfirmCancelModalProps } from './types';

export const ConfirmCancelModal = ({ onConfirm, onCancel }: ConfirmCancelModalProps) => {
  return (
    <>
      <Modal.Header>
        <Modal.Title>Confirm Cancel</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to cancel? There is unsaved data in the form.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          No, go back
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Yes, cancel
        </Button>
      </Modal.Footer>
    </>
  );
};
