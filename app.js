const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();

const { NotFoundError } = require("./utils/apiError.js");
const globlaError = require("./middlewares/errorHandler.js");
const connectDB = require("./config/database.js");

// import Routes 
const appRoutes = require("./routes/index");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());




app.use('/api', appRoutes);

app.use("*", (req, res, next) => {
  throw new NotFoundError("cann't find this endpoint");
});

app.use(globlaError);




const port = process.env.PORT || 8000;

// Connect Yo Database 
connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
