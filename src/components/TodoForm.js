import React, { useState } from "react";
import { Link } from "react-router-dom";

const TodoForm = () => {
  const [formInput, setFormInput] = useState({
    todo: "",
    is_done: "",
    user_id: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmitAsync = async () => {
    const response = await fetch("https://hasura-practice.hasura.app/v1/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-hasura-admin-secret":
            "KP4TsamvbXJRTdnDLn4LzA5uBOSAPsTQ1tFLbpvXpjEzTQ1kDUZDSiAjRKIMm27i",
        },
      body: JSON.stringify({
        query: `mutation insertTodo($newTodo: todos_insert_input!) {
                insert_todos_one(object: $newTodo) {
                  id
                }}`,
        variables: {
            "newTodo": {
            "is_done": false,
            "todo": formInput.todo,
            "user_id": +formInput.user_id
          }},
      }),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitAsync()
  }
  const { todo, is_done, user_id } = formInput;
  return (
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
          value={todo}
          onChange={handleChange}
          placeholder="todo"
          placeholder="string"
        />
        <label>Is Done</label>
        <input
          required
          name="is_done"
          value={is_done}
          onChange={handleChange}
          placeholder="boolean"
        />
        <label>user Id</label>
        <input
          required
          name="user_id"
          value={user_id}
          onChange={handleChange}
          placeholder="number"
        />
        <button type="submit" style={{ width: "60px", marginTop: "20px" }}>
          submit
        </button>
      </form>
      <Link to={"/todolist"}>
        <button
          style={{ width: "80px", marginTop: "20px", marginLeft: "30px" }}
        >
          go back
        </button>
      </Link>
    </>
  );
};

export default TodoForm;
