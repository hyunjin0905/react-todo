import React from "react";
import { AppBar,Button } from "@material-ui/core";



interface TodoAddProps {


}

const TodoAdd = (props: TodoAddProps) => {



    return (
        <>
          <AppBar>{"할일 추가"}</AppBar>
          <form>
              제목 : <input type="text"/>
              내용 : <input type="textarea"/>
          </form>
          <Button>저장</Button>
        </>
    )
}


export default TodoAdd;