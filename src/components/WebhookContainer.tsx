import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { getEventTypes } from '../api/api';
import { Spinner, WebhookModal, WebhooksTable } from './index';

export const WebhookContainer = () => {
  const [show, setShow] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [filteredEventTypes, setFilteredEventTypes] = useState(eventData);

  const handleShow = () => setShow(true);

  const fetchData = async () => {
    try {
      const response = await getEventTypes('/api/v1/event-type/');
      if (response) {
        setEventData(response.data);
        console.log('response', response.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchData().catch(error => console.log('error', error));
  }, []);

  useEffect(() => {
    const newFilteredEvents = eventData.filter((eventTypes: any) => {
      return (
        eventTypes.description.toLowerCase().includes(searchField) ||
        eventTypes.name.toLowerCase().includes(searchField) ||
        eventTypes.featureFlag.toLowerCase().includes(searchField)
      );
    });
    setFilteredEventTypes(newFilteredEvents);
  }, [eventData, searchField]);

  const reload = () => window.location.reload();

  const onSearchChange = (event: any) => {
    setSearchField(event.target.value.toLowerCase());
  };

  return (
    <Container>
      <Row>
        <Col>
          <Button variant={'primary'} onClick={handleShow} style={{ height: '58px' }}>
            + Create New Event Type
          </Button>
          <Button variant={'secondary'} className={'mx-5'} onClick={fetchData} style={{ height: '58px' }}>
            Refresh Data
          </Button>
        </Col>
        <Col>
          <FloatingLabel controlId={'floatingInput'} label={'Search Event Types'}>
            <Form.Control type={'text'} placeholder={'user.signup'} onChange={onSearchChange} />
          </FloatingLabel>
        </Col>
      </Row>

      <WebhookModal show={show} onHide={setShow} onExit={reload} />
      {eventData ? <WebhooksTable eventData={filteredEventTypes} /> : <Spinner />}
    </Container>
  );
};
