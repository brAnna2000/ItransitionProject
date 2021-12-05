const LocalStrategy = require('passport-local');
const passport = require('passport');
const db = require('../backend/db');
const {Users} = require('../backend/db');

passport.serializeUser((user,done)=>{
    console.log('serialize', user)
    return done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
    console.log(id)
    try{
        const result = await Users.findOne({where: {id: `${id}`}})
        if(result.dataValues){    
            return done(null,result.dataValues.id)
        }
    }
    catch(err){
        return done(err,null)
    }
})

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try{
            const result = await Users.findOne({where: {name: `${username}`}})
            if(result === null){
                return done(null,false)
            }
            else if (result.dataValues.password === password){
                return done(null,result.dataValues); 
            }
            else{
                return done(null,false)
            }
        }
        catch(err){
            console.log('error passport')
            return done(err,false)
        }
    }
))