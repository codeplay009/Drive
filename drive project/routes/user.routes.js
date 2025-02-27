const express = require('express')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get('/',(req,res)=>{
    res.render('home')
})

router.get('/register',(req,res)=>{
    res.render('register')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/upload',(req,res)=>{
    res.render('drive')
})

module.exports = router