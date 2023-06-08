import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk";

//action name constant
// const init = "account/init";
const increment = "account/increment";
const decrement = "account/decrement";
const incrementByAmount = "account/incrementByAmount";
const incrementBonus = "bonus/increment";
const getAccUserFullFilled = "account/getUser/fullfilled";
const getAccUserRejected = "account/getUser/rejected";
const getAccUserPending = "account/getUser/pending";

const store = createStore(
  combineReducers({
    account: accountReducer,
    bonus: bonusReducer,
  }),
  applyMiddleware(logger.default, thunk.default)
);

const history = [];

function accountReducer(state = { amount: 5 }, action) {
  switch (action.type) {
    case getAccUserFullFilled:
      return { amount: action.payload, pending:false };

    case getAccUserPending:
      return { ...state, pending:true };

    case getAccUserRejected:
      return { ...state, error: action.error , pending:false};

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

function bonusReducer(state = { points: 0 }, action) {
  switch (action.type) {
    case incrementBonus:
      return { points: state.points + 1 };

    case incrementByAmount:
      if (action.payload >= 100) {
        return { points: state.points + 1 };
      }

    default:
      return state;
  }
}

//Action Creator
function incrementValue() {
  return { type: increment };
}

function decrementValue() {
  return { type: decrement };
}

function incrementByAmountValue(value) {
  return { type: incrementByAmount, payload: value };
}

function incrementBonusValue(value) {
  return { type: incrementBonus, payload: value };
}

function getAccountUserFullFilled(value) {
  return { type: getAccUserFullFilled, payload: value };
}

function getAccountUserRejected(error) {
  return { type: getAccUserRejected, error: error };
}

function getAccountUserPending() {
  return { type: getAccUserPending };
}

//thunk middleware
function getUserAccount(id) {
  return async (dispatch, getState) => {
    try {
      dispatch(getAccountUserPending())
      const { data } = await axios.get(`http://localhost:3000/account/${id}`);
      dispatch(getAccountUserFullFilled(data.amount));
    } catch (err) {
      dispatch(getAccountUserRejected(err.message));
    }
  };
}
//always keep in mind we can only dispatch object to reducer not promises.

setTimeout(() => {
  store.dispatch(getUserAccount(1));
  //   store.dispatch(incrementByAmountValue(100));
  // store.dispatch(incrementBonusValue(5))
}, 3000);
