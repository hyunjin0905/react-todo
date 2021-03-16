import React, { useReducer, createContext } from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "./page/Login";
import Todo from "./page/Todo";
import TodoAdd from "./page/TodoAdd";
import { User } from "./type/User";




enum UserAction {
    USER_LOGIN = "USER_LIVE",
    USER_LOGOUT = "USER_LOGOUT"
}


const reducer: React.Reducer<User, any> = (user, action) => {
    switch (action) {
        case UserAction.USER_LOGIN:
            return {
                ...user,
                user: {
                    email: "",
                    password: 1234,
                },
            }
        default:
            return user;
    }
}
const intiUser: User = {
    user: {
        email: "lucy@naverc.com",
        password: "1234"
    },
    todos: [
        {
            title: "리액트",
            contents: "해야됨"
        },
        {
            title: "자바스크립트",
            contents: "해야됨"
        },
        {
            title: "css",
            contents: "해야됨"
        }
    ],

}

export const UserContext = React.createContext<{ state: User; dispatch: React.Dispatch<any> }>({
        state: intiUser,
        dispatch: () => {}
    });
function App() {
   const [ state, dispatch ] = useReducer(reducer, intiUser);


  return (
      <UserContext.Provider value={{state, dispatch}}>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/Todo" exact component={Todo} />
                <Route path="/TodoAdd" exact component={TodoAdd} />
            </Switch>
        </BrowserRouter>
      </UserContext.Provider>
  );
}

export default App;
