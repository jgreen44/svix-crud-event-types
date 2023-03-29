import React from 'react';
import Container from 'react-bootstrap/Container';

import { WebhookContainer } from './components';

const App = () => {
  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Webhook Event Types</h1>
      </Container>
      <WebhookContainer />
    </Container>
  );
};

export default App;
