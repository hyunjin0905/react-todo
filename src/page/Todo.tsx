import React, { useContext } from "react";
import { Fab, makeStyles, ListItem, ListItemText, Typography, Grid, Divider } from "@material-ui/core";
import { Page } from "../components/Page";
import { AppBar } from "../components/AppBar";
import AddIcon from '@material-ui/icons/Add';
import { UserContext } from '../App';
import { useHistory } from "react-router-dom";




const Todo = () => {
    let history = useHistory();
    const userData = useContext(UserContext);
    const onHandleClick = () => history.push("./TodoAdd")
    const { addIcon, lists } = useStyle();

    return (
        <Page>
            <AppBar>
                { "내 할일 목록" + userData.state.user.email }
            </AppBar>
            {
                userData.state.todos.length > 0 ?
                userData.state.todos.map((data, index)=>{
                    return (
                        <ListItem key={index.toString()} className={lists}>
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
                : "noData"
            }

            <Fab color="secondary" aria-label="add" onClick={onHandleClick} className={addIcon}>
                <AddIcon/>
            </Fab>
        </Page>
    )
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