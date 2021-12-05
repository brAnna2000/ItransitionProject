const {Router} = require('express');
const passport = require('passport');
const router = Router();

router.post('/login', passport.authenticate('local',{successRedirect : `/userpage/`, failureRedirect : '/', 
failureFlash : false})
,(req,res)=>{
    console.log(req.body)
})

module.exports = router;