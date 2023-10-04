const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

/* ROUTES IMPORT */
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);
app.use("/attendance", attendanceRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
