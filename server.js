const http = require('http');
let io = null;
const app = require('./app');
const socketIO = require('socket.io');
//port iz enviroment ako nije setovan onda 3000
const port =  process.env.PORT || 5000;


const server = http.createServer(app.app);


//listenuje i poziva f-ju koju predamo u createServer

io = socketIO(server);
// console.log("Soket",io);
// let io2 = require('socket.io')({
//     path: '/pocetna'
//   });


    app(io);




    server.listen(port,()=>{console.log(`Server started on port ${port}`)});
 
    io.on('connection', function (socket) {
        var soba=socket.handshake.query.naziv; 
        soba = soba.toString();
        console.log("USER SE KONEKTOVAO");
        socket.join(soba,()=>{       
            console.log("Usao u sobu",soba);
        });
        socket.emit('connected',{poruka: "Uspesno konektovan na soket"});
    
            socket.on('zakazi', (podaci)=>{
                console.log("KLIJENT says: OCU DA ZAKAZEM ",podaci);
               
                // socket.emit('zakazao',{poruka: "Uspesna rezervacija"});
            });
    
        });