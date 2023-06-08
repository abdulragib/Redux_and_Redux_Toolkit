import { createStore, applyMiddleware,combineReducers } from "redux";
import logger from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk";

//action name constant
const init = "account/init";
const increment = "account/increment";
const decrement = "account/decrement";
const incrementByAmount = "account/incrementByAmount";
const incrementBonus="bonus/increment"

const store = createStore(
  combineReducers({
  account:accountReducer,
  bonus:bonusReducer,
}),
  applyMiddleware(logger.default, thunk.default)
);

const history = [];

function accountReducer(state = { amount: 5 }, action) {
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


function bonusReducer(state={points:0},action)
{
    switch(action.type)
    {
        case incrementBonus:
            return {points:state.points+1};

        case incrementByAmount:
            if(action.payload>=100)
            {
                return {points:state.points+1};
            }

        default:
            return state;
    }
}

//Action Creator
function incrementValue()
{
    return {type:increment};
}

function decrementValue()
{
    return {type:decrement}
}

function incrementByAmountValue(value)
{
    return {type:incrementByAmount,payload:value};
}

function incrementBonusValue(value){
    return{type:incrementBonus, payload:value};
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
    //store.dispatch(getUser(1));
//   store.dispatch(incrementByAmountValue(100));
    store.dispatch(incrementBonusValue(5))
}, 3000);
