

export interface Todos {
    title: string,
    contents: string
}


export interface User {
    id: string,
    user: {
        email: string,
        password: string | number,
    },
    todos: Todos[],
}

