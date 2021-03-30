import React from "react";
import { User } from "../model/User";

type UserAction = LoginAction | LogoutAction | RegisterAction;

interface LoginAction {
    type: "LOGIN",
    payload: User
}

interface  LogoutAction {
    type: "LOGOUT",
    payload: string
}

interface RegisterAction {
    type: "REGISTER",
    payload: User
}



export {};