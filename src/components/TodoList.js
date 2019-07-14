import React, { useContext, useEffect, useState } from "react";
import Todo from "./Todo";
import { VisibilityFilters, ADD_TODO } from "./../reducers/todos";
import { TodoContext } from "./../contexts/todos";
import Filters from "./Filters";
import AddTodo from "./AddTodo";
import { Table, Alert, Accordion, Card } from 'react-bootstrap';
import Api from '../Api'


const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [isLoading, setIsLoading] = useState(false);
  const todos = applyFilter(state);

  const fetchData = async () => {
    const result = await Api.get(`todos`);
    result.forEach((todos) => {
      dispatch({
        type: ADD_TODO,
        payload: {
          id: todos._id,
          completed: todos.done,
          text: todos.description,
          date: todos.createdAt
        }
      })
    })
    setIsLoading(false);
  };
  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  return (
    <section>
       {isLoading ? (
        <Alert variant="info">
          Carregando itens...
        </Alert>
      ) : (
        <div>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0" style={{cursor: "pointer"}}>
                Cadastro
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <AddTodo />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1" style={{cursor: "pointer"}}>
                Filtros
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Filters />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          {todos.length > 0 ? (
            <Table striped bordered hover className="mt-3" id="list-table">
              <thead>
                <tr>
                  <th className="text-center">Descrição</th>
                  <th className="text-center">Feito</th>
                  <th className="text-center">Data de criação</th>
                  <th className="text-center">Ação</th>
                </tr>
              </thead>
              <tbody>
                {todos.map(todo => (
                  <Todo key={todo.id} {...todo} />
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="warning" className="mt-3">
              Não há itens para o filtro aplicado!
            </Alert>
          )}
        </div>
      )}
    </section>
  );
};

const applyFilter = state => {
  const { filter, todos } = state;
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

export default TodoList;
