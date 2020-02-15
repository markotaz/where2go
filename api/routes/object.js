const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ObjectController = require('../controllers/object');
const multer = require('multer');

function returnRouter(io){

const storage = multer.diskStorage({//multer ce da pozove
    //ove funkcije svaki put kada primi novi fajl
    destination: function(req, file,cb)
    {
        cb(null,'./uploads/');
    },
    filename: function(req, file, cb)
    {
        cb(null,new Date().toISOString().replace(/:/g, '-')+file.originalname);
    }
});
const fileFilter = (req,file,cb)=>{
    //reject file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' )
    {
        //accept
        cb(null,true);
    }else{
    cb(null,false);
    }
};
const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 6},
    fileFilter: fileFilter
});
 

router.post('/',upload.fields([{name: 'objectImage', maxCount: 1},{name: 'slikaPlanaObjekta', maxCount: 1}]),ObjectController.create_object);
router.post('/recenzija', ObjectController.napravi_recenziju);
router.post('/stolovi',ObjectController.dodaj_sto);
router.delete('/stolovi/:StoId',ObjectController.obrisi_sto);
router.get('/',ObjectController.objects_get_all);
router.get('/:ObjectId',ObjectController.get_object);
router.delete('/:ObjectId',ObjectController.delete_object);
router.post('/stolovi/zauzmi',ObjectController.zauzmi_sto);
router.post('/stolovi/oslobodi', ObjectController.oslobodi_sto);
router.post('/stolovi/rezervisi/',ObjectController.rezervisi_sto);
router.post('/send-mail', ObjectController.saljiEmail);

module.exports.IO = io;
return router;
}

module.exports = returnRouter;

