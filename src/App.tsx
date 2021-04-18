import React, { useReducer } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./page/Login";
import Todo from "./page/Todo";
import TodoEdit from "./page/TodoEdit";
import { User } from "./model/User";
import { Todo as TodoModel } from "./model/Todo";

export enum UserActionType {
    USER_LOGIN = "USER_LOGIN",
    USER_LOGOUT = "USER_LOGOUT",
    SET_TODO = "SET_TODO",
    ADD_TODO = "ADD_TODO",
    MODIFY_TODO = "MODIFY_TODO",
    DELETE_TODO = "DELETE_TODO",
}

type UserAction = UserLoginAction | UserLogoutAction | SetTodoAction | AddTodoAction | ModifyTodoAction | DeleteTodoAction;

type UserLoginAction = { type: UserActionType.USER_LOGIN; payload: { id: string; email: string; password: string; }; }
type UserLogoutAction = { type: UserActionType.USER_LOGOUT };
type SetTodoAction = { type: UserActionType.SET_TODO, payload: TodoModel[] };
type AddTodoAction = { type: UserActionType.ADD_TODO, payload: TodoModel };
type ModifyTodoAction = { type: UserActionType.MODIFY_TODO, payload: TodoModel };
type DeleteTodoAction = { type: UserActionType.DELETE_TODO, payload: string; };





const intiUser: User = {
    id: "",
    user: {
        email: "",
        password: ""
    },
    todos: []
}


const reducer: React.Reducer<User, UserAction> = (state, action) => {
    console.log(action);
    switch (action.type) {
        case UserActionType.USER_LOGIN:
            return { ...state, id: action.payload.id}
        case UserActionType.DELETE_TODO:
            return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
        case UserActionType.SET_TODO:
            return { ...state, todos: action.payload };
        case UserActionType.MODIFY_TODO:
           const { payload } = action;
            const todo =  state.todos.map((todo) => {
                if (todo.id === payload.id) return payload;
                else return todo
            });
            return { ...state, todos: todo };

        default:
            return state;
    }
}


interface UserContextState {
    user: User;
    setTodos: (todos: TodoModel[]) => void;
    login: (id: string, email: string, password: string) => void;
    modifyTodo: (todos: TodoModel) => void;
    addTodo: (todos: TodoModel) => void;

}

// @ts-ignore
export const UserContext = React.createContext<UserContextState>();

function App() {
    const [ userData, dispatch ] = useReducer(reducer, intiUser);

    const login = (id: string, email: string, password: string) => dispatch({
        type: UserActionType.USER_LOGIN,
        payload: { email, id, password }
    })


    const setTodos = (todos: TodoModel[]) => dispatch({ type: UserActionType.SET_TODO, payload: todos })
    const addTodo = (todo: TodoModel) => dispatch({ type: UserActionType.ADD_TODO, payload: todo})
    const modifyTodo = (todo: TodoModel) => dispatch({ type: UserActionType.MODIFY_TODO, payload: todo})
    const value = {
        user: userData,
        setTodos,
        login,
        addTodo,
        modifyTodo
    };

    return (
        <UserContext.Provider value={value}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/Todo" exact component={Todo}/>
                    <Route path="/TodoEdit" exact component={TodoEdit}/>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>

    );
}

export default App;
