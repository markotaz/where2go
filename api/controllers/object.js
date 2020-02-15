const Object = require("../models/object");
const Recenzija = require("../models/recenzija");
const mongoose = require("mongoose");
const multer = require('multer');
const nodemailer=require('nodemailer');

let io;

module.exports.saljiEmail=(req,res,next)=>
{
    
    const output=`
    <p>You have a new contact request</p>
    <h3>Contacct Details</h3>
    <ul>
    <li>Naslov: ${req.body.subject}</li>
    <li>Email: ${req.body.sender}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.text}</p>
    `;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com.",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "dartspdc180@gmail.com", // generated ethereal user
      pass: "TRIPAKLECIGARE"// generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"where 2 go" <dartspdc180@gmail.com>', // sender address
    to: "akvedoto@gmail.com", // list of receivers
    subject: "Where2go kontakt request", // Subject line
    text: "cao?", // plain text body
    html: output // html body
  }).then(obj=>{
      console.log("Uspelo",obj);
  }).catch(err=>
    {
        console.log("Neuspelo",err);
    });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  console.log("poslato");
}



module.exports.create_object = (req, res, next) => {
   
    var slobodni = 0;
    // var stolovi = req.body.stolovi;
   var planPath = req.files['slikaPlanaObjekta'][0].path;
   var objectImagePath = req.files['objectImage'][0].path;
    // stolovi.forEach(element => { if(element.isFree) slobodni++; });
const object = new Object({
    _id: new mongoose.Types.ObjectId,
    naziv: req.body.naziv,
    tipObjekta: req.body.tipObjekta,
    opis: req.body.opis,
    ocena: req.body.ocena,
    recenzije: [],
    countRec: 0,
    stolovi: [],
    brSlobodnihStolova: slobodni,
    kontakti:[],
    slikaObjekta: planPath,
    slikaPlanaObjekta: objectImagePath,
    mapa: req.body.mapa
});
//console.log(object);
object.save()
.then(result => {
   
    res.status(201).json({
        message: "Created object:"+req.body.naziv+" succesfully",
        createdObject:{
            _id: result.id,
            naziv: result.naziv,
            opis: result.opis,
            stolovi: result.stolovi,
            recenzije: result.recenzije,
            countRec: result.countRec,
            slikaObjekta: result.slikaObjekta,
            slikaPlanaObjekta: result.slikaPlanaObjekta,
            mapa: result.mapa, 

            request: {
                type: 'GET',
                url: "http://localhost:3000/objects/"+result._id
            }
        }
    });
}).then()
.catch(error => {
    console.log(error);
    res.status(500).json({error: error});
})
}

module.exports.napravi_recenziju = ( req, res, next ) =>{
    io = require('../routes/object').IO;
   var nazivObjekta =  req.body.nazivObjekta;
   var opisRecenzije = req.body.opis;
   var ocena = req.body.ocena;
var ime = req.body.email;
   const recenzija = new Recenzija({
   _id: new mongoose.Types.ObjectId,
    ocena: ocena,
    opis: opisRecenzije,
    ime: ime
   });

var recenzije=null;
var novaOcena = null;
Object.findOne({naziv: nazivObjekta}).then(objekat=>{
    var indexx;
  var niz = objekat.recenzije.filter((recenzija,index)=>{if(recenzija.ime==ime){indexx=index;return true;}});
  if(niz.length==0){
objekat.recenzije.push(recenzija);
objekat.countRec++;
var suma =0;
objekat.recenzije.forEach(rec=>{
    suma+=rec.ocena;
});
objekat.ocena = suma / objekat.countRec;
recenzije = objekat.recenzije;
novaOcena = objekat.ocena;
objekat.save();
}else
{
    var suma=0;
   
    objekat.recenzije[indexx] = recenzija;
    objekat.recenzije.forEach(rec=>{
        suma+=rec.ocena;
    });
    objekat.ocena = suma / objekat.countRec;
    novaOcena=objekat.ocena;
    recenzije = objekat.recenzije;
    objekat.save();
    
}
}).then(obj=>{

    io.to("recenzije").emit('dodata-recenzija',{recenzije: recenzije,ocena:novaOcena});
    res.status(201).json({
        poruka: "Recenzija uspesno dodata.",
        recenzijaKreirana: recenzija
});
})
.catch(err=>{
res.status(500).json({
    poruka: "Greska prilikom dodavanja recenzije",
    Greska: err
});
});

}

const stoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    brojMesta: Number,
    isFree: Boolean,
    isReserved: {type: Boolean, default: false}
});

const Sto = mongoose.model('Sto',stoSchema);

module.exports.dodaj_sto = ( req, res, next ) => {
    io = require('../routes/object').IO;


    var nazivObjekta =  req.body.nazivObjekta;
    var sto = new Sto({
        _id: new mongoose.Types.ObjectId,
        brojMesta: req.body.brojMesta,
        isFree: req.body.isFree
    });


    Object.findOne({naziv: nazivObjekta}).then(objekat=>{
       objekat.stolovi.push(sto);
        var slobodni = 0; 
       objekat.stolovi.forEach(stol=>{
        if(stol.isFree){
            slobodni++;
        }
       });
       objekat.brSlobodnihStolova = slobodni;
       objekat.save().then(obj=>{
        io.to(obj.naziv).emit('zakazao',{ukupnoSlobodnihStolova: obj.ukupnoSlobodnihStolova, stolovi: obj.stolovi})
        io.emit('zaPocetnu',{objekat: obj});
       });
       
        }).then(obj=>{
            res.status(201).json({
                poruka: "Sto je uspesno dodat.",
                dodatiSto: sto
        });
        });
}
// {
// 	"brojMesta":"8",
// 	"isFree":"true",
// 	"nazivObjekta":"Night and Day"
// }



module.exports.objects_get_all = (req,res,next)=>{ 
    Object.find()//ako nema argumenata u find onda vraca sve
    //ili find().limit i onda dodamo kolko da pribavi npr 10
    //moze i where za neki uslov
        .select('naziv tipObjekta ocena recenzije countRec stolovi brSlobodnihStolova opis slikaObjekta') //posto ima nesto interno __v, to ne zelim da mi salje nazad
        //pa sa select izaberem samo sta ocu
        .exec()
        .then(docs=>{
            const response={
                count: docs.length,
                objects: docs.map(doc=>{
                    return{
                        naziv: doc.naziv,
                        tipObjekta: doc.tipObjekta,
                        ocena: doc.ocena,
                        recenzije: doc.recenzije,
                        ukupnoRecenzija: doc.countRec,
                        stolovi: doc.stolovi,
                        opis: doc.opis,
                        ukupnoSlobodnihStolova: doc.brSlobodnihStolova,
                        _id: doc._id,            
                        slikaObjekta: doc.slikaObjekta,
                        mapa: doc.mapa,         
                        request:{
                            type: 'GET',
                            url: 'http://localhost:3000/objects/'+doc._id
                        }
                    }
                })
            };
            
            return res.status(200).json(response);
        })
        .then()
        .catch(err=>console.log(err));
}

module.exports.get_object = (req, res, next) => 
{
   
    var idObjekta = req.params.ObjectId;
    Object.findById(idObjekta)
    .select('naziv tipObjekta ocena recenzije countRec stolovi brSlobodnihStolova opis slikaObjekta slikaPlanaObjekta mapa kontakti') //posto ima nesto interno __v, to ne zelim da mi salje nazad
    .exec()
    .then(doc=>{
        const response={
            naziv: doc.naziv,
            tipObjekta: doc.tipObjekta,
            ocena: doc.ocena,
            recenzije: doc.recenzije,
            ukupnoRecenzija: doc.countRec,
            stolovi: doc.stolovi,
            opis: doc.opis,
            ukupnoSlobodnihStolova: doc.brSlobodnihStolova,
            _id: doc._id,
            slikaObjekta: doc.slikaObjekta, 
            slikaPlanaObjekta: doc.slikaPlanaObjekta,
            mapa: doc.mapa,
            kontakti: doc.kontakti,   			
            request:{
                type: 'GET',
                url: 'http://localhost:3000/objects/'
            }
        }
       
        res.status(200).json(response);
    }).catch(err=>res.status(404).json({
        poruka: 'Trazeni objekat ne postoji',
        error: err
    }
    ));

}
/* 
request: 'GET'
URL: http://localhost:3000/objects/:IdObjekta
posledica: vraca json objekat sa trazenim id-jem ako postoji.
ako ne vraca poruku {poruka: 'Trazeni objekat ne postoji'}
*/
module.exports.delete_object = (req, res, next)=>
{
    const idObjekta = req.params.ObjectId;
    Object.deleteOne({_id: idObjekta})
            .exec()
            .then(result =>{
                res.status(200).json(result);
            })
            .then()
            .catch(err =>{
                res.status(500).json({
                    error: err
                });
            });
}
/*
request: 'DELETE',
URL: http://localhost:3000/objects/:IDObjekta
posledica: Objekad sa id-jem IDObjekta bice obrisan iz baze
*/
module.exports.obrisi_sto = (req, res, next) =>
{
    io = require('../routes/object').IO;
const idStola = req.params.StoId;
const objNaziv = req.body.naziv;

Object.findOne({naziv: objNaziv})
.exec()
.then(obj=>{
    if(obj.stolovi.id(idStola)!=null){
       if(obj.stolovi.id(idStola).isFree) obj.brSlobodnihStolova--;
    obj.stolovi.id(idStola).remove();
    obj.save();
    io.to(obj.naziv).emit('zakazao',{stolovi: obj.stolovi, brSlobodnihStolova:obj.brSlobodnihStolova})
    io.emit('zaPocetnu',{objekat:obj});
    res.status(200).json({poruke: 'Sto je uspesno obrisan.'});
    
}else
    res.status(200).json({poruka:'Trazeni sto ne postoji.'});
});






}
/*
request: 'DELETE'
URL: http://localhost:3000/objects/stolovi/:StoId
body: {
    "naziv":"Naziv objekta"
}
posledica: u objektu "Naziv objekta" bice obrisan sto sa _id = Stoid
*/

module.exports.zauzmi_sto = (req, res, next)=>
{
    io = require('../routes/object').IO;

const stoId = req.body.stoId;
const objekatId = req.body.objectId;
console.log(stoId,objekatId);

Object.findById(objekatId)
    .exec()
    .then(obj=>{
        
       var sto= obj.stolovi.id(stoId)
       if(sto!=null && sto.isFree){
        sto.isFree = false;
        obj.brSlobodnihStolova--;
        obj.save();
        io.to(obj.naziv).emit('zakazao',{brSlobodnihStolova:obj.brSlobodnihStolova ,stolovi: obj.stolovi})
        io.emit('zaPocetnu',{objekat:obj});
        
        res.status(202).json({poruka:'Sto je azuriran uspesno'});
       }else{
        res.status(200).json({poruka:'Neuspesno, sto ne postoji ili je vec zauzet.'})
       }
    });
}

module.exports.oslobodi_sto = (req, res, next) =>
{

    io = require('../routes/object').IO;
    const stoId = req.body.stoId;
const objekatId = req.body.objectId;

Object.findById(objekatId)
    .exec()
    .then(obj=>{
       var sto= obj.stolovi.id(stoId)
       if(sto!=null && !sto.isFree){
        sto.isFree = true;
        sto.isReserved = false;
        obj.brSlobodnihStolova++;
        obj.save();
         io.to(obj.naziv).emit('zakazao',{brSlobodnihStolova: obj.brSlobodnihStolova,stolovi: obj.stolovi})
        io.emit('zaPocetnu',{objekat:obj});
        res.status(202).json({poruka:'Sto je azuriran uspesno'});
       }else{
        res.status(200).json({poruka:'Neuspesno, sto ne postoji ili je vec slobodan.'})
       }
    });

}

module.exports.rezervisi_sto = (req, res, next)=>
{
    io = require('../routes/object').IO;

    const stoId = req.body.stoId;
const objekatId = req.body.objekatId;
Object.findById(objekatId)
    .exec()
    .then(obj=>{
       var sto= obj.stolovi.id(stoId)
       if(sto!=null && sto.isFree){
        sto.isFree = false;
        sto.isReserved = true;
        obj.brSlobodnihStolova--;
        obj.save();
        io.to(obj.naziv).emit('zakazao',{ brSlobodnihStolova: obj.brSlobodnihStolova,stoId: stoId , stolovi: obj.stolovi})
        io.emit('zaPocetnu',{objekat:obj});
        res.status(202).json({poruka:'Sto je uspesno rezervisan'});
       }else{
        res.status(200).json({poruka:'Neuspesno, sto ne postoji ili je vec zauzet.'})
       }
    });
}
