import React, { useContext, } from "react";
import PropTypes from "prop-types";
import { TOGGLE_TODO, REMOVE_TODO } from "./../reducers/todos";
import { TodoContext } from "./../contexts/todos";
import { Dropdown, Badge} from 'react-bootstrap';
import Alert from 'react-s-alert';
import Api from "../Api";

const Todo = ({ id, completed, date, text }) => {
  const { dispatch } = useContext(TodoContext);
  const remove = async (id) => {
    if (window.confirm("Deseja realmente remover esse item?")) {
      const result = await Api.delete(`todos/${id}`)
      if (result) {
        dispatch({
          type: REMOVE_TODO,
          payload: { id }
        })
        let msg = `Registro "${text}" removido  com sucesso!`
        Alert.success(msg, {
          position: 'bottom-left',
          timeout: 3000
        });
      }
    }
  }
  const edit = async (id, text, completed) => {
    let desc = window.prompt(`Infome uma nova descrição`, text);
    if (desc != null) {
      const result = await Api.put(`todos/${id}`, JSON.stringify({description: desc, done: completed}))
      if (result) {
        dispatch({
          type: TOGGLE_TODO,
          payload: {
            id,
            completed: result.done,
            text: result.description,
            date: result.createdAt
          }
        })
        let msg = `Registro "${desc}" editado com sucesso!`
        Alert.success(msg, {
          position: 'bottom-left',
          timeout: 3000
        });
      }
    }
  }

  const toogle = async (id, description, completed) => {
    const result = await Api.put(`todos/${id}`, JSON.stringify({description, done: !completed}))
    if (result) {
      dispatch({
        type: TOGGLE_TODO,
        payload: { id, completed: !completed }
      })
    }
  }

  const dt = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })

  const formatDateTime = date => dt.format(new Date(date))

  return (
    <tr>
      <td className="text-center">{text}</td>
      <td className="text-center">{completed ? <Badge variant="success">Sim</Badge> : <Badge variant="danger">Não</Badge>}</td>
      <td className="text-center">{formatDateTime(date)}</td>
      <td className="text-center">
        <Dropdown>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            Ações
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() =>
                toogle (id, text, completed)
              }
              style={{
                cursor: "pointer",
                display: completed ? "none" : "block"
              }}
            >
              Marcar como feito
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                remove(id)
              }
              style={{
                cursor: "pointer",
              }}
            >
              Remover
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                edit(id, text, completed)
              }
              style={{
                cursor: "pointer",
                display: completed ? "none" : ""
              }}
            >
              Editar
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
};

Todo.propTypes = {
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo;
