import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk";

//action name constant
const init = "init";
const increment = "increment";
const decrement = "decrement";
const incrementByAmount = "incrementByAmount";

const store = createStore(
  reducer,
  applyMiddleware(logger.default, thunk.default)
);
const history = [];

function reducer(state = { amount: 5 }, action) {
  switch (action.type) {
    case init:
      return { amount: action.payload };

    case increment:
      return { amount: state.amount + 1 };

    case decrement:
      return { amount: state.amount - 1 };

    case incrementByAmount:
      return { amount: state.amount + action.payload };

    default:
      return state;
  }
}

// store.subscribe(()=>{
//     history.push(store.getState());
//     console.log(history)
// })

//Action creators
function incrementValue() {
  return { type: increment };
}

//thunk middleware
 function getUser(id) {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:3000/account/${id}`);
    dispatch(initUser(data.amount));
  };
}
//always keep in mind we can only dispatch object to reducer not promises.

function initUser(value) {
  return { type: init, payload: value };
}

setTimeout(() => {
  store.dispatch(getUser(1));
}, 3000);
