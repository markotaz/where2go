const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/user');
let objectRoutes = require('./api/routes/object')(null);

let ioo = null;
module.exports = (io)=>{
    
    ioo=io;
    console.log("IO POSTAVLJEN");
  objectRoutes = require('./api/routes/object')(io);
// console.log(ioo);
}


mongoose.connect('mongodb+srv://node-shop:'+
"node-shop"+
'@node-rest-shop-grig7.mongodb.net/test?retryWrites=true',{useNewUrlParser: true, useCreateIndex: true});

// app.set('views',path.join(__dirname,'views'));
// app.set('view engine','jade');

mongoose.Promise = global.Promise;//ovo resava deprecation warning oko promisa
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));

//extract info from body of request
// app.use(express.urlencoded({extended:false}));
// app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');//* pristup svim klijentima
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method ==='OPTIONS')
    {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});



//incoming req ide kroz use i kroz nesto sta predamo na use
// app.use((req,res,next)=>{
//     res.status(200).json({
//         message: "It works!"
//     });
// });

// io.on('connection', function (socket) {
//     console.log("USER SE KONEKTOVAO");
//     // socket.broadcast.emit('connected',{poruka: "Uspesno konektovan na soket"});

//         socket.on('zakazi', (podaci)=>{
//             console.log("KLIJENT says: OCU DA ZAKAZEM ",podaci);
//             //zakazivanje
//             socket.emit('zakazao',{poruka: "Uspesna rezervacija"});
//         });

//     });


//rute koje izvrsavaju zahteve

app.use('/user', userRoutes);
app.use('/objects',objectRoutes);

app.use((req,res,next)=>{
   
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>
{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});


module.exports.app = app;