import React, { ChangeEvent, useContext, useState } from "react";
import { Page } from "../components/Page";
import { AppBar } from '../components/AppBar';
import { TextField, Button, makeStyles } from "@material-ui/core";
import { UserContext } from '../App';



const TodoAdd = () => {
    const { dispatch, state } = useContext(UserContext);

    const { formWrap, textFieldWrap, buttonWrap } = useStyle();
    const [ title, setTitle ] = useState<string>("");
    const [ contents, setContents ] = useState<string>("");

    const onHandleClick = (e: React.MouseEvent) => {

        dispatch({user: state.user, todo: [ { title: title, contents: contents }]});
        console.log(state);

    }
    const onHandleChage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "title")  setTitle(e.target.value);
        else setContents(e.target.value);
    }

    return (
        <Page>
          <AppBar>{"할일 추가"}</AppBar>
          <form className={formWrap} >
              <TextField type="text" className={textFieldWrap} name="title" label="제목" value={title} onChange={onHandleChage}/>
              <TextField type="text" className={textFieldWrap} name="contents" label="오늘 할 일" value={contents} onChange={onHandleChage} />
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
