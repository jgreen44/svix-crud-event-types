import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { createEventTypes, deleteEventTypes, updateEventTypes } from '../api/api';
import { ConfirmCancelModal, ConfirmDeleteModal, WebhookForm } from './index';
import { WebhookModalProps } from './types';

export const WebhookModal = ({ show, onHide, onExit, prevData }: WebhookModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    featureFlag: '',
  });
  const [confirmModal, setConfirmModal] = useState({ type: '', show: false });

  useEffect(() => {
    if (prevData) {
      setFormData(prevData);
    }
  }, [prevData]);

  const handleClose = () => {
    if (prevData) {
      onHide(false);
      return;
    }
    if (formData.name.length > 0 || formData.description.length > 0 || formData.featureFlag.length > 0) {
      setConfirmModal({ type: 'cancel', show: true });
    } else {
      onHide(false);
      if (!prevData) resetForm();
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', featureFlag: '' });
  };

  const handleApiCall = async (apiCall: any, url: string, payload: any) => {
    try {
      await apiCall(url, payload);
      onExit();
      onHide(false);
      resetForm();
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderModalContent = () => {
    if (confirmModal.type === 'cancel' && confirmModal.show) {
      return (
        <ConfirmCancelModal
          onConfirm={() => {
            setConfirmModal({ type: '', show: false });
            onHide(false);
            if (!prevData) resetForm();
          }}
          onCancel={() => setConfirmModal({ type: '', show: false })}
        />
      );
    } else if (confirmModal.type === 'delete' && confirmModal.show) {
      return (
        <ConfirmDeleteModal
          formName={formData.name}
          onDelete={() => handleApiCall(deleteEventTypes, `/api/v1/event-type/${formData.name}/`, null)}
          onCancel={() => setConfirmModal({ type: '', show: false })}
        />
      );
    } else {
      return (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{`${prevData ? 'Edit' : 'Create New'} Event Type`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <WebhookForm setFormData={setFormData} formData={formData} prevData={prevData} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (prevData) {
                  handleApiCall(
                    updateEventTypes,
                    `/api/v1/event-type/${formData.name}/`,
                    JSON.stringify({ description: formData.description, featureFlag: formData.featureFlag }),
                  ).catch(error => console.log('error', error));
                } else {
                  handleApiCall(createEventTypes, '/api/v1/event-type/', JSON.stringify(formData)).catch(error =>
                    console.log('error', error),
                  );
                }
              }}
              disabled={
                !formData.name || !formData.description || formData.name.length < 5 || formData.description.length < 10
              }
            >
              {prevData ? 'Edit' : 'Create'}
            </Button>
            {prevData && (
              <Button variant="danger" onClick={() => setConfirmModal({ type: 'delete', show: true })}>
                Delete
              </Button>
            )}
          </Modal.Footer>
        </>
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop={'static'} keyboard={false}>
      {renderModalContent()}
    </Modal>
  );
};
