import {createStore} from 'redux';

const store=createStore(reducer);

function reducer(state={amount:1},action){
    
   if(action.type==='increment')
   {
         return {amount:state.amount+1}
   }
   else{
      return state
   }
}
console.log("before dispatch",store.getState())
store.dispatch({type:"increment"})
console.log("After dispatch",store.getState())