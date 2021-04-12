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

    const history = useHistory();

    const { addIcon, lists } = useStyle();
    const [ selected, setSelectedListItem ] = useState<boolean>(false);
    const [ todo, setTodo ] = useState<TodoModel>();

    useEffect(() => {
        firebase
            .database()
            .ref(`/todos/${id}`)
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
    }, []);

    const onHandleClick = () => history.replace("./TodoAdd");

    const onHandleListClick = () => {
        history.push({
            pathname: "./todoAdd",
            state: { todos: todo, option: "MODIFY" }
        });
    }


    return (
        <Page>
            <AppBar>
            </AppBar>

            {
                todos && todos.length > 0 &&
                todos.map((data: any, index: number) => {
                    return (
                        <ListItem key={index.toString()} className={lists} onClick={() => {
                            setSelectedListItem(true);
                            setTodo(data)
                            onHandleListClick()
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