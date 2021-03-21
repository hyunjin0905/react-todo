import React, { useContext, useEffect, useState } from "react";
import { Fab, makeStyles, ListItem, Grid } from "@material-ui/core";
import { Page } from "../components/Page";
import { AppBar } from "../components/AppBar";
import AddIcon from '@material-ui/icons/Add';
import { UserContext } from '../App';
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { Todos } from "../type/User";


const Todo = () => {
    let history = useHistory();
    const { id, user, dispatch } = useContext(UserContext);
    const { addIcon, lists } = useStyle();
    const [ todoList , setTodoList ] = useState<Todos[]>();
    const [ selected, setSelectedListItem ] = useState<boolean>(false);
    const [ todo, setTodo ] = useState<Todos>();
    const onHandleClick = () => history.push("./TodoAdd")
    useEffect(() => {
       firebase.database().ref(`/todos/${id}`).get().then((snapshop)=> {
          if(snapshop.exists()) {
              convertToData(snapshop.val());

          }
      }).catch((error)=>{
          console.error(error);
      })
    },[]);

    const convertToData = (data: any) => {

        const dataArr = Object.entries(data);
        const newArr:any[] = [];
         for (let i = 0; i < dataArr.length; i++) {
             dataArr[i].forEach((data, index)=>{
                 if(index === 1) {
                     newArr.push(dataArr[i][index]);
                 }
             })
         }
        setTodoList(newArr);
        dispatch({type: "TODO_ADD" })
    }

    const onHandleListClick = () => {
        history.push({ pathname:"./todoAdd", state: { todos: todo, option: "MODIFY" } });
    }


    return (
        <Page>
            <AppBar>
                { "내 할일 목록" + user.email }
            </AppBar>
            {
                1>0 ?
                    todoList?.map((data, index)=>{
                    return (
                        <ListItem key={index.toString()} className={lists} onClick={()=> {
                            setSelectedListItem(true);
                            setTodo(data)
                            onHandleListClick()
                        }} >
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