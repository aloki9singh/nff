import {
	applyMiddleware,
	combineReducers,
	compose,
	legacy_createStore,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { mentorAuthReducer } from "../reducers/mentor.reducer";
const rootReducer = combineReducers({ authManagerMentor: mentorAuthReducer });

export const store = legacy_createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
