import React, { useContext, useEffect, useState } from "react";
import { Fab, makeStyles, ListItem, Grid } from "@material-ui/core";
import { Page } from "../components/Page";
import { AppBar } from "../components/AppBar";
import AddIcon from '@material-ui/icons/Add';
import { UserContext } from '../App';
import { useHistory } from "react-router-dom";
import firebase from "firebase";


const Todo = () => {
    let history = useHistory();
    const { id, user } = useContext(UserContext);
    const onHandleClick = () => history.push("./TodoAdd")
    const { addIcon, lists } = useStyle();
    const [ todolist , setTodoList ] = useState<any>();
    useEffect(() => {
       firebase.database().ref(`/todos/${id}`).get().then((snapshop)=> {
          if(snapshop.exists()) {
              data(snapshop.val());

          }
      }).catch((error)=>{
          console.error(error);
      })
    },[]);

    const data = (data:any) => {

       // console.log(data);

    }
    return (
        <Page>
            <AppBar>
                { "내 할일 목록" + user.email }
            </AppBar>
            {
                1>0 ?
                    [1,2,3,4].map((data, index)=>{
                    return (
                        <ListItem key={index.toString()} className={lists}>
                            <Grid container spacing={1} direction="column">
                                <Grid item>
                                    {`제목: ${data}`}
                                </Grid>
                                <Grid item>
                                    {`내용: ${data}`}
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