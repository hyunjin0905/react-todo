import React, { ChangeEvent, FC, useContext, useState } from "react";
import { Page } from "../components/Page";
import { AppBar } from '../components/AppBar';
import { TextField, makeStyles } from "@material-ui/core";
import { UserContext } from '../App';
import firebase from "firebase";
import { useHistory, useLocation } from "react-router-dom";
import { Todo as TodoModel } from "../model/Todo";




interface locationState {
    todos: TodoModel,
    type: string
}

const TodoEdit: FC = () => {
    const location = useLocation();
    const { state } = useLocation<locationState>()
    const history = useHistory();
    console.log(state);

    const { addTodo, user, modifyTodo } = useContext(UserContext);
    const [ title, setTitle ] = useState<string>(state.todos? state.todos.title : "" );
    const [ contents, setContents ] = useState<string>(state.todos? state.todos.contents : "");
    const { formWrap, textFieldWrap, buttonWrap } = useStyle();

    const saveTodoData = () => {
        firebase
            .database()
            .ref(`/todos/${user.id}`)
            .push({ id: "", title: title, contents: contents })
            .then(res => {
                console.log(res);
                if (state.type === "MODIFY") {
                    modifyTodo({ id: "", title: title, contents: contents })
                } else {
                    addTodo({ id: "", title: title, contents: contents })
                }
                history.push("./Todo");
            })
            .catch(error => {
                console.error(error);
            });

    }


    const onHandleClick = (e: React.MouseEvent) => {
        saveTodoData();

    }

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "title") setTitle(e.target.value);
        else setContents(e.target.value);
    }

    return (
        <Page>
            <AppBar>{"할일 추가"}</AppBar>
            <form className={formWrap}>
                <TextField type="text" className={textFieldWrap} name="title" label="제목" value={title}
                           onChange={onHandleChange}/>
                <TextField type="text" className={textFieldWrap} name="contents" label="오늘 할 일" value={contents}
                           onChange={onHandleChange}/>
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

export default TodoEdit;
