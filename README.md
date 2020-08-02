# graceshoppers

Shopping platform for retro arcade game items

Front End:

- App does a fetch request to obtain all relevant information needed for the platform.
- Uses redux to keep track of state of products
- Uses react-redux to create a shared state so that all components will receive the relevant information

Back End:

- Uses express to create server and express Router to create different routers and paths
- express will parse the information sent to the backend based on the url given

Authentication:

1. Automatic cookie creation and user retrieval

- Uses cookies to keep track of user accessing the application
- If user does not have a cookie, a cookie is automatically given to the user
- After user has a cookie, the cookie's sessionId is automatically saved in the database
- Once user logs into the platform this sessionId will be associated with the created user
- For the purposes of this app, upon initial request, if the user is found with a cookie, the app will automatically log them in

2. Registering a new user

- Done through the auth router path of /register
- If the user provides a username and password that pass the validation paramaters, sequelize will create a new user with the given information, for all new users, the clearance is set to 1 as a default since they should not possess admin privileges
- Password is automatically hashed and salted through bcrypt, hashed password is stored on database
- If user is created successfully an alert will be given through front end that user was created successfully

3. Login

- Done through the auth router path of put:/login
- User will send username and password to the backend where Passport will take the information and try to find a user with the information
- If user is not found, it will send an error that user is not found
- Next if a user is found, it will hash and salt the entered password supplied by the user vs the hash and salted password in the database
- If password does not match, it will send an error that password is incorrect
- If user and password are correct, the user will be saved to req.user through passport serialize and passport deserialize
- The backend will also send a message to the frontend that user was found and logged in
- Frontend will display an alert that will notify the user that login was successful and log the user in and then redirect the user to the home page

  4.Logout

- Will logout user through passport and also clear the attached cookie so that user will not be automatically signed in in the future until user relogins

Models

1. User

- Set up with a username, password, salt, clearance
- Username must be unique
- Password will be hashed according to the salt saved in the user database,
- The salt is required for dehashing and desalting the password to compare to user entry
- Clearance determines the authority of the user and what options they possess on the page, 5 will be the highest clearance

2. Products

- Set up with a unique name, description, imageUrl, and quantity
- Quantity must be 0 or greater
- If quantity === 0, product will not be available on front-end and should display an out of stock parameter

3. Category

- Set up with a unique name

  4.Order

- Set up with an id, status
- Status determines what needs to be done with the order
- An active order has not been confirmed yet and is still being used by the user to shop with
- A pending order has already been sent in and is waiting to be confirmed by an admin
- A done order has been completed already

5. Cart

- Set up with a quantity paramater
- The cart model is used to connect the Products and Order database
- The quantity parameter on each item is used to list the quantity of specific product added to the shopping cart

6. Session

- Used to connect a cookie with a user or order or both

Relationships

1. Users can have many sessions but sessions belong to users. This makes sense since users can have many cookies associated with them throughout their lifetime.
2. Order belongs to session but session can have many orders. This makes sense since a user on a specific cookie should be able to order multiple times with the same session and should be able to have multiple active carts whenever a cart is closed
3. Order belongs to User but User can have many orders. Same logic as above.
4. Product belongs to category and category can have many products. Makes sense, product can technically belong to many categories but this app will keep it a simple relationship

Cart functionality _Work in progress_

- Right now the app will automatically pull the cart associated with the session if the user isn't found
- The app will automatically pull the user associated with the session at the moment but it is not updating the order associated with the session to become associated with the user instead if the user does not have an active order on their account. If this functionality does not work then when the user logs in and if the cart already has items those items will be eliminated to give the user a fresh cart.
- Products are added to the cart using the cartRouter and redux store to conduct async actions.
- On the frontEnd the app will send a request to the backend with the productId, orderId and quantity, quantity of the product must be sufficient and will be checked on the backEnd to ensure that there are enough items to complete the order
- If quantity of product in stock is sufficent, the cart model will check if the order id and product id are already in the cart and update the quantity parameter to match the new parameter, otherwise it will create a new line with the orderId, productId and quantity given
- Cart will reflect the changes in the database through pulling the cart items associated with the orderId
- Once order is confirmed, the product quantities in the database will be deducted according to the items in the cart associated with the orderId
- Order status will be changed to pending in the database
- Admin must confirm the order which will change the order status to done

Pending Tasks

- Pagination
- Search for product by name
- Adding Stripe for payments
- Adding email confirmation
- Adding higher order components
  1. Loading component
  2. Redirect component
- Incorporating googlemapsApi to give directions to the store
