import React, { Dispatch } from "react";
import { Todo } from "../model/Todo";
import { dataContextFactory } from "../model/dataContextFactory";


type TodoAction = AddTodoAction | DeleteTodoAction
                | UpdateTodoAction | InitTodoAction;

interface AddTodoAction {
    type: "ADD_TODO";
    payload: Todo;
}

interface DeleteTodoAction {
    type: "DELETE_TODO";
    payload: string;
}

interface UpdateTodoAction {
    type: "UPDATE_TODO";
    payload: Todo;
}

interface InitTodoAction {
    type: "INIT_TODO";
    payload: Todo[];
}


// const addActionCreator = (dispatch: Dispatch<TodoAction>) => (todo: Todo) => {
//     dispatch({ type: "ADD_TODO", payload: todo });
// }


const INITIAL_STATE: Todo[] = [];
const reducer = (state = INITIAL_STATE, action: TodoAction): Todo[] => {
    switch (action.type) {
        case "ADD_TODO":
            return [ ...state, action.payload ];
        case "DELETE_TODO":
            return state.filter((todo) => todo.id !== action.payload);
        case "INIT_TODO":
            return action.payload;
        case "UPDATE_TODO":
            const { payload } = action;
            return state.map((todo) => {
                if (todo.id === payload.id) {
                    return payload;
                }
                return todo;
            });
        default:
            return state;
    }
}


class TodoActionBuilder {
    constructor(public dispatch: Dispatch<TodoAction>) {}

    addTodo = (todo: Todo) => {
        this.dispatch({ type: "ADD_TODO", payload: todo });
    }

    deleteTodo = (id: string) => {
        this.dispatch({ type: "DELETE_TODO", payload: id });
    }

    updateTodo = (todo: Todo) => {
        this.dispatch({ type: "UPDATE_TODO", payload: todo });
    }

    init = (todos: Todo[]) => {
        this.dispatch({ type: "INIT_TODO", payload: todos });
    }
}


const [ TodoContext, TodoContextProvider ] = dataContextFactory(reducer, TodoActionBuilder, []);
export { TodoContext, TodoContextProvider };