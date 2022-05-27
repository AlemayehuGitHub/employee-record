import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from "@redux-saga/core";
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import rootSaga from './sagas/root'

const sagaMiddleware = createSagaMiddleware()
const middleware = [thunk];

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(sagaMiddleware, ...middleware)
)

sagaMiddleware.run(rootSaga)

export default store;