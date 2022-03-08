import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

//Action
const GET_COMMENTS = "GET_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const DEL_COMMENT = "DEL_COMMENT";
const GET_AGREE = "GET_AGREE";
const GET_DISAGREE = "GET_DISAGREE";
const PUSH_AGREE = "PUSH_AGREE";
const PUSH_DISAGREE = "PUSH_DISAGREE";

//Action Creator
const getComment = createAction(GET_COMMENTS, (data) => ({ data }))
const addComment = createAction(ADD_COMMENT, (boardId, comment) => ({ boardId, comment }))
const delComment = createAction(DEL_COMMENT, (commentId) => ({ commentId }))
const getAgree = createAction(GET_AGREE, (agreeUserList) => ({agreeUserList}))
const getDisAgree = createAction(GET_DISAGREE, (disagreeUserList) => ({disagreeUserList}))
const pushAgree = createAction(PUSH_AGREE, (userId, index) => ({userId, index}))
const pushDisAgree = createAction(PUSH_DISAGREE, (userId, index) => ({userId, index}))

//initialState
const initialState = {
    //초기값 선언을 객체형이 아닌 배열로 선언해야함
    commentList: [],
    agreeUserList:[],
    disagreeUserList: [],
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

const pushAgreeDB = (commentId, index) => {
    return async function (dispatch, getState, { history }) {
        const userId = getState().user.user.id

        await apis
            .agreeComment(commentId)
            .then((res) => {
                console.log("찬성 DB 받기 성공", res)
                dispatch(pushAgree(userId, index));
                dispatch(getAgree(userId, index));
            })
            .catch((err) => {
                console.log("찬성 DB 받기 실패", err)
            })
    }
}

const pushDisAgreeDB = (commentId, index) => {
    return async function (dispatch, getState, { history }) {
        const userId = getState().user.user.id

        await apis
            .disagreeComment(commentId)
            .then((res) => {
                console.log("반대 DB 받기 성공", res)
                dispatch(pushDisAgree(userId, index));
                dispatch(getDisAgree(userId, index));
            })
            .catch((err) => {
                console.log("반대 DB 받기 실패", err)
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
        }),
        [GET_AGREE]: (state, action) => produce(state, (draft) => {
            draft.agreeUserList = action.payload.agreeUserList;
        }),
        [GET_DISAGREE]: (state, action) => produce(state, (draft) => {
            draft.disagreeUserList = action.payload.disagreeUserList;
        }),
        [PUSH_AGREE]: (state, action) => produce(state, (draft) => {
            const userId = action.payload.userId
            let agreeUserList = draft.comment[action.payload.index].agreeUserList;
            let disagreeUserList = draft.comment[action.payload.index].disagreeUserList;
            if(disagreeUserList.includes(userId)){
                disagreeUserList = disagreeUserList.filter((_userId,i) => {return _userId !== userId})
                agreeUserList = [...agreeUserList, userId]
                return;
            }
            if(agreeUserList.includes(userId)){
                agreeUserList = agreeUserList.filter((_userId,i) => {return _userId !== userId})
            }else{
                agreeUserList = [...agreeUserList, userId]
            }
        }),
        [PUSH_DISAGREE]: (state, action) => produce(state, (draft) => {
            const userId = action.payload.userId
            let agreeUserList = draft.comment[action.payload.index].agreeUserList;
            let disagreeUserList = draft.comment[action.payload.index].disagreeUserList;
            if(agreeUserList.includes(userId)){
                agreeUserList = agreeUserList.filter((_userId,i) => {return _userId !== userId})
                disagreeUserList = [...disagreeUserList, userId]
                return;
            }
            if(disagreeUserList.includes(userId)){
                disagreeUserList = disagreeUserList.filter((_userId,i) => {return _userId !== userId})   
            }else{
                disagreeUserList = [...disagreeUserList, userId]
            }
        }),

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
    getAgree,
    getDisAgree,
    pushAgree,
    pushAgreeDB,
    pushDisAgree,
    pushDisAgreeDB,
};  

export { actionCreators }