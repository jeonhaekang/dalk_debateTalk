import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

//Action
const GET_COMMENTS = "GET_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const DEL_COMMENT = "DEL_COMMENT";

//Action Creator
const getComment = createAction(GET_COMMENTS, (boardId, data) => ({ boardId, data }))
const addComment = createAction(ADD_COMMENT, (boardId, comment) => ({ boardId, comment }))
const delComment = createAction(DEL_COMMENT, (boardId, commentId) => ({ boardId, commentId }))

//initialState
const initialState = {
    commentList: {},
}

//MiddleWare
const getCommentDB = (boardId) => {
    return async function (dispatch, getState, { history }) {
        await apis
            .getComment(boardId)
            .then((res) => {
                console.log(res)
                dispatch(getComment(boardId, res.data))
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
                history.replace(`/detail/${boardId}`)
            })
            .catch((err) => {
                console.log('댓글 작성 에러', err)
            })
    }
}

const delCommentDB = (boardId, commentId) => {
    return async function (dispatch, getState, { history }) {
        if (!boardId || commentId) {
            return;
        }

        await apis
            .deleteComment(commentId)
            .then((res) => {
                dispatch(delComment(boardId, commentId));
                history.replace(`/detail/${boardId}`);
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
            const boardId = action.payload.boardId;
            const data = action.payload.data;
            draft.commentList[boardId] = data;
        }),
        [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
            draft.commentList[action.payload.boardId].unshift(action.payload.comment)
        }),
        [DEL_COMMENT]: (state, action) => produce(state, (draft) => {
            console.log(action)
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