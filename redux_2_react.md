***React-Redux***

1. In your index.js:
   1. Import the createStore and combineReducers function from 'redux': import { createStore, combineReducers } from 'redux'
   2. Declare your reducers variable: const reducer = combineReducers({ todos })
   3. Create your store as an empty object: const store = createStore(() => {})
   4. Attach the store to your React app:
      1. import Provider from 'react-redux': import { Provider } from 'react-redux'
      2. Provider is what links redux to react. Any child of Provider can access
         the store.
      3. Wrap your App component in the JSX by a Provider component, you pass
         the store in as a prop:

        ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
            <App />
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
        )

        *You can see them in the componenets dev tools. 
        **We don't have to use subscribe in React because it's already listening
        to changes.
        **We also won't have to use getState().
        ***Mostly what we'll use is the dispatch function in React.

       1. Create a reducer under the store decleration. 

        function todos(state = [], action) {
        switch (action.type) {
            default:
            return state
        }
        }

2. No we move on to the App.js file,
   1. We're going to import connect, which is a function that connects the
      component you're in to the provider. 
      
      import { connect } from 'react-redux
   2. Add the connect function to your export. 
      
      The connect function takes up to four functions (two of whch are important) and returns another function:
      connect(aFunctionThatReceivesStateAndCreatesPropsFromThatState, aFunctionThatReceivesDispatchAndCreatesPropsThatUseDispatch, x, x ) This is
      why components will never be able to change state directly.
      
      ex: export default connect(mapStateToProps, null)(App)

      The kidding paranthesis "Currying" means that after the connect function is invoked,
      the resulting function of it is invoked and the App component is passed in
      as a parameter. 

      What it would look like under the hood:

      function connect(function1, function2) {
          return (component) => {}
      }

      What is mapStatetoProps doing?

      function mapStateToProps(state) {
          return {
              todos: state.todos
          }
      }

      It returns an object because props an object and our goal is to pass
      state as props.