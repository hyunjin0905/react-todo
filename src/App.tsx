import React, { useReducer, useMemo } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./page/Login";
import Todo from "./page/Todo";
import TodoAdd from "./page/TodoAdd";
import { MyComponent } from "./Test/MyComponent";


export enum UserAction {
    USER_LOGIN = "USER_LOGIN",
    USER_LOGOUT = "USER_LOGOUT"
}


const intiUser: any = {
    id: "아이디가 없어요",
    user: {},
    todos: [],
}


const reducer: React.Reducer<any, any> = (state, nextAction) => {
    switch (nextAction.type) {
        case UserAction.USER_LOGIN:
            return {
                ...nextAction
            }
        case UserAction.USER_LOGIN:
            return {}
        default:
            return {
                ...state
            }
    }

}

// @ts-ignore
export const UserContext = React.createContext <{ id: any, user: any, todos: any, dispatch: React.Dispatch<any> }>();

function App() {

    const [ userData, dispatch ] = useReducer(reducer, intiUser);
    const value = useMemo(() => (
        {
            id: userData.id,
            user: userData.user,
            todos: userData.todos,
            dispatch
        }
    ), [ userData.id, userData.user, userData.todos ]);

    return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={MyComponent}></Route>
                    <Route path="/" exact component={Login}/>
                    <Route path="/Todo" exact component={Todo}/>
                    <Route path="/TodoAdd" exact component={TodoAdd}/>
                </Switch>
            </BrowserRouter>
    );
}

export default App;
