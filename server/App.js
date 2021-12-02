const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

// Import routes
const usersRoute = require("./routes/users");
const adminRoute = require("./routes/admins");
const calendarRoute = require("./routes/calendar");
const dishesRoute = require("./routes/dishes");
const dishDateRoute = require("./routes/dishDate");
const commandsRoute = require("./routes/commands");
const commandListRoute = require("./routes/commandsList");
const paramRoute = require("./routes/params");


// Middleware
// cors pour use l'api de l'extérieur, on peut préciser le site en para
app.use(cors());
app.use(express.json());
app.use('/users', usersRoute);
app.use('/admins', adminRoute);
app.use('/calendar', calendarRoute);
app.use('/dishes', dishesRoute);
app.use('/dish-date', dishDateRoute);
app.use('/commands', commandsRoute);
app.use('/commandsList', commandListRoute);
app.use('/params', paramRoute);



// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log(!err ? "Mongodb connected" : `Connection error: ${err}`);
  }
);

// Listening to the server
app.listen(3001, console.log("Listening on port 3001"));