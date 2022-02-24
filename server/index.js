const express =require('express');
const app =express();
const cors =require('cors');

const winston = require("winston");

const todos = require("./routes/todos");
const signUp = require("./routes/signUp");
const signIn = require("./routes/signIn");


winston.exceptions.handle(
  new winston.transports.Console({ colorize: true, prettyprint: true }),
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

process.on("unhandledRejection", (error) => {
  throw error;
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));

app.use(express.json())
app.use(cors())

require("./DB");



app.use("/api/todos", todos);
app.use("/api/signup", signUp);
app.use("/api/signin", signIn);





app.listen(process.env.PORT || 5000, () => {
    console.log(`server listen on ${process.env.PORT}  👌👏`)
})
