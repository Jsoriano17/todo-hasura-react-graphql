import React, { useState, useEffect } from "react";
import HasuraConfig from "../graphql-api/HasuraConfig";
import { useReactGraphql } from "@tesseractcollective/react-graphql";

const TodoFilter = () => {
  const [todoState, setTodoState] = useState([]);
  const [todoFilterId, setTodoFilterId] = useState(0);
  const [todoFilterCompleted, setTodoFilterCompleted] = useState(false);
  const reactGraphTodos = useReactGraphql(HasuraConfig.todos);
  const { items: todosFiltered } = reactGraphTodos.useInfiniteQueryMany({
    where: {
      user_id: { _eq: todoFilterId },
      _and: { is_done: { _eq: todoFilterCompleted } },
    },
  });
  const { items: allTodos, refresh } = reactGraphTodos.useInfiniteQueryMany({});

  const renderTodos = () =>
    todoState.map((item) => (
      <ul>
        <li>{item.todo} {item.is_done.toString()}</li>
      </ul>
    ));

  const handleChange = (e) => {
    const {name, value} = e.target
    setTodoFilterId(value);
  };

  const handleSubmit = (e) => {
    setTodoFilterId(+todoFilterId)
    setTodoState(todosFiltered);
    e.preventDefault();
  };
  return (
    <div>
      <h1 style={styles.header}>Todo Filter</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button
          style={{ marginLeft: "20px", marginRight: "15px" }}
          onClick={() => setTodoState(allTodos)}
        >
          show all
        </button>
        <form onSubmit={handleSubmit}>
          <label style={{ marginRight: "15px" }}>filter:</label>
          <label>user id </label>
          <input
            required
            name="id"
            value={todoFilterId}
            onChange={handleChange}
            style={{ marginRight: "15px" }}
            placeholder="user number"
          />
          <label>is_done </label>
          <input
            type="checkbox"
            onClick={() => setTodoFilterCompleted(!todoFilterCompleted)}
            style={{ marginRight: "15px" }}
            placeholder="true or false"
          />
          <button type="submit">search</button>
        </form>
      </div>
      {renderTodos()}
    </div>
  );
};

const styles = {
  header: {
    color: "purple",
    marginLeft: "30px",
    fontSize: "50px",
  },
  list: {
    fontSize: "30px",
    marginLeft: "40px",
  },
  margin: {
    marginLeft: "40px",
  },
  marginButton: {
    marginLeft: "10px",
  },
};

export default TodoFilter;
