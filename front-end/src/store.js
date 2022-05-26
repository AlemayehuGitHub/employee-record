import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store;