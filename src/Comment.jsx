// React is loaded and is available as React and ReactDOM
// imports should NOT be used
import React, { useContext, useEffect, useState } from "react";

/*
*

이전에 표시된 페이지를 주석으로 렌더링하고 다음 논리를 구현하는 CommnentList 구성 요소를 작성합니다.

vlaue "POST"가있는 버튼을 클릭 할 때마다 양식에서 입력 한 텍스트의 값을 포함하는 ul 요소의 맨 아래에 new <li> 요소가 추가되어야합니다.
thext 필드가 비어 있으면 댓글을 게시하지 않아야합니다.
댓글이 게시 된 후 텍스트 필드의 값을 지워야합니다.
예를 들어 댓글 테스트가 게시 된 후 목록의 내용은 다음과 같아야합니다.
* */
export const CommentList = (props) => {
    const [comment, setComment] = useState("");
    const [commnetList, setCommnetList] = useState([]);
    const onChangeValue = (e) => {
        setComment(e.target.value);
    }
    const onClickPosts = (e) => {
        if (!comment) return;
        console.log(commnetList, comment)
        setCommnetList([ ...commnetList, comment ]);
        setComment("");
    }
    return (
        <div>
            <form>
                <input type="text" value={comment} onChange={onChangeValue}/>
                <input type="button" value="Post" onClick={onClickPosts}/>
            </form>
            <Comments comments={commnetList}></Comments>
        </div>
    );
}

const Comments = ({ comments }) => {
    return (
        <ul>{comments.map((data, index) => <li key={index}>{data}</li>)}</ul>
    )
}