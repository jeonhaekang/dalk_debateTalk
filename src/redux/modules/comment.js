import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

//Action
const GET_COMMENTS = "GET_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const DEL_COMMENT = "DEL_COMMENT";

//Action Creator
const getComment = createAction(GET_COMMENTS, (data) => ({ data }))
const addComment = createAction(ADD_COMMENT, (boardId, comment) => ({ boardId, comment }))
const delComment = createAction(DEL_COMMENT, (commentId) => ({ commentId }))

//initialState
const initialState = {
    //초기값 선언을 객체형이 아닌 배열로 선언해야함
    commentList: [],
}

//MiddleWare
const getCommentDB = (boardId) => {
    return async function (dispatch, getState, { history }) {
        await apis
            .getComment(boardId)
            .then((res) => {
                console.log(res)
                dispatch(getComment(res.data))
            })
            .catch((err) => {
                console.log("댓글불러오기 에러", err)
            })
    }
}


const addCommentDB = (boardId, comment) => {
    return async function (dispatch, getState, { history }) {
        if (!boardId) {
            return;
        }
        await apis
            .addComment(boardId, comment)
            .then((res) => {
                console.log(res);
                dispatch(getCommentDB(boardId))
                .then(console.log("댓글 로딩 완료"))
                .catch(console.log("댓글 로딩 실패"))
            })
            .catch((err) => {
                console.log('댓글 작성 에러', err)
            })
    }
}

const delCommentDB = (commentId) => {
    return async function (dispatch, getState, { history }) {

        await apis
            .deleteComment(commentId)
            .then((res) => {
                console.log(res)
                dispatch(delComment(commentId));
            })
            .catch((err) => {
                console.log('댓글 삭제 에러', err)
            })
    }
}


//Reducer
export default handleActions(
    {
        [GET_COMMENTS]: (state, action) => produce(state, (draft) => {
            // const boardId = action.payload.boardId;
            // 게시글 안에서 코멘트를 불러오기 때문에 굳이 boardId ㄴㄴ
            draft.commentList = action.payload.data;
        }),
        [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
            draft.commentList[action.payload.boardId].unshift(action.payload.comment)
        }),
        [DEL_COMMENT]: (state, action) => produce(state, (draft) => {
            const new_comment = draft.commentList.filter(
                (c) => c.commentId !== action.payload.commentId
              );
              draft.commentList = new_comment;
        })
    },
    initialState
)



//Export Action Creator
const actionCreators = {
    getComment,
    getCommentDB,
    addComment,
    addCommentDB,
    delComment,
    delCommentDB,
};

export { actionCreators }