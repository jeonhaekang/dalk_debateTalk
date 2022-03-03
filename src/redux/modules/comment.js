import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

//Action
const GET_COMMENTS = "GET_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const DEL_COMMENT = "DEL_COMMENT";

//Action Creator
const addComment = createAction(ADD_COMMENT, (boardId, comment) => ({ boardId, comment }))
const delComment = createAction(DEL_COMMENT, (boardId, commentId) => ({ boardId, commentId }))

//initialState
const initialState = {
    comment_list: {},
}

//MiddleWare
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
            draft.comment_list[action.payload.boardId] = action.payload.comment_list
        }),
        [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
            draft.comment_list[action.payload.boardId].unshift(action.payload.comment)
        }),
        [DEL_COMMENT]: (state, action) => produce(state, (draft) => {
            console.log(action)
        })
    },
    initialState
)



//Export Action Creator
const actionCreators = {
    addComment,
    addCommentDB,
    delComment,
    delCommentDB,
};

export { actionCreators }