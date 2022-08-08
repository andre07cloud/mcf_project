
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser'); 
const dotenv = require("dotenv").config();
const connection = require('./db');
const http = require('http');


//import routes
const userRouter = require("./src/routes/userRoutes");
const formationRouter = require("./src/routes/formationRoutes");
const sectionRouter = require('./src/routes/sectionRoutes');
const moduleRouter = require('./src/routes/moduleRoutes');

//bodyParser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './build/web')));

//allows multiple http request anywhere
app.use(cors());

let gfs;
//connection to databse and create default super admin
connection();


// All router app
app.use('/api/users', userRouter);
app.use('/api/formations', formationRouter);
app.use('/api/sections', sectionRouter);
app.use('/api/modules', moduleRouter);

//Web App Port to access web page
const port = normalizePort('8000');
app.set('port', port);


//Public files
app.use(express.static(path.join(__dirname, "public")));

//Creating web http server listing on port
const server = http.createServer(app);
server.listen(port);
server.on('error', function (e) {
  // Handle your error here
  console.log(e);
});

//Normalize port function

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
// On listening to server function
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

//App listener
app.listen(process.env.APP_PORT, () => 
  console.log(`your server is on port ${process.env.APP_PORT}`)
  );
