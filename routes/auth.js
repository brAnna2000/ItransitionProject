const {Router} = require('express');
const passport = require('passport');
const router = Router();

router.post('/login', passport.authenticate('local',{successRedirect : `/userpage/2`, failureRedirect : '/', 
failureFlash : true})
,(req,res)=>{
    // console.log("router:"+JSON.stringify(req.body));
    // res.redirect('/create')
    console.log(req.body)
})
// router.get('/create',(req,res)=>{
//     let a = 'ok';
//     res.json(a)
// })
module.exports = router;