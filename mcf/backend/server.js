
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser'); 
const dotenv = require("dotenv").config();
const connection = require('./db');
const http = require('http');
const httpStatus = require('http-status');
const multer = require('multer');

const fs = require('fs');
const https = require("https");

//import routes
const userRouter = require("./src/routes/userRoutes");
const formationRouter = require("./src/routes/formationRoutes");
const sectionRouter = require('./src/routes/sectionRoutes');
const moduleRouter = require('./src/routes/moduleRoutes');
const categoryRouter = require('./src/routes/categoryRoutes');
const forumRouter = require('./src/routes/forumRoutes');
const chatRouter = require('./src/routes/chatRoutes');
//bodyParser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Use all parser utilities
app.use(express.json({limit: '10000000mb'}));

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
app.use('/api/categories', categoryRouter);
app.use('/api/sections', sectionRouter);
app.use('/api/modules', moduleRouter);
app.use('/api/forums', forumRouter);
app.use('/api/chats', chatRouter);

//Public files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/upload")));

//App listener
app.listen(process.env.APP_PORT, () => 
  console.log(`your server is on port ${process.env.APP_PORT}`)
  );
