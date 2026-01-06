const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const authRoute = require("./routes/authRoute");
const usamartRoute = require("./routes/usamartRoute");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 8080;

connectDB()

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use("/auth", authRoute);
app.use("/usamart", usamartRoute);

app.get("/", (req, res) => {
  res.redirect("/auth/login")
});

app.use((req, res) => {
  res.status(404).render("404", { url: req.originalUrl });
});

app.listen(8080, () => {
    console.log(`Server running at http://localhost:${port}`)
})