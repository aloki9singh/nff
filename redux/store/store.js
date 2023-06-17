import {
    applyMiddleware,
    combineReducers,
    compose,
    legacy_createStore,
  } from "redux";
  import { mentorAuthReducer } from "./reducers/mentor.reducer";
  import thunk from "redux-thunk";
  import { composeWithDevTools } from 'redux-devtools-extension';
  const rootReducer = combineReducers({ authManagerMentor: mentorAuthReducer});
  
  
  export const store = legacy_createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  