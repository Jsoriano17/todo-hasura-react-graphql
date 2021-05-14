import './App.css';
import { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router';
import TodoList from './components/TodoList';
import NotFound from './components/NotFound';
import ThingsTodo from './components/ThingsTodo';
import TodoForm from './components/TodoForm';
import TodoListReactGraphql from './components/TodoListReactGraphql';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { createClient } from 'urql';
import {ReactGraphqlProvider} from '@tesseractcollective/react-graphql';
import TodoFilter from './components/TodoFilter';

const hasuraUrl = "https://hasura-practice.hasura.app/v1/graphql";

function App() {
  const [client, setClient] = useState();

  useEffect(() => {
    const _client = createClient({
      url: hasuraUrl,
      fetchOptions: () => {
        return {          
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-hasura-admin-secret":
              "KP4TsamvbXJRTdnDLn4LzA5uBOSAPsTQ1tFLbpvXpjEzTQ1kDUZDSiAjRKIMm27i",
          },
        };
      },
    });
    setClient(_client);
  
  }, []);

  if(!client){
    return <div>Loading</div>
  }
  
  return (
    <Switch>
      <ReactGraphqlProvider client={client}>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/todolist" component={TodoList} />
        <Route exact path="/todolistreactgraphql" component={TodoListReactGraphql} />
        <Route exact path="/todofilter" component={TodoFilter} />
        <Route exact path="/todoform" component={TodoForm} />
      </ReactGraphqlProvider>
    </Switch>
  );
}

export default App;
