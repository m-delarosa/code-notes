**Mod3: Build an App with Strong Params and Validations**

1. Create new rails project “rails new project-name —api”
2. In gem file, uncomment “cors” and “bcrypt.” Run bundle install.
3. Config > Initializers > cors.rb Uncomment cors code and replace origins with \* or the frontend URL of the website.
4. Generate a resource: model, routes, migrations and controllers. “rails g resource User username email password_digest”
5. Jump into new migration file and verify you’re creating everything you need. If not feel free to add now before migrating.
6. Run migration: “rails db:migrate”
7. Check Schema.rb to make sure everything made it into your table correctly.

**Add Validations**

1. Go to your new models model.rb file
2. Add “has_secure_password” to to the top.
3. List validations and custom error messages under relations if you have any. Example:

validates :name, :username, :email, presence: {message: "%{attribute} cannont be blank."}
validates :username, length: { minimum: 6, maximum: 12, message: "%{attribute} must be between 6 and 12 charaters long." }
validates :username, uniqueness: {message: "%{attribute}s must be unique, and %{value} has already been taken."}

**Add Strong Params**

1. Jump to your model’s controller file.
2. Create the controller actions that you need this time using “user_params” for strong params.

def index
@users = User.all

    render json: @users

end

def show
@user = User.find(params[:id])

    render json: @user

end

def create
@user = User.new(user_params)
if @user.save
render json: {message: "User was successfully created!", user: @user}
else
render json: @user.errors.messages
end
end

def update
@user = User.find(params[:id])
if @user.update(user_params)
render json: @user
else
render json: @user.errors.messages
end
end

def destroy
@user = User.find(params[:id])
@user.destroy

    redirect_to action: "index"

end

private

def user_params
params.require(:user).permit([:name, :username, :email, :password])
end

3. Try a post in postman as a test. Make sure you are in the POST>Body>Raw>Json Data Type selected configuration.
4. Start by testing a successful post. Then try to hit your validation errors.
5. Use this format (do not copy/paste into postman):
   {
   “user”: {
   “name”: “Jared”,
   “username”: “junior”,
   “email”: “jared@mail.com”,
   “another_attribute”: “ignores this one”
   }
   }

**Create Frontend**

1.  Make a separate file and repo for you frontend.
2.  touch index.html app.js style.css
3.  Go through your typical tests of linking the JS and styling and running lite-server.
4.  Add event listener for “DOMContentLoaded” 1. Within that event listener add the fetch for your backend.
    document.addEventListener("DOMContentLoaded", () => {
    console.log("%cDOM Content Loaded and Parsed!", "color: magenta")

function getExistingUserData() {
fetch("http://localhost:3000/users")
.then((response) => response.json())
.then((result) => console.log("users", result))
}

getExistingUserData()
})

5.  Add your form to your html. You will not need to specify action in the tag anymore. You are making it dynamically now.  
    <input type="text" name="name" id="name" placeholder="name" />
    <input type="text" name="username" id="username" placeholder="username" />
    <input type="text" name="email" id="email" placeholder="email" />
    <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
6.  Grab form id and set it to a const in JS. Verify that you’ve grabbed it with a console.log
    const newUserForm = document.querySelector("#add-new-user”)
    console.log(newUserForm)
7.  Add an event listener for the form, make it a ‘submit’ event. Test w/ console. to make sure it doesn’t reload the page.  newUserForm.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(newUserForm)
    })
8.  Add a const to hold FormData (prototype).
    const formData = new FormData(newUserForm)
    console.log(formData)
9.  Assign names to formData.get 
    newUserForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(newUserForm)
    const name = formData.get("name")
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")

10. Now we send it to our backend with a custom fetch.

        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              name: name,
              username: username,
              email: email,
              password: password,
            },
          }),
        })
          .then((response) => response.json())
          .then(console.log)

    })
    })

11. Add a function that will create a usercard. Whenever a new user us created.

function createUserCard(user) {
const userCard = document.createElement("div")
userCard.className = "user-card"
console.log(userCard)
console.log(user)
}

12. Modify the last .then above to the function to invoke the function each time
    a user is created.

    .then((result) => createUserCard(result.user))
    //we have to use result.user here because we have modified the result by including a message.

13. Within the function, create, modify and append the html elements that will go in the card. Test.

function createUserCard(user) {
const userCard = document.createElement("div")
userCard.className = "user-card"

const name = document.createElement("h3")
const username = document.createElement("p")
const email = document.createElement("p")

name.innerText = user.name
username.innerText = user.username
email.innerText = user.email

userCard.append(name, username, email)
document.body.append(userCard)
}

**Switch it to Optimisstic Rendering**

1. Above the fetch request, add a new constant to hold the object of the new User.
2. Invoke the function that displays the newUserCard directly below before the fetch.
3. Place the newUser variable where necessary to clean up your code. Should end up looking something like this:

document.addEventListener("DOMContentLoaded", () => {
console.log("%cDOM Content Loaded and Parsed!", "color: magenta")

function getExistingUserData() {
fetch("http://localhost:3000/users")
.then((response) => response.json())
.then((result) => console.log("users", result))
}

getExistingUserData()

const newUserForm = document.querySelector("#add-new-user")

newUserForm.addEventListener("submit", (event) => {
event.preventDefault()
const formData = new FormData(newUserForm)
const name = formData.get("name")
const username = formData.get("username")
const email = formData.get("email")
const password = formData.get("password")
const newUser = {
user: {
name: name,
username: username,
email: email,
password: password,
},
}
createUserCard(newUser.user) //<- This part is important. You have to access the user key first!>

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))

})
})

function createUserCard(user) {
const userCard = document.createElement("div")
userCard.className = "user-card"

const name = document.createElement("h3")
const username = document.createElement("p")
const email = document.createElement("p")

name.innerText = user.name
username.innerText = user.username
email.innerText = user.email

userCard.append(name, username, email)
document.body.append(userCard)
}

4. Test

**Adding an Edit Form & Updating User Info**

1. Add a section for the form and section for the user cards in the HTML with
   their IDs.

2. Display flex, flex-direction: row, flex-wrap: wrap on the container holding
   the cards. Make sure they show up that way.

3. Grab both sections globally in your JS file. Swap out the where you are appending the cards to be appended to the new
   container section.

   userCardContainer.append(userCard)

4. In function createUserCard(user), create an edit button.
   const editButton = document.createElement("button")
   editButton.innerText = "Edit User"
   Add to existing append: userCard.append(name, username, email, editButton)

5. In the userCard function, add an event listener that redirects to an
   editButton function:

   editButton.addEventListener("click", () => {
   editUserCard(user)
   })

6. Below and outside of the scope of the userCard Function, create a
   editUserCard function that passes through a user. This will happen each time
   an edit button is clicked. Here you will need to dynamically create a new form to edit the
   user.

function editUserCard(user) {
const editUserForm = document.createElement("form")
const nameInput = document.createElement("input")
const usernameInput = document.createElement("input")
const emailInput = document.createElement("input")
const passwordInput = document.createElement("input")
const submitButton = document.createElement("button")

    nameInput.name = "name"
    nameInput.value = user.name

    usernameInput.name = "username"
    usernameInput.value = user.username

    emailInput.name = "email"
    emailInput.value = user.email

    passwordInput.name = "password"
    passwordInput.placeholder = "password"
    passwordInput.type = "password"

    submitButton.innerText = "Update"
    submitButton.type = "submit"

    editUserForm.append(
      nameInput,
      usernameInput,
      emailInput,
      passwordInput,
      submitButton
    )

    formSection.appendChild(editUserForm)

    submitButton.addEventListener("click", () => {
      event.preventDefault()
      patchUserInfo(user, editUserForm)
    })

}

7. Now we create a function to send the updated user info to the backend:

function patchUserInfo(user, form) {
const formData = new FormData(form)
const name = formData.get("name")
const username = formData.get("username")
const email = formData.get("email")
const password = formData.get("password")
const updatedUser = {
user: {
name: name,
username: username,
email: email,
password: password,
},
}

    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((result) => handleUserResponse(result, newUserForm, true))

}

8. In order to optimistically show the update, first we want to create an id for
   each text field in the user card as it's being generated. We do this by
   dynamically creating id's as we modify the element in createUserCard:

   name.innerText = user.name
   name.id = `user${user.id}-name`
   username.innerText = user.username
   username.id = `user${user.id}-username`
   email.innerText = user.email
   email.id = `user${user.id}-email`
   editButton.innerText = "Edit User"

9. In the updateUserCard function, before the fetch add:

updateUserCard(updatedUser.user, user.id)

10. Outside of these functions, create the updateUserCard function called above:

function updateUserCard(user, id) {
// console.log(userCard)
// console.log(user)
// console.log(id)
event.preventDefault()
const name = document.querySelector(`#user${id}-name`)
name.innerText = user.name

    const username = document.querySelector(`#user${id}-username`)
    username.innerText = user.username

    const email = document.querySelector(`#user${id}-email`)
    email.innerText = user.email

}

**Add Delete Functionality**

1. Create a createDeleteButton function. Which will create the actual user
   button on each userCard. Instead of appending it within the function you will
   append it in the createUserCard function above. It's important that you use
   the fat arrow below because otherwise, it's just going to run the function
   automatically for some reason.

function createDeleteButton(user, event) {
const deleteButton = document.createElement("button")
deleteButton.innerText = "Delete"
deleteButton.addEventListener("click", () => {
//console.log(`I will delete ${user.name}`)
deleteUser(user)
})
return deleteButton
}

In the createUserCard function, append it like so:

userCard.append(name, username, email, editButton, createDeleteButton(user))

2. Create the deleteUser function referenced above, to actually remove it from
   the backend.

function deleteUser(user) {
// console.log(user)
fetch(`http://localhost:3000/users/${user.id}`, {
method: "DELETE",
})
.then((response) => response.json())
.then((result) => console.log(result))
}

3.  Add a JSON message to your destroy controller action.

    def destroy
    @user = User.find(params[:id])
    @user.destroy

        render json: {message: "#{@user.name} was deleted."}

    end

4.  Last thing is to get the card to dynamically & optimistically remove itself.

5.  Assign IDs to each of the cards. In the createUserCard function, after
    create the card for each user. Assign it's ID by adding:

    const userCard = document.createElement("div")
    userCard.className = "user-card"
    userCard.id = user.id

6.  In order to optimistically remove the card, at the top of the deleteUser
    function (before the fetch):

    const userCard = document.getElementById(user.id)
    userCard.remove()

Code Review Key Takeaways:

1. DRY your code. Creating helper functions.
2. Be consciotuous about what data your passing to what function. Only pass in
   the data you need. You might not need the entire data object.
3. Single responsility principle, that your function should be responsible for
   the operation. 3-5 lines of code per function.
