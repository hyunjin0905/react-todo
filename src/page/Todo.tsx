import React, { useContext, useEffect, useState } from "react";
import { Fab, Grid, ListItem, makeStyles } from "@material-ui/core";
import { Page } from "../components/Page";
import { AppBar } from "../components/AppBar";
import AddIcon from '@material-ui/icons/Add';
import { UserActionType, UserContext } from '../App';
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { Todo as TodoModel } from "../model/Todo";


const Todo = () => {
    const { user, setTodos } = useContext(UserContext);
    console.log(user);
    const history = useHistory();

    const { addIcon, lists } = useStyle();
    const [ todo, setTodo ] = useState<TodoModel>();

    useEffect(() => {
        firebase
            .database()
            .ref(`/todos/${user.id}`)
            .get()
            .then(snapshot => {
                if (snapshot.exists()) {
                    const todos = convertToData(snapshot.val());
                    setTodos(todos);
                }
            })
            .catch(error => {
                console.error(error);
            })
    }, [todo]);

    const onHandleClick = () => history.replace("./TodoEdit");

    const onHandleListClick = (data: TodoModel) => {
        history.push({
            pathname: "./todoEdit",
            state: { todos: data, option: "MODIFY" }
        });
    }


    return (
        <Page>
            <AppBar>
            </AppBar>

            {
                user.todos && user.todos.length > 0 &&
                user.todos.map((data: any, index: number) => {
                    return (
                        <ListItem key={index.toString()} className={lists} onClick={() => {
                            console.log(data);
                            onHandleListClick(data)
                        }}>
                            <Grid container spacing={1} direction="column">
                                <Grid item>
                                    {`제목: ${data.title}`}
                                </Grid>
                                <Grid item>
                                    {`내용: ${data.contents}`}
                                </Grid>
                            </Grid>
                        </ListItem>
                    )
                })
            }
            <Fab color="secondary" aria-label="add" onClick={onHandleClick} className={addIcon}>
                <AddIcon/>
            </Fab>
        </Page>
    )
}


const convertToData = <T extends {}>(data: T) => {
    const entries = Object.entries<{ title: string, contents: string }>(data);

    const todos: TodoModel[] = [];
    for (let i = 0; i < entries.length; i++) {
        const [ key, value ] = entries[i];  // [ "dadfh23u4", { title: string, contents: string } ]
        todos.push({
            id: key,
            contents: value.contents,
            title: value.title
        });
    }
    console.log(todos);
    return todos;
}


const useStyle = makeStyles({
    addIcon: {
        position: "fixed",
        bottom: 15,
        right: 15
    },
    lists: {
        borderBottom: "1px solid #cecece !important"
    }
})

export default Todo;