import React, { useContext, useState } from "react";
import { ADD_TODO } from "../reducers/todos";
import { TodoContext } from "../contexts/todos";
import { Form, Button, Col } from 'react-bootstrap';
import Alert from 'react-s-alert';
import Api from "../Api";

const AddTodo = () => {
  const { dispatch } = useContext(TodoContext);
  // eslint-disable-next-line
  const [nextTodoId, setIndex] = useState(1);

  const useFromInputDescription = (initValue = "") => {
    let [value, setValue] = useState(initValue);
    let onChange = e => setValue(e.target.value);
    let resetValueDescription = newValue => setValue(newValue || initValue);
    return { value, onChange, resetValueDescription };
  }
  const useFromInputDone = (initValue = false) => {
    let [value, setValue] = useState(initValue);
    let onChange = e => setValue(e.target.checked);
    let style = {marginTop: "5px"}
    let resetValueDone = newValue => setValue(newValue || initValue);
    return { value, onChange, style, resetValueDone };
  }

  const inputDescription = useFromInputDescription("");
  const { resetValueDescription, ...inputDescriptionProp } = inputDescription;

  const inputDone = useFromInputDone("");
  const { resetValueDone, ...inputDoneProp } = inputDone;

  const save = async (description, done) => {
    const result = await Api.post(`todos`, JSON.stringify({description, done}))
    if (result) {
      dispatch({
        type: ADD_TODO,
        payload: {
          id: result._id,
          completed: result.done,
          text: result.description,
          date: result.createdAt
        }
      });
      setIndex(result._id);
      Alert.success('Registro inserido com sucesso!', {
        position: 'top-right',
        timeout: 3000
      });
      let elem = document.getElementById("list-table")
      window.scrollBy({ 
        top: elem.offsetHeight,
        behavior: 'smooth' 
      });
    }
  }
  return (
    <div>
      <Form
        onSubmit={e => {
          e.preventDefault();
          if (!inputDescription.value.trim()) {
            return;
          }
          save (inputDescription.value, inputDone.value)
          resetValueDescription();
          resetValueDone();
        }}
        >
        <Form.Row>
          <Col sm="4" md="4">
            <Form.Group controlId="form-desc">
              <Form.Control {...inputDescriptionProp} type="text" placeholder="Digite o item a fazer..." />
            </Form.Group>
          </Col>
          <Col sm="4" md="1">
            <Form.Group controlId="form-done">
              <Form.Check {...inputDoneProp} type="checkbox" label="Feito?" />
            </Form.Group>
          </Col>
          <Col sm="4" md="4">
            <Button variant="primary" type="submit">
              Adicionar Item
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
};

export default AddTodo;
