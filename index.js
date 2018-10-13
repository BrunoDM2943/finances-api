const express = require('express');
const app = express();
const utils = require("./app/utils");
const movements = require("./app/movements");
const users = require("./app/users");

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.use(utils.validateUser)
app.post("/movements", movements.save);
app.get("/movements", movements.list);
app.get("/movements/:id", movements.get);
app.put("/movements/:id", movements.update);
app.delete("/movements/:id", movements.remove);
app.post("/users", users.signUp);
app.post("/users/login", users.login);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Listening on port " + PORT));