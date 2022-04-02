import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import promiseMiddleware from "redux-promise-middleware";

import user from "./modules/user";
import chat from "./modules/chat";
import item from "./modules/item";
import comment from "./modules/comment";
import banner from "./modules/banner";
import image from "./modules/image";
import alert from "./modules/alert";
import search from "./modules/search";
import notice from "./modules/notice";
import infinityScroll from "./modules/infinityScroll";
import spinner from "./modules/spinner";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  // 모듈 적어주세요.
  item,
  user,
  chat,
  comment,
  banner,
  image,
  alert,
  search,
  notice,
  infinityScroll,
  spinner,

  router: connectRouter(history),
});

const middlewares = [
  thunk.withExtraArgument({ history: history }),
  promiseMiddleware,
];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// if (env === "development") {
//   const { logger } = require("redux-logger");
//   middlewares.push(logger);
// }

// DevTool사용 설정
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
