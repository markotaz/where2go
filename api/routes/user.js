const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');


router.post('/signup',UserController.user_signup);
  
router.delete("/:userId",checkAuth,UserController.delete_user);

router.post('/login',UserController.user_login);

router.post('/admin/login',UserController.admin_login);

router.post('/admin/signup',UserController.admin_signup);



module.exports = router;

