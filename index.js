import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';

//action name constant
const increment="increment";
const decrement="decrement";
const incrementByAmount="incrementByAmount";

const store=createStore(reducer,applyMiddleware(logger.default));
const history=[];

function reducer(state={amount:5}, action){
    
   if(action.type===increment)
   {
        return {amount:state.amount+1};
   }

   if(action.type===decrement)
   {
        return {amount:state.amount-1};
   }

   if(action.type===incrementByAmount)
   {
       return {amount : state.amount + action.payload}
   }
   
   return state;
}

store.subscribe(()=>{
    history.push(store.getState());
    console.log(history)
})


//Action creators
function incrementValue(){
    return {type:increment}
}

setInterval(()=>{
   store.dispatch(incrementValue())
},3000)

