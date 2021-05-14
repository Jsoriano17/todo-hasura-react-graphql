import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [users, setUsers] = useState([]);
  const [currentTodo, setCurrentTodo] = useState({})
  const [showEdit, setShowEdit] = useState(false)
  const [todoText, setTodoText] = useState('')

  useEffect(() => {
    const query = `query {
      users {
        id
        first_name
        todos {
          id
          todo
          is_done
        }
      }
  }`;

    fetch("https://hasura-practice.hasura.app/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-hasura-admin-secret":
          "KP4TsamvbXJRTdnDLn4LzA5uBOSAPsTQ1tFLbpvXpjEzTQ1kDUZDSiAjRKIMm27i",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((r) => r.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(
      "https://hasura-practice.hasura.app/v1/graphql",
      {
          //why is this not a delete method??
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-hasura-admin-secret":
            "KP4TsamvbXJRTdnDLn4LzA5uBOSAPsTQ1tFLbpvXpjEzTQ1kDUZDSiAjRKIMm27i",
        },
        body: JSON.stringify({
          query: `mutation deleteTodo($todoId: Int!) {
            delete_todos_by_pk(id: $todoId) {
              id
            }
          }
          `,
          variables: {
                "todoId": id
          },
        }),
      }
    );
    setTodoText('')
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setTodoText(value);
  }

  const handleEdit = (todo) => {
    setCurrentTodo(todo)
    setShowEdit(true)
  }
  const handleCancel= () => {
    setCurrentTodo({})
    setShowEdit(false)
    setTodoText('')
  }

  const handleSubmit = async () => {
    const response = await fetch(
        "https://hasura-practice.hasura.app/v1/graphql",
        {
        //why is this not a delete method??
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-hasura-admin-secret":
              "KP4TsamvbXJRTdnDLn4LzA5uBOSAPsTQ1tFLbpvXpjEzTQ1kDUZDSiAjRKIMm27i",
          },
          body: JSON.stringify({
            query: `mutation MyMutation($todoId: Int!, $newTodo: String!) {
                update_todos_by_pk(pk_columns: {id: $todoId}, _set: {todo: $newTodo}) {
                  id
                }
              }`,
            variables: {
                "todoId": currentTodo.id,
                "newTodo": todoText
            },
          }),
        }
      )
      setShowEdit(false)
      setTodoText('')
  }

  const renderTodos = () => {
    return users.data?.users?.map?.((user) => (
      <ul key={user.id} style={styles.list}>
        <li>{user.first_name}</li>
        {user.todos.map((todo) => (
          <ul>
            <li>
              {todo.todo}
              <button
              style={styles.marginButton}
              onClick={() => handleEdit(todo)}
              >
                  Edit
              </button>
              <button
                style={styles.marginButton}
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </li>
          </ul>
        ))}
      </ul>
    ));
  };
  return (
    <>
      <h1 style={styles.header}>Todo List Graphql</h1>
      {renderTodos()}
      <div style={styles.margin}>
        <Link to={"/todoform"}>
          <button>Create Todo</button>
        </Link>
        { showEdit &&
        <>
        <h1>Editing: {currentTodo.todo}</h1>
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
            <label>New todo name</label>
            <input
            required
            value={todoText}
            onChange={handleChange}
            placeholder="todo name"></input>
            <button type="submit" style={{marginBottom: '10px'}}>Submit</button>
            <button style={{marginBottom: '30px'}} onClick={handleCancel}>cancel</button>
        </form>
        </>}
      </div>
    </>
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

export default TodoList;
