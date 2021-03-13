import React, { ChangeEvent, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import firebase from "firebase";
import { History } from "history";
import { Page } from "./components/Page";




interface PageProps {
    location: Location,
    history: History
}

const Login = (props: PageProps) => {
    const [ id, setId ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ errorLabel, setErrorLabel ] = useState<string>("");


    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
       if (e.target.name === "id") {
           setId(e.target.value);
       } else {
           setPassword(e.target.value);
       }
    }


    const onHandleClick = () => {
        firebase.auth().signInWithEmailAndPassword(id, password)
            .then((user) => {
                props.history.push("./Todo");
            })
            .catch((error) => {
                if(error.code === "auth/wrong-password") {
                    setErrorLabel("비밀번호가 틀렸습니다.");
                } else if (error.code === "auth/user-not-found") {
                   firebase.auth().createUserWithEmailAndPassword(id,password)
                       .then((user) => {
                           props.history.push("./Todo");
                       }).catch((error) => {
                   })
                } else if (error.code === "auth/invalid-email") {
                  setErrorLabel("올바른 형식의 이메일이 아닙니다.");
                } else {
                  setErrorLabel("로그인 도중 알수 없는 문제가 발생하였습니다.");
                }
            });
    }

    return(
        <Page>
            <form>
                <TextField label="아이디" name="id" onChange={onHandleChange}/>
                <TextField label="패스워드" name="password" onChange={onHandleChange}/>
                <Button onClick={onHandleClick}>
                  확인
                </Button>
            </form>
            <div>
              {errorLabel}
            </div>
        </Page>
    )
}

export default Login;
