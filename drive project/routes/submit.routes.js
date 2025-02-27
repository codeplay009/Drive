const express = require('express');
const router = express.Router();
const User = require('../models/user');
const File = require('../models/fileModel');

const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator');

const jwt = require('jsonwebtoken');

router.use(express.json())
router.use(express.urlencoded({extended:true}))

const multer = require('multer');
const path = require('path');
const { start } = require('repl');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

router.post('/register',
    body('username').trim().isLength({min:3,max:15}),
    body('email').trim().isEmail().isLength({min:13,max:30}),    
    body('password').trim().isLength({min:5,max:15}),
    async(req,res)=>{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }else{
            const {username,email,password} = req.body;
            const passwordHash = await bcrypt.hash(password,10);

            const newUser = await User.create({
                    username,
                    email,
                    password: passwordHash          // store the hashed password in password field in this manner only
                });  

            res.send('user created successfully');
        }   
    }
);

router.post('/login',
    body('username').trim().isLength({min:3,max:15}),    
    body('password').trim().isLength({min:5,max:15}),
    async(req,res)=>{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }else{
            const {username,password} = req.body;
            const user = await User.findOne({username:username});

            if(!user){
                return res.send('Username or password is incorrect');
            }   

            const validPassword = await bcrypt.compare(password,user.password);

            if(!validPassword){
                return res.send('Username or password is incorrect');
            }

            const token = jwt.sign(
                {id:user._id,
                username:user.username,
                email:user.email
                },
                process.env.JWT_SECRET);

            res.cookie('token',token);
           
            res.send('logged in successfully');
        }   
    }
);

router.post('/upload', upload.single("file"), (req, res) => {
  
    console.log(req.body);
    console.log(req.file);

    const newFile = new File({
        FilePath: req.file.path,
        filename: req.file.filename
    });

    res.redirect('/upload');
    newFile.save();
    console.log(newFile);

});  
  
module.exports = router;