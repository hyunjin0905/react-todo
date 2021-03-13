import React from "react";
import { AppBar, Typography, Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';




interface TodoProps {
    locaiton: Location;
    history: History;
}

const Todo = (props: TodoProps) => {
    const { locaiton, history } = props;
    const onHandleClick = () => {
        console.log(123123);
    }


    return (
        <>
            <AppBar position="static">
                <Typography>할일 목록</Typography>
            </AppBar>
            <Fab color="primary" aria-label="add" onClick={onHandleClick}>
                <AddIcon/>
            </Fab>
        </>
    )
}

export default Todo;