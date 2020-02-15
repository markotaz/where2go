const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const saltRounds = 10;
const secretKey = "Pojacalo97*";
const mongoose = require("mongoose");
const Admin = require('../models/admin');



module.exports.user_signup = (req,res,next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(users=>{
        console.log(users);
        if(users.length >= 1)
        {
            return res.status(409).json({
                message: "User with this mail aready exist"
            });
        }else {
            //console.log("User doesn't exist");
            bcrypt.hash(req.body.password, saltRounds,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        name: req.body.name 
                });
                user.save()
                .then(users=>{
                    console.log(users);
                    //201 kad napravimo resurs
                    res.status(201).json({
                        message: 'User created'
                    });
                })
                .catch(err=>{
                    console.log("user.js :"+err);
                    res.status(500).json({
                        error: err
                    });
        
                });
                }
            });
        }
    });
}


module.exports.delete_user = (req,res,next)=>{
    User.remove({_id: req.params.userId})
    .exec()
    .then(users =>{
        res.status(200).json({
            message: "User deleted"
        });
    })
    .catch(err=>{
        console.log("Greska brisanje: "+err);
        res.status(500).json({
            error: RangeError
        });
    });

}

module.exports.user_login = (req,res,next)=>{
    var email = req.body.email;
    var pass = req.body.password;

    User.find({email: email})
        .exec()
        .then(users=>{
            if(users.length > 1)
            {
                return res.status(401).json({error: "Something went wrong."
            });
            }else if(users.length ==0){
                return res.status(409).json({message: "Invalid user or password"});
            }
            else{
                //uzmi iz bazu pass i uporedi sa ovo sto je uneo
               bcrypt.compare(pass,users[0].password,(err, result)=>{
                   if(err)
                   {
                       return res.status(401).json({
                           message: "Auth failed",
                           isAuthenticated: false,
                           tip: 'user'
                       });
                   }else{
                    if(result)
                    {
                        const token = jwt.sign({
                            email: email,
                            userId: users[0]._id
                        },secretKey, {
                            expiresIn: "1h"
                        }
                        );

                        return res.status(200).json({
                            message: "Auth successful",
                            token: token,
                            isAuthenticated: true,
                            email: users[0].email,
                            tip: 'user'
                        });
                    }else{
                        return res.status(401).json({
                            message: "Auth failed",
                            isAuthenticated: false,
                            tip: 'user'
                        });
                    }
                   }
               });
            }
        })
        .catch(err=>{
            res.status(500).json({
                error: err
            });
        });
}

module.exports.admin_login = (req,res, next)=>
{
    const email = req.body.email;
    const password = req.body.password;
    
    Admin.find({email: email})
    .exec()
    .then(users=>{
        if(users.length > 1)
        {
            return res.status(401).json({error: "Something went wrong."
        });
        }else if(users.length ==0){
            return res.status(409).json({message: "Invalid user or password"});
        }
        else{
            //uzmi iz bazu pass i uporedi sa ovo sto je uneo
           bcrypt.compare(password,users[0].password,(err, result)=>{
               if(err)
               {
                   return res.status(401).json({
                       message: "Auth failed",
                       isAuthenticated: false,
                       tip: 'admin'
                   });
               }else{
                if(result)
                {
                    const token = jwt.sign({
                        email: email,
                        userId: users[0]._id
                    },secretKey, {
                        expiresIn: "1h"
                    }
                    );

                    return res.status(200).json({
                        message: "Auth successful",
                        token: token,
                        isAuthenticated: true,
                        email: users[0].email,
                        tip: 'admin',
                        objectId: users[0].object
                    });
                }else{
                    return res.status(401).json({
                        message: "Auth failed",
                        isAuthenticated: false,
                        tip: 'admin'
                    });
                }
               }
           });
        }
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });


}

module.exports.admin_signup = (req,res,next)=>{
    Admin.find({email: req.body.email})
    .exec()
    .then(admins=>{
        console.log(admins);
        if(admins.length >= 1)
        {
            return res.status(409).json({
                message: "User with this mail aready exist"
            });
        }else {
            //console.log("User doesn't exist");
            bcrypt.hash(req.body.password, saltRounds,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new Admin({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        object: req.body.objectId,
                        name: req.body.name
                });
                user.save()
                .then(admins=>{
                    console.log(admins);
                    //201 kad napravimo resurs
                    res.status(201).json({
                        message: 'Admin created'
                    });
                })
                .catch(err=>{
                    console.log("user.js :"+err);
                    res.status(500).json({
                        error: err
                    });
        
                });
                }
            });
        }
    });


}
