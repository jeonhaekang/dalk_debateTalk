import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

//Action
const GET_COMMENTS = "GET_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DEL_COMMENT = "DEL_COMMENT";

//Action Creator
const addComment = createAction(ADD_COMMENT, (boardId, content) => ({ boardId, content }))
const editComment = createAction(EDIT_COMMENT, (boardId, commentId, newComment) => ({ boardId, commentId, newComment }))
const delComment = createAction(DEL_COMMENT, (boardId, commentId) => ({ boardId, commentId }))

//initialState
const initialState ={
    comment_list: {},
}

//MiddleWare

//Reducer
export default handleActions(
    {
        [GET_COMMENTS]: (state, action) => produce(state, (draft) => {
            draft.comment_list[action.payload.boardId] = action.payload.comment_list
        }),
        [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
            draft.comment_list[action.payload.boardId].unshift(action.payload.content)
        }),
        [EDIT_COMMENT]: (state, action) => produce(state, (draft) => {
            let idx = draft.comment_list[action.payload.boardId].findIndex((c) => c.commentId === action.payload.commentId)
            draft.comment_list[action.payload.boardId][idx] = {...draft.comment_list[action.payload.boardId][idx], ...action.payload.newComment }
        }),
        [DEL_COMMENT]: (state, action) => produce(state, (draft) => {
            console.log(action)
        })
    },
    initialState
)



//Export Action Creator
const actionCreators ={

};

export {actionCreators}