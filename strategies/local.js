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
        // console.log('deserialize')
        const result = await Users.findOne({where: {id: `${id}`}})
        if(result.dataValues){
            // console.log(result.dataValues)
            
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
            // console.log(result.dataValues.password, password)
            if(result === null){
                return done(null,false)
            }
            else if (result.dataValues.password === password){
                // if(result.dataValues.roleId == 1){
                //     return done(null,result.dataValues);
                // }
                // else if(result.dataValues.roleId == 2){
                //    return done(null,result.dataValues); 
                // }
                // console.log(result.dataValues.roleId)
                // return result.dataValues.password
                return done(null,result.dataValues,{message:'rfn'}); 
            }
            else{
                return done(null,false)
            }
        }
        catch(err){
            console.log('s')
            return done(err,false)
        }
    }
))