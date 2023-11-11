# readnovelZA

Personal read novel website

## Usage

### For backend:
  Server is run in local host by `npm run server` server will reload when you make changes by nodemon.
  PORT use in localhost is 5000.
  Just have model, route and controller of MCV. View is handler by frontend react app.
  Middleware folder contain middleware for authorization checking.
####  Enviroment variable needed is:
    "MONGODB_CONNECTION" //full mongodb connection string
    or use those instead 
      {"MONGO_USER"
      "MONGO_PASSWORD"
      "MONGO_DATABASE"}
    "ADMIN_URL"
    "CLIENT_URL"
### For frontend:
  Request is made by frontend both client and admin to server to API endpoint through enviroment variable `REACT_APP_API_KEY`
