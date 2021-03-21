import React, { ChangeEvent, useContext, useState } from "react";
import { Page } from "../components/Page";
import { AppBar } from '../components/AppBar';
import { TextField, Button, makeStyles } from "@material-ui/core";
import { UserContext } from '../App';
import firebase from "firebase";
import { useHistory, useLocation } from "react-router-dom";

const TodoAdd = () => {
    let history = useHistory();
    let location = useLocation();
    console.log(location);
    const { dispatch, id, todos, user } = useContext(UserContext);
    const [ title, setTitle ] = useState<string>("");
    const [ contents, setContents ] = useState<string>("");
    const { formWrap, textFieldWrap, buttonWrap } = useStyle();

    console.log(id);

    const saveTodoData = () => {
         firebase.database().ref(`/todos/${id}`).push({ title: title, contents:contents });
         history.push("./Todo");
    }

    const onHandleClick = (e: React.MouseEvent) => {
        saveTodoData();

    }

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "title")  setTitle(e.target.value);
        else setContents(e.target.value);
    }

    return (
        <Page>
          <AppBar>{"할일 추가"}</AppBar>
          <form className={formWrap} >
              <TextField type="text" className={textFieldWrap} name="title" label="제목" value={title} onChange={onHandleChange}/>
              <TextField type="text" className={textFieldWrap} name="contents" label="오늘 할 일" value={contents} onChange={onHandleChange} />
          </form>
          <button type="submit" className={buttonWrap} onClick={onHandleClick}>저장</button>
        </Page>
    )
}


const useStyle = makeStyles({
    formWrap: {
        padding: 20
    },
    textFieldWrap: {
        width: "100%"
    },
    buttonWrap: {
        width: "100%",
        height: 56,
        position: "fixed",
        bottom: 0,
        backgroundColor: "gray",
        color: "white"
    }
})

export default TodoAdd;
