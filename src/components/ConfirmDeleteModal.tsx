import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { ConfirmDeleteModalProps } from './types';

export const ConfirmDeleteModal = ({ formName, onDelete, onCancel }: ConfirmDeleteModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const handleDisabled = inputValue !== formName;
  return (
    <>
      <Modal.Header>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {`Are you sure you want to delete ${formName}?`}
        <hr />
        <p>
          Please type <span className={'text-danger'}>{`${formName}`}</span> to confirm
        </p>
        <input type={'text'} className={'form-control'} onChange={event => setInputValue(event.target.value)} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          No, go back
        </Button>
        <Button variant="danger" onClick={onDelete} disabled={handleDisabled}>
          Yes, delete
        </Button>
      </Modal.Footer>
    </>
  );
};
