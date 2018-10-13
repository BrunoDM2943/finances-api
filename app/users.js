const mongo = require("./mongo");
const collection = "users"

function signUp(req, res) {
    const db = mongo.getDb();
    const user = req.body;
    db.collection(collection).insertOne(user, function(err,r) {
        if (err != null) {
            res.send(err);
        } else {
            res.status(201).send({msg:"User created"});        
        }
    });
}

function login(req, res) {
    const db = mongo.getDb();
    const user = req.body;
    db.collection(collection).findOne({user: user.login, password: user.password}, function(err,result) {
        if (err != null) {
            res.send(err);
        } else if (result == null) {
            res.status(404).send();
        }else{
            res.status(200).send();  
        }
    });
}

module.exports = {signUp, login}