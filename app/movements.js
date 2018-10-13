const mongo = require("./mongo");
const ObjectID = require('mongodb').ObjectID;
const getUser = require("./utils").getUser;

const collection = "movement";

function save(req, res) {
    const movement = req.body;
    const user = getUser(req);
    const db = mongo.getDb();
    movement.user = user;
    db.collection(collection).insertOne(movement, function(err,r) {
        if (err != null) {
            res.send(err);
        } else {
            res.status(201).send({msg:"Movimento salvo"});        
        }
    });
}

function list(req, res) {
    const db = mongo.getDb();
    const user = getUser(req)
    db.collection(collection).find({"user": user}).toArray(function(err,docs) {
        if (err != null) {
            res.send(err);
        } else {
            res.status(200).send({movements:docs});  
        }
    });
}

function get(req, res) {
    const db = mongo.getDb();
    const user = getUser(req);
    const id = req.params.id;

    db.collection(collection).findOne({_id: ObjectID(id), "user": user}, function(err,result) {
        if (err != null) {
            res.send(err);
        } else {
            res.status(200).send({movement:result});  
        }
    });
}

function update(req, res) {
    const db = mongo.getDb();
    const user = getUser(req)
    const movement = req.body
    const id = req.params.id
    movement.user = user    
    db.collection(collection).findOneAndUpdate({_id: ObjectID(id)}, {$set: movement}, {
        returnOriginal: false
    },function(err,r) {
        if (err != null) {
            res.send(err);
        } else {
            res.status(200).send({msg:"Movemente updated", doc: r.value});  
        }
    });
}

function remove(req, res) {
    const db = mongo.getDb();
    const user = getUser(req)
    const id = req.params.id
    
    db.collection(collection).findOneAndDelete({_id: ObjectID(id), user: user},function(err,r) {
        if (err != null) {
            res.send(err);
        } else {
            console.log(r)
            if (!r.value) {
                res.status(404).send();
            } else {
                res.status(200).send({msg:"Deleted"});
            }
        }
    });
}

module.exports = {save, list, update, remove, get}


