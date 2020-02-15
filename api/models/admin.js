const mongoose = require("mongoose");


const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: 
    {type: String, required: true, unique: true,  
   match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
    password: {type: String, required: true},
    name: {type: String, required: true},
    object: [{type: mongoose.Schema.Types.ObjectId, ref: 'Object'}]
   });
   module.exports = mongoose.model('Admin',adminSchema);
   
