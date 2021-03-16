

export interface Todos {
    title: string,
    contents: string
}


export interface User {
    user: {
        email: string,
        password: string | number,
    },
    todos: Todos[],
}

