import React, { ChangeEvent, useContext, useState } from "react";
import { Button, makeStyles, TextField } from "@material-ui/core";
import firebase from "firebase";
import { Page } from "../components/Page";
import { AppBar } from "../components/AppBar";
import { UserContext, UserActionType } from '../App';
import { useHistory } from "react-router";


const Login = () => {
    const history = useHistory();
    const { dispatch, id } = useContext(UserContext);
    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ errorLabel, setErrorLabel ] = useState<string>("");
    const { pageWrap, textFieldWrap, buttonWrap, errorMessage } = useStyle();
    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "id") {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }


    const onHandleClick = () => {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user);
                dispatch({
                        type: UserActionType.USER_LOGIN,
                        id: user.user?.uid,
                        user: { email: email, password: password }
                    }
                );
                history.replace("./Todo");

            })
            .catch((error) => {
                console.log(error);
                if (error.code === "auth/wrong-password") {
                    setErrorLabel("비밀번호가 틀렸습니다.");
                } else if (error.code === "auth/user-not-found") {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then((user) => {
                            history.replace("./Todo");
                        }).catch((error) => {
                    })
                } else if (error.code === "auth/invalid-email") {
                    setErrorLabel("올바른 형식의 이메일이 아닙니다.");
                } else {
                    setErrorLabel("로그인 도중 알수 없는 문제가 발생하였습니다.");
                }
            });
    }


    return (
        <Page>
            <AppBar>
                {"로그인"}
            </AppBar>
            <form className={pageWrap}>
                <TextField label="아이디"
                           name="id"
                           onChange={onHandleChange}
                           className={textFieldWrap}/>
                <TextField label="비밀번호"
                           name="password"
                           type="password"
                           onChange={onHandleChange}
                           className={textFieldWrap}/>

            </form>
            <Button onClick={onHandleClick} className={buttonWrap}>
                확인
            </Button>
            <div className={errorMessage}>
                {errorLabel}
            </div>
        </Page>
    )
}


const useStyle = makeStyles({
    pageWrap: {
        padding: 20
    },
    textFieldWrap: {
        width: "100%"
    },
    buttonWrap: {
        width: "100%",
        height: 56,
        position: "fixed",
        backgroundColor: "gray",
        bottom: 0,
        color: "white",
        fontWeight: "bold",
        fontSize: 14
    },
    errorMessage: {
        padding: 20,
        fontSize: 12,
        color: "red"
    }

});
export default Login;
