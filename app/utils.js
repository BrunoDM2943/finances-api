function validateUser(req, res, next) {
    const user = getUser(req); 
    if(!validUser(user, res)){
        return next('router')
    }
    next();
}


function validUser(user, res) {
    if (!user) {
        res.status(400).send({msg: "user is required in header"})
        return false;
    } 
    return true;
}

function getUser(req) {
    return req.get("user");
}

module.exports = {getUser, validateUser}