const jwt = require('jsonwebtoken');
const secretKey = "Pojacalo97*";
//ovaj middleware iz hedera http zahteva izvlaci token i proverava dal je validan
//ako jeste dodaje u

module.exports = (req,res, next)=>{
    try{
        
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token,secretKey);
    req.userData = decoded;
        next();
    }catch(err)
    {
        console.log("token error: "+err);
        return res.status(500).json({message: "Auth failed",isAuthenticated: false});
    }

};