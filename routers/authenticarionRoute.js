const express = require('express');

const { register, login } = require('../controllers/authenticarionController');
const  validate  = require('../middlewares/validatorMiddleware');
const {registerSchema,loginSchema}=require('../validators/userValidator');

const router = express.Router();
router.post('/register', validate(registerSchema),register);
router.post('/login',validate(loginSchema), login);


module.exports = router;
