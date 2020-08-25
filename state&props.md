Code Reference: https://github.com/m-delarosa/react-state-props-w-damon

0. To install create react app on your computer run: _npm i -g create-react-app_
   \*Only have to do this once.

1. To create race app run: _create-react-app project-name_
2. Open up the folder in VS Code.
3. Start up the server by running _npm start_ at the root of your project folder.
4. In App.js change line 5 into a class:

_class App extends React.Component {_
**If you're using hooks you won't need to do this.**

Another way to set state is the following:

import React, { Component } from 'react'
import './App.css'

Class App extends Component {

    state = {
        name: 'Damon',
        age: 26
    }

}

1. Remove the contents of the first div, and instead have it return a Test H1.
   **A JSX object can only hold one top-level element**

2. Add your class constructor, where you list your classes attributes. So in
   this case we will be inheriting from our component class. The component class
   is what holds the state attribute. If you do not put it in your constructor
   you will not have access to it in your "App" class. Example constructor:

   constructor(){
   super()
   this.state = {
   name: 'Mike'
   age: 34

   }
   }

3. Now we can use curly brackets to display from out state in our JSX:

render() {
return (

<div className="App">
<h1>Hi this is {this.state.name}</h1>
<h2>I am {this.state.age} years old.</h2>
</div>
)
}

8. App.js file should end up looking like this:

import React, { Component } from "react"
import "./App.css"

class App extends Component {
// constructor() {
// super()
// this.state = {
// name: "Mike",
// age: 34,
// }
// }

state = {
name: "Mike",
age: 34,
location: "",
}

birthday = () => {
this.setState({ age: this.state.age + 1 })
}

render() {
return (

<div className="App">
<h1>Hi this is {this.state.name}</h1>
<h2>I am {this.state.age} years old.</h2>
<button onClick={this.birthday}>Birthday</button>
</div>
)
}
}

export default App

**_Creating Components_**

1. Create the [Component.name].js file. Create a component folder to put this in
   if you desire.
2. In this file, the first thing we do is import react in order to access JSX.

import React from "react"

3. Then we choose how we'd like to export it.

**Choosing an export method: Name or Nameless**

_This is an example of a "named" export:_

- Mainly used when you're going to be exporting multiple things from a file.

  export class Age extends React.Component {}

You will have to import using this method in the App.js file:

    import { Age } from "./Age"

\*can also import multiple "named" imports like so (hometown here is a constant
delcared in the Age class):

    import { Age, hometown } from "./Age"

_This is an example of an "unnamed" export:_

- You can only set one per file.
- This is what is mostly used when exporting components because you're likely
  not exporting anything else from this file.
- You can call it whatever you want on the import, it will return the defualt
  from that file. Obviously be semantic about it.

Export:

    export default class Age extends React.Component {}

Import:

    import [whatever] from './Age'

4. Within the component file, we go on to create or class (stateful) or function (stateless)
   comoponent. Note the differeance in how props get passed down.

_Class Component:_

export default class Age extends React.Component {
//This is what is happening in the background, we don't need to code it:
// constructor(props) {
// this.props = props
// }

    render() {
    console.log(this.props)
    return <h2>I am {this.props.age} years old</h2>
    }

}

**Functional Component:**

- Functional compnents never taken in any other params other than "props"

export default function Age(props) {
console.log(props)

    return <h2>I am {props.age} years old</h2>

}

3. Next we create a return in our class or functional component.

_Class Example_

- for classes we need to call the render function first, and then put our return
  within there.
- For multi-line returns we use return (...) for single you can put as shown below.

render() {
console.log(this.props)
return <h2>I am {this.props.age} years old</h2>
}

_Function Example_

pass down the prop in our App.js file like so:

- Example below include options for passing in multiple props, props for an
  object or an entire object.

render() {
return (

<div className="App">
<h1>Hi this is {this.state.name}</h1>
<Age
          age={this.state.age}
          name={this.state.name}
          active={true}
          friendAge={this.state.friend.age}
        />
<button onClick={this.birthday}>Birthday</button>
</div>
)
}

**EXTRA: How to write props that pass down an entire object using the spread
operator**

<Age {...this.state.student}/>

In Age.js, running console.log(props) => { name: "Jon", age: 27, hometown:
"Florida"}
\*Spread takes each key value pair from an object and creates it as k/v pairs in
as a seperate k:v in the props object.
