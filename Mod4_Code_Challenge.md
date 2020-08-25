0.0 If `npm start` won't work for you, run:

 `rm -rf node_modules package-lock.json yarn.lock` and then `npm install`

0. Write fetch in this manner if it isn't given to you:

  componentDidMount() {
    fetch('https://rickandmortyapi.com/api/character/')
      .then(response => response.json())
      .then(res => this.setState({
        characters: res.results
      }))
  }

1. Create state for favorites, so you can store it later.

this.state = {
      characters: [],
      favorites: []
    }

2. Create your new component file. "Favorites.js"

import React from 'react'

export default function Favorites(props) {
    return (
        <section className='favorites'>
            <ul>
                FAVORITES
            </ul>
        </section >

    )
}

3. Add styling to app.css, so you can see the new favorites <section> as you
   work on it. Display flex the ul as well, so it doesn't show vertically. 

.favorites ul {
  display: flex
  background-color: darkorange;
}

4. Bring the favorites component into your app.js. 

import Favorites from './components/Favorites'

5. Display the new component by adding it to the render(), return (). 

<Favorites />

6. Now we need to setup our cards to push their information up to the favorites
   array. We do this by creating an addToFavorites function in App.js that sets
   the state for favorites. Remember we do not mutate state directly. We use the
   spread operator to make a copy instead. We want to use ES6 syntax here for
   our functions otherwise we will have to create a "bind".

addToFavorites = (character) => {
    this.setState({ favorites: [...this.state.favorites, character ]})
  }

*This function we plan on passing all the way down to the card.js, so we can use
it there and pass in the character argument it needs. 

7.  Now we start "drilling." We start to pass this function through every level
   until we get it to Card.js. We do this by passing it as a prop attribute JSX. 

We accomplish this by passing the addToFavorites function down as an attribute
or prop in the MainContainer element. 

For the bonus, use the action={this.addToFavorites method instead} =>
action={props.action} as you keep drilling. 

App.js
<MainContainer characters={this.state.characters} addToFavorites={this.addToFavorites} />

MainContainer.js
<CardContainer addToFavorites={props.addToFavorites} characters={props.characters} />

CardContainer.js
<CardContainer addToFavorites={props.addToFavorites} characters={props.characters} />


We can double check this within the component tab in DevTools, by clicking on
each component and checking to see if it shows up as a prop that is a the
function.

8. Now we need to add eventListeners to each card, in react, we do this by
   adding "onClick" attribute:
 
<div className='card' onClick={handleClick}>

The handleClick function being described above is really common in react. It
goes within the same function scope, just above. 

    function handleClick() {
        addToFavorites(character)
    }

9. In order to use "character" above instead of props.character, you need to
   destructure props by doing the following as the first line of code within
   your function:

    const { character, addToFavorites } = props

10. Test it by watching the app component's state in dev tools. When you click a
    card do you see the state of favorites change?

11. Now we need to pass down this new state of favorites to our Favorites.js
    component, as a prop.

    <Favorites favorites={this.state.favorites} />

    Check it with DevTools to make sure this prop is making it to favorites component.

12. Now we need to make the cards appear in the Favoites component the same way
    we made them appear in the CardContainer.js component. Let's copy and past that in as
    a starting point. 

   export default function Favorites(props) {

    const characters = props.favorites.map(character => {
        return <Card character={character} />
    })

    return (
        <section className='favorites'>
            <ul>
                {characters}
            </ul>
        </section >
    )
} 

We change characters to favorites on line 3, and change Favorites placeholder to
"{characters}" in the ul as we did above and they should start to display in the
browser after importing the Card component in this file. 

    import Card from './Card'

Test in browser now. 





13. Now we see tha multiple characters cards of the same character can show up
    on our favorites list. In order to fix this, we will add a condition using
    .find to our addToFavorites function first to check to see if it already
    exists before we add the card. 

addToFavorites = (character) => {
    if (!this.state.favorites.find(charac => charac.id === character.id))
      this.setState({ favorites: [...this.state.favorites, character] })

}

They should not appear twice now. 


***Removing Favorites***


14. Now we need to add a new funcitonality: when you click a card in the
    favorites component it removes it from favorites. 
    
    We do this by exploiting the differeance between the cards below that have the addToFavorites
    function passed down as a prop and the cards above who do not have that
    prop. So basically, if you were to click the cards above right now, you
    would run into a typeError, because the "onClick" eventListener on the card
    will run "handleClick" which will run the "addToFavorites", but it will
    realize it has no "addToFavorites" function available. 

    Do do this we write a new function below the addToFavorite function:

  removeFavorite = (character) => {
    let newFavorites = this.state.favorites.filter(fav => fav !== character)
    this.setState({ favorites: newFavorites })
  }

    Then we pass down that function to the favorites component, so we can use it there. 

App.js
<Favorites favorites={this.state.favorites} removeFavorite={this.removeFavorite} />

Favorite.js
return <Card removeFavorite={props.removeFavorite} character={character} />

15. Lastly, we need to tell our card component, which holds the handleClick function to either do the `addToFavorites`
or the `removeFavorite` function depending on whether or not the
"addToFavorites" property exits on the card.

Now that we have passed the removeFavorite function down to the card component,
we can add `removeFavorite` to our destructured props, in the card component.  

const { character, addToFavorites, removeFavorite } = props

Now we can add a condition to our handleClick function, so that it knows what to
run in each scenario:

    function handleClick() {
        if (addToFavorites) { addToFavorites(character) }
        else { removeFavorite(character) }
    }

Test in browser. It should be working now. 

***Bonus***

In your `handleClick` function you don't need to use a conditional if you simply
pass down both the `addToFavorites` and `removeFavorite` functions as a prop
named "action". Now it will run the corresponding function depending on which
prop has been passed down to that particular card component. 

Clip: https://youtu.be/YPpnjOnQoB8?t=4074






