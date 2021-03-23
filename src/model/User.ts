import { Todo } from "./Todo";


export interface User {
    id: string,
    user: {
        email: string,
        password: string | number,
    },
    todos: Todo[],
}

