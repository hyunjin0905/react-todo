import React, { useReducer, useMemo } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./page/Login";
import Todo from "./page/Todo";
import TodoAdd from "./page/TodoAdd";
import { MyComponent } from "./Test/MyComponent";
import { CommentList } from "./Comment"

export enum UserAction {
    USER_LOGIN = "USER_LOGIN",
    USER_LOGOUT = "USER_LOGOUT",
    GET_TODO = "GET_TODO",
    ADD_TODO = "ADD_TODO",
    MODIFY_TODO = "MODIFY_TODO",
    DELETE_TODO = "DELETE_TODO"
}


const intiUser: any = {
    id: "아이디가 없어요",
    user: {},
    todos: [],
}


const reducer: React.Reducer<any, any> = (state, nextAction) => {
    console.log(nextAction);
    switch (nextAction.type) {
        case UserAction.USER_LOGIN:
            return {
              id: nextAction.id,
             user: { email: nextAction.user.email , password: nextAction.user.password }
            }
        case UserAction.USER_LOGOUT:
            return {}
        case UserAction.GET_TODO:
            return {
                todos: nextAction.todos
            }
        case UserAction.ADD_TODO:
            return {

            }
        case UserAction.MODIFY_TODO:
            return {

            }
        case UserAction.DELETE_TODO:
            return {

            }
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
    const value = {
            id: userData.id,
            user: userData.user,
            todos: userData.todos,
            dispatch
        };
    return (
        <UserContext.Provider value={value}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/Todo" exact component={Todo}/>
                    <Route path="/TodoAdd" exact component={TodoAdd}/>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>

    );
}

export default App;
