import React from 'react';
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import { TodoContextProvider } from "./contexts/todos";
import { Container, Row, Col } from 'react-bootstrap';
import Alert from 'react-s-alert';

const App = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Header />
          <TodoContextProvider>
            <TodoList />
          </TodoContextProvider>
        </Col>
      </Row>
      <Alert stack={{limit: 3}} />
    </Container>
  );
}

export default App