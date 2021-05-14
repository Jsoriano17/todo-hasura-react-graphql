import React, { useEffect, useState } from "react";
import HasuraConfig from "../graphql-api/HasuraConfig";
import { useReactGraphql } from "@tesseractcollective/react-graphql";

const TodoListReactGraphql = () => {
  const [formState, setFormState] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [formInput, setFormInput] = useState({
    todo: "",
    is_done: false,
    user_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const userReactGraphqlApi = useReactGraphql(HasuraConfig.users);
  const todoReactGraphqlApi = useReactGraphql(HasuraConfig.todos);
  const { items: todos, refresh } = userReactGraphqlApi.useInfiniteQueryMany({}); //todo

  const { executeMutation: insertUser } = userReactGraphqlApi.useInsert({}); //insert_todo_by_pk

  const { executeMutation: insertTodo } = todoReactGraphqlApi.useInsert({});
  const { executeMutation: deleteTodo } = todoReactGraphqlApi.useDelete({});
  const {executeMutation: updateTodo} = todoReactGraphqlApi.useUpdate({});

  const handleDelete = (id) => {
    deleteTodo({ id: id });
    console.log(id);
  };
  const handleEdit = (todo) => {
    setCurrentTodo(todo)
    setShowEdit(true)
  };

  const renderUsers = () => {
    return todos.map((user) => (
      <>
        <ul>
          <li>id: {user.id} {user.first_name} </li>
          {user.todos.map((todo) => (
            <ul>
              <li>
                {todo.todo}
                <button
                  style={{ marginLeft: "10px", marginBottom: "10px" }}
                  onClick={() => handleEdit(todo)}
                >
                  Edit
                </button>
                <button
                  style={{ marginLeft: "10px", marginBottom: "10px" }}
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </li>
            </ul>
          ))}
        </ul>
      </>
    ));
  };

  const handleSubmitUpdate = (e) => {
    updateTodo({id: currentTodo.id,
      todo: formInput.todo,
    })
    setFormInput({
      is_done: false,
      todo: "",
      user_id: "",
    });
    setShowEdit(false)
    setCurrentTodo({});
    e.preventDefault();
  }

  const handleSubmit = (e) => {
    insertTodo({
      is_done: formInput.is_done,
      todo: formInput.todo,
      user_id: +formInput.user_id,
    });
    setFormInput({
      is_done: false,
      todo: "",
      user_id: "",
    });
    e.preventDefault();
  };

  return (
    <div>
      <h1 style={styles.header}>Todo List React-graphql</h1>
      {renderUsers()}
      <button style={{ marginLeft: "30px" }} onClick={() => setFormState(true)}>
        add todo
      </button>
      {formState && (
        <>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "30%",
              marginLeft: "30px",
              marginTop: "30px",
            }}
          >
            <label>Todo</label>
            <input
              required
              name="todo"
              value={formInput.todo}
              onChange={handleChange}
              placeholder="todo"
              placeholder="string"
            />
            <label>Is Done</label>
            <input
              required
              name="is_done"
              value={formInput.is_done}
              onChange={handleChange}
              placeholder="boolean"
            />
            <label>user Id</label>
            <input
              required
              name="user_id"
              value={formInput.user_id}
              onChange={handleChange}
              placeholder="number"
            />
            <button type="submit" style={{ width: "60px", marginTop: "20px" }}>
              submit
            </button>
            <button onClick={() => setFormState(false)}>Close</button>
          </form>
        </>
      )}
      {showEdit && (
        <>
          <h1 style={{ marginLeft: "30px" }}>Editing: "{currentTodo.todo}"</h1>
          <form
            onSubmit={handleSubmitUpdate}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "30%",
              marginLeft: "30px",
              marginTop: "30px",
            }}
          >
            <label>Todo</label>
            <input
              required
              name="todo"
              value={formInput.todo}
              onChange={handleChange}
              placeholder="todo"
              placeholder="string"
            />
            <button type="submit" style={{ width: "60px", marginTop: "20px" }}>
              submit
            </button>
            <button onClick={() => setShowEdit(false)}>Close</button>
          </form>
        </>
      )}
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

export default TodoListReactGraphql;
