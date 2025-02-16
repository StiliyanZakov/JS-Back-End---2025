import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import 'dotenv/config.js';

import routes from "./routes.js";
import showRatingHelper from "./helpers/rating-helper.js";
import { authMiddleware } from "./middlewares/auth-middleware.js";

const app = express();

// db configuration
try {
  const url = "mongodb://127.0.0.1:27017/magic-movies-jan-2025";
  await mongoose.connect(url); // Use the url variable directly

  console.log("DB connected Successfully!");

} catch (error) {
  console.log('Cannot connect to DB');
  console.error(error.message);

}

// handlebars configuration
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      }, 
    helpers: {
      showRating: showRatingHelper,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "./src/views");

// express configuration
app.use("/static", express.static("src/public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware);

//set up routes
app.use(routes);

// start the server
app.listen(5000, () =>
  console.log("Server is listening on http://localhost:5000...")
);
