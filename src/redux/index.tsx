import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import { saveState, loadState } from "./inmutable";

const persistedData = loadState();

const store = createStore(
  reducer,
  persistedData,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(function () {
  saveState(store.getState());
});

// Create the store to be passed to the wrapper
const makeStore = () => store;

// Export an assembled wrapper
export const wrapper = createWrapper(makeStore);
