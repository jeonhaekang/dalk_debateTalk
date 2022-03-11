import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

//Action
const GET_BANNER = "GET_BANNER";
const ADD_BANNER = 'ADD_BANNER';
const DEL_BANNER = "DEL_BANNER";

//Action Creator
const getBanner = createAction(GET_BANNER, (banners) => ({ banners }));
const addBanner = createAction(ADD_BANNER, (banner) => ({banner}));
const delBanner = createAction(DEL_BANNER, (carouselId) => ({carouselId}));

//initialState
const initialState = {
  //초기값 선언을 객체형이 아닌 배열로 선언해야함
  BannerList: [],
};

//MiddleWare
const getBannerDB = () => {
  //배너 목록 가져오기
  return function (dispatch, getState, {history}) {
    apis.getBannerList()
        .then((res) => {
          dispatch(getBanner(res.data));
        })
        .catch((err) => {
          console.log("배너 목록 가져오기 실패!", err);
        });
  };
};

const addBannerDB = (image) => {
  //배너 추가하기
  return function (dispatch, getState, { history }) {
    apis.addBanner(image)
        .then((res) => {
          console.log("배너 추가하기 완료", res)
          dispatch(addBanner(image))
          dispatch(getBannerDB())
        })
        .catch((err) => {
          console.log("배너 추가하기 실패", err)
        })
  };
};

const delBannerDB = (carouselId) => {
  //배너 삭제하기
  return function (dispatch, getState, { history }) {
    apis.delBannerList(carouselId)
        .then((res) => {
          console.log("배너 삭제하기 성공", res);
          dispatch(delBanner(carouselId));
          dispatch(getBannerDB())
        })
        .catch((err) => {
          console.log("배너 삭제 에러", err);
        });
  };
};

//Reducer
export default handleActions(
  {
    [GET_BANNER]: (state, action) =>
      produce(state, (draft) => {
        draft.BannerList = action.payload.banners;
      }),
    [ADD_BANNER]: (state, action) =>
      produce(state, (draft) => {
        draft.BannerList.unshift(action.payload.banner);
      }),
    [DEL_BANNER]: (state, action) =>
      produce(state, (draft) => {
        draft.BannerList = draft.BannerList.filter((el) => {
          if (el.carouselId === action.payload.carouselId) {
            return false;
          } else return true;
        })
      }),
  },
  initialState
);

//Export Action Creator
const actionCreators = {
  getBanner,
  addBanner,
  delBanner,
  getBannerDB,
  addBannerDB,
  delBannerDB,
};

export { actionCreators };