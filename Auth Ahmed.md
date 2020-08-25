Code Reference: /Users/mikedelarosa/flatiron/mod3/auth/AuthWithAhmed/allTheAuth

**Objectives**

1. Create user w/ hashed password

2. Encode a Token (Logging in)

3. Decode that token (verifying token http request)

**Create a User w/ a Hashed PW**

1. Set up file structure.

2. Uncomment bcrypt and cors in gem file, bundle install, check gemfile.lock for
   installation. Uncomment cors file and set origins. Might as well add `gem 'jwt'` in here as well.

3. Generate a model with desired attributes, be sure to include password_digest
   rails g model user username password_digest

4. Check to make sure the model was created. Add the below to link the password
   digest with the :password attribute in the controller. Basically the
   controller now knows what to refer to when it sees “:password”

has_secure_password

5. Check the migration contains password_digest

6. Migrate

7. Check to make sure password_digest made it into your schema

8. Create a route for your user model
   resources :users, only: [:index, :create]

9. Create the users controller
   rails g controller users

10. Fill out the controller actions you require:

    def index
    @users = User.all
    render json: @users
    end

    def create
    @user = User.create(user_params)
    render json: @user
    end

    private
    def user_params
    params.require(:user).permit(:username, :password)
    end

11. start up your backend end server

12. Launch PostMan

13. Make a GET request to /users, you should get an empty array if it’s working
    properly.

14. Try sending a post request to at USERS, you can use form data or body, raw, JSON data. If the latter use this format:
    {
    "user": {
    "username": "junior",
    "password": "mypassword"
    }
    }

15. Add, commit, push up to GH.

**Encode a Token**

1. Add the jwt gem. In your terminal run (this is the same as manually adding in
   your file and then running bundle install):

   bundle add jwt

2. Check that the gem was installed.

3. Start up your rails server again.

4. In routes.rb, create a custom route:

post "/login", to: "authentication#login"

# This tells it that any post request that come to “/login” should be sent to authentication controller and run the “login” action.

5. Create the authentication controller:

rails g controller authentication

6.  Create login method within the authentication controller:

    1.  Test it first by throwing in a message to make sure that it is hitting.

        render json: {message: "You hit the login action"}

    2.  Then send a post request in PostMan, include only username and
        password in your form or raw JSON. Send it to localhost:3000/login

    3.  If test is sucessful, replace test by writing this in the login method:

    def login
    @user = User.find_by(username: params[:username])

        if @user
            if @user.authenticate(params[:password])
                payload = { user_id: @user.id }
                secret = Rails.application.secrets.secret_key_base
                token = JWT.encode(payload, secret)

                render json: { token: token }
            else
            render json: "user found!"
            end
        else
            render json: "user not found"
        end

    end

    # What we really don't want is for the user to know if the username or password is wrong. That can help them hack into accounts.

7.  Add a commented out validation as a place holder in the user model:

# validation :username to be unique

8.  Now we need to create our JWT, which we send back to user if there is a sucessful
    log-in. Log-in action method now looks like this:

    def login
    @user = User.find_by(username: params[:username])

         if @user
             if @user.authenticate(params[:password])
                 payload = { user_id: @user.id }
                 secret = Rails.application.secrets.secret_key_base
                 token = JWT.encode(payload, secret)

                 render json: { token: token }
             else
             render json: "user found!"
             end
         else
             render json: "user not found"
         end

    end

# What's happening above: when a user sends a post request to login, if the user's id exists and password is correct, it will generate and send over a token JSON object. If the user is found, but the password is incorrect, it will say "user found!." If the the user is not found, it will say "user not found."

9. Test that all scenarios above work correctly in Postman.

**Decode the JWT**

1.  Copy your example token, that was generated in postman.
2.  In postman, switch to the "authorization" tab.
3.  In the dropdown below it, select "Bearer Token"
4.  Paste the token into the "Token" Field. Hit send.
5.  In the application controllers create an action method called "authenticate":

        def authenticate
            begin
                authorization_header = request.headers["Authorization"]
                token = authorization_header.split(" ")[1]
                secret = Rails.application.secrets.secret_key_base
                decoded_token = JWT.decode(token, secret)
            rescue
                render json: { message: "invalid!" }
            end
        end

6.  On Users_controller.rb, at the top insert a line of code that tells it to to
    run authenticate before particular actions are handled:

        before_action :authenticate, only: [:index, :show, :update, :destroy]

7.  This way you don't need to include a begin and rescue in each of your
    controller methods. Now you can change your user action methods to look like normal
    strong params methods:

        def index
            @users = User.all
            render json: @users
        end

8.  PostMan Test:

    1. Send "POST" to /login to get a valid token. Provide correct credentials.
       Copy the token.
    2. Switch to Auhtorization tab, paste token in field, make sure Bearer Token
       is selected, switch to send "GET" to "/users" hit send. You should receive
       a list of the users if it worked.
    3. Try removing a character from the token, do you receive the error message?

**Frontend Auth**

1. In the project parent folder, create your FrontEnd folder as usual. Touch
   index.html and app.js, make sure they are linked.
2. Create a form in index.html
3. Grab the form element in your JS.
4. Attach an event listener to the form on "Submit", direct it to the a
   handleLogin function.
5. Create the handleLogin(event) function.
   1. Make sure to start with event.preventDefault() and end it with
      event.target.reset(). To prevent it from reloading the page and ensure it
      clears the form after submittal.
   2. Test first with a simple console.log between the beginning and the end.

Ex:
const loginForm = document.querySelector(".login")

        loginForm.addEventListener("submit", handleLogin)

        function handleLogin(event) {
            event.preventDefault()
            console.log("yes")
            event.target.reset()
        }

3.  Within, event listenrer, create FormData prototype to grab data entered
    into your input fields. Test with console.log.

    function handleLogin(event) {
    event.preventDefault()
    const loginFormData = new FormData(event.target)

    const username = loginFormData.get("username")
    const password = loginFormData.get("password")

    console.log(username, password)
    event.target.reset()
    }


    4. Create a constant to contain the Body will will send over in the fetch post request, example below includes a JS shorthand:

        const loginBody = { username, password }

        JS reads the above the same as =

        const loginBody = {
                username: username,
                password: password
            }
    5. Within the event listener, add a post fetch request to send over the username and password and then extracts the token and stores it in local storage.

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(loginBody),
    }).then((response) => response.json())
        .then(result => {
        console.log(result.token)
        localStorage.setItem("token", result.token)
        // localStorage.setItem takes a key ("token") and value (result.token) to
        // store it in localStorage. You can view this in DevTools by going to the
        // "Application" tab and then clicking on "Local Storage" in the sidebar.
        })

    event.target.reset()

    6. Make a button to get users from the backend. Hardcode it in your html.

    <button id="get-users">Get Users</button>

    7. Grab that button in your JS and add an event listener to it that send it to handleGetUsers.

    const getUsersButton = document.querySelector("#get-users")
    getUsersButton.addEventListener("click", handleGetUsers)

    8. Add handleGetUsers function below handleLogin and test with console.log to see if it the event listener is working:

    function handleGetUsers() {
    console.log("get users")
    }

    9. Add a fetch to the handleGetUsers(), it will attempt to retreive users data, but will need for you to send over a header containing the token in order for it to be authorized since we protected it in the backend.

    function handleGetUsers() {
    fetch("http://localhost:3000/users", {
        headers: {
        "Authorization": `Bearer ${localStorage.token}`
        }
    })
        .then(response => response.json())
        .then(console.log)
    }

    10.
