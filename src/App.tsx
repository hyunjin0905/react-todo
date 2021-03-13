import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "./Login";
import './App.css';
import Todo from "./Todo";
import TodoAdd from "./TodoAdd";




function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/Todo" exact component={Todo} />
            <Route path="/TodoAdd" exact component={TodoAdd} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
