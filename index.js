const express = require("express");
const port = 8000;
const layout = require("express-ejs-layouts");
const db = require("./config/mongoose");
const app = express();
const passport = require("passport");
const passportStrategy = require("./config/passport-local-strategy");
const session = require("express-session");

app.use(express.urlencoded());
app.use(layout);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./assets"));

app.use(
  session({
    name: "practice_passport", //name of cookie
    //todo change the secret before deployment in prod mode
    secret: "blah", //when encryption happens the key to encode and decode
    saveUninitialized: false, //
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, //number of minutes  ( in milliseconds)
    },
    // store: new MongoStore(
    //   {
    //     mongooseConnection: db, //d b   which we imported from mongoose setup file
    //     autoRemove: "disabled",
    //   },
    //   function (err) {
    //     //call back fxn if there is an error
    //     console.log(err || "connect mongodb setup ok");
    //   }
    // ),
  })
);
//telling app to use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use("/", require("./routers/index"));
app.listen(port, function (err) {
  if (err) {
    console.log("error while running server");
    return;
  }
  console.log("server running fine");
});
{
}
