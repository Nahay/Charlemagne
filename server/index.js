const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/charlemagne';


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
app.use(cors(process.env.ALLOWED_ORIGIN));

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
  MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log(!err ? "Mongodb connected" : `Connection error: ${err}`);
  }
);

// Listening to the server
app.listen(PORT, console.log(`Listening on port ${PORT}`));