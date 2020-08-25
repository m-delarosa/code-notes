Video: https://www.youtube.com/watch?v=_QzwxvRLZo8&feature=youtu.be
Code: https://js-wt3exk.stackblitz.io


***Redux***

Redux is a state management container. One place to have all your state. Localizing your state to one store, so you don’t have to go looking through your application to find your state. You don’t have to track state down in individual components.

This is really good for large-scale apps with many, many components. 

Anytime you need to access or create state it will happen within the store. 

There’s only one way to change state in Redux (through a dispatch function), so it prevents you from mutating state. 

Some people don’t like using Redux because all components can access state. 


**Stores(object)**

createStore(action) 

Ex: 
const store = createStore(() => {})

A store is just an object with four functions: 
1. dispatch - takes in an action and allows us to change state
    1. disptach(action)
2. getState - let’s you retrieve state. kind of like formData. This get used a lot in a JS app and not usually used in a react app.
3. replaceReducer - switch your reducers out. mostly used with bigger applications where you have multiple stores. “Code Splitting” 
4. subscribe - it’s just an eventListener. Looks for changes in state. 


**Actions(object)**

Literally just an object with a type key and action value. 

action = {type: “INCREMENT”}

The can also have a payloads. Whatever you choose to do with that payload when it gets to the reducer is up to you. 

let incrementAction = {type: "INCREMENT", payload: 10}

Using the labels “type” and “payload” and all caps action value “INCREMENT” are really just convention, you can use whatever you want, but this is what is generally used. whatever you use, keep it consistent. 


**Reducers(function)**

Every reducer should only be for managing one piece of state.

Every reducer will have two arguments: (state, action)

State above is not the ENTIRE state. It’s just state for one piece of state. In this example count is a k/v pair in state. 

function count(state=0, action){
  switch(action.type){
    case"INCREMENT":
      return state + 1
    default: 
      return state
  }
}

If you have multiple actions your just write additional cases for it within the
reducer funcion. 

If something isn't changing in state, always look into your reducer first.

**Redux Flow**

1. Dispatch an action to the store. 
2. Store passed the Action into every reducer it has. 
3. Each reducer receives the action and runs it's function.
4. If looks at the action type, and if it matches it runs the corresponding code.

**Combine Reducers**

We use this in order to create a State object with multiple k/v pairs as we've
come to know it. 

1. In order to use you need to import it from the Redux library.
    import {createStore, combineReducers} from 'redux'

2. Create a reducers variable that will hold a state object with multiple reducers
as we commonly know it. 
    let reducers = combineReducers({count})

3. Now we can use it to create our store.
   const store = createStore(reducers)

4. Now if we want to call this particular part of state we can use 
    store.getState().reducerName

Now you can change multiple states with one action by assigning the same case in
a switch statement in the new reducer. 











