import React, { useContext } from "react";
import { Button, ButtonToolbar } from 'react-bootstrap';

import { CHANGE_FILTER, VisibilityFilters } from "../reducers/todos";
import { TodoContext } from "../contexts/todos";

const BUTTONS_FILTER = [
  {
    id: 1,
    caption: `Todos`,
    type: CHANGE_FILTER,
    filter: VisibilityFilters.SHOW_ALL,
    className: `info`
  },
  {
    id: 2,
    caption: `Não feitos`,
    type: CHANGE_FILTER,
    filter: VisibilityFilters.SHOW_ACTIVE,
    className: `danger`
  },
  {
    id: 3,
    caption: `Feitos`,
    type: CHANGE_FILTER,
    filter: VisibilityFilters.SHOW_COMPLETED,
    className: `success`
  }
];

const Filters = () => {
  const { state, dispatch } = useContext(TodoContext);
  return (
    <ButtonToolbar>
      {BUTTONS_FILTER.map(({ id, caption, type, filter, className}) => (
        <Button
          variant={className}
          size="md"
          style={{marginRight: `20px`}}
          disabled={state.filter === filter}
          onClick={() => dispatch({ type, payload: filter })}
          key={id}
        >
          {caption}
        </Button>
      ))}
    </ ButtonToolbar>
  );
};

export default Filters;
