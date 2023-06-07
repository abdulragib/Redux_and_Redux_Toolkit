import {createStore} from 'redux';

const store=createStore(reducer);
const history=[]

function reducer(state={amount:1},action){
    
   if(action.type==='increment')
   {
         state.amount=state.amount+1;
         return state;
   }
   else{
      return state;
   }
}

store.subscribe(()=>{
    history.push(store.getState());
    console.log(history)
})

setInterval(()=>{
   store.dispatch({type:"increment"})
},2000)

