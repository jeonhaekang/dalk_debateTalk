import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";
import { actionCreators as alertAction } from "./alert";

//Action
const GET_BANNER = "GET_BANNER";
const ADD_BANNER = "ADD_BANNER";
const DEL_BANNER = "DEL_BANNER";

//Action Creator
const getBanner = createAction(GET_BANNER, (banners) => ({ banners }));
const addBanner = createAction(ADD_BANNER, (banner) => ({ banner }));
const delBanner = createAction(DEL_BANNER, (carouselId) => ({ carouselId }));

//initialState
const initialState = {
  //초기값 선언을 객체형이 아닌 배열로 선언해야함
  BannerList: [],
};

//MiddleWare
const getBannerDB = () => {
  //배너 목록 가져오기
  return function (dispatch, getState, { history }) {
    apis
      .getBannerList()
      .then((res) => {
        dispatch(getBanner(res.data));
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "배너목록 가져오기 실패",
          })
        );
      });
  };
};

const addBannerDB = (image, url, status) => {
  //배너 추가하기
  return function (dispatch, getState, { history }) {
    const data = new FormData();
    data.append("image", image);
    data.append(
      "url",
      new Blob([JSON.stringify(url)], { type: "application/json" })
    );
    data.append("status", status);

    apis
      .addBanner(data)
      .then((res) => {
        // console.log(res);
        // dispatch(addBanner(data))
        // dispatch(getBannerDB())
      })
      .catch((err) => {
        // console.log(err.response);
        dispatch(
          alertAction.open({
            message: "배너 추가 실패",
          })
        );
      });
  };
};

const delBannerDB = (carouselId) => {
  //배너 삭제하기
  return function (dispatch, getState, { history }) {
    apis
      .delBannerList(carouselId)
      .then((res) => {
        dispatch(delBanner(carouselId));
        dispatch(getBannerDB());
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "배너 삭제 실패",
          })
        );
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
        });
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
