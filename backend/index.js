const express = require('express');
const session = require('express-session');
const PORT = process.env.PORT || 3001;
const app = express();
const passport = require('passport');
var bodyParser = require("body-parser");
const local = require('../strategies/local');
const authRoute = require('../routes/auth');
const store = new session.MemoryStore();
const {Roles, Users, Groups, Reviews, Tags, ReviewsTags} = require('./db');

let roles = '';
let users = '';
let groups = [];
let reviewsGroups = '';
let reviews = '';
let usersReviews = '';
let tags = '';
let tag = '';
let rwvtags = '';
let objG = {};
let grade = '';

async function getRoles(a) {
  a = await Roles.findAll();
  return a;
}
async function getUsers(a) {
  a = await Users.findAll();
  return a;
}
async function getUser(a,b) {
  a = await Users.findOne({where: {id: b}});
  return a;
}
async function getGroups(a) {
  a = await Groups.findAll();
  return a;
}
async function getGroup(a,b) {
  a = await Groups.findOne({where: {id: b}});
  return a;
}
async function getReviewGroup(a, b) {
  a = await Groups.findOne({where: {id: b}});
  return a;
}
async function getGroupByName(a,b) {
  a = await Groups.findOne({where: {name: b}});
  return a;
}
async function getReviews(a) {
  a = await Reviews.findAll();
  return a;
}
async function getReview(a, b) {
  a = await Reviews.findOne({where: {id: b}});
  return a;
}
async function getLastReview(a) {
  a = await Reviews.findOne({where: {id: 2}});
  return a;
}
async function getUserReviews(a,b) {
  a = await Reviews.findAll({where: {usersId: b}});
  return a;
}
async function getBestReview(a) {
  a = await Reviews.findAll({where: {grade: 10}});
  return a;
}
async function getTags(a) {
  a = await Tags.findAll();
  return a;
}
async function getCurrentTags(a,b) {
  a = await Tags.findAll({where: {status: 1}});
  return a;
}
async function getTag(a,b) {
  try{
    a = await Tags.findOne({where: {id: b}});
    if(a != undefined){
      return a
    }
  }
  catch(err){
    console.log(err)
    return ['err']
  }
}
async function getTagByName(a,b) {
  try{
    a = await Tags.findOne({where: {name: b}});
    if(a != undefined){
      return a
    }
  }
  catch(err){
    console.log('getTagByName')
    return ['err']
  }
}
async function getReviewsTags(a,b) {
  try{
    a = await ReviewsTags.findAll({where: {reviewsId: b}});
    if(a != undefined){
      return a
    }
  }
  catch(err){
    console.log('h')
    return ['err']
  }
}
async function getReviewsByTag(a,b) {
  try{
    a = await ReviewsTags.findAll({where: {tagsId: b}});
    if(a != undefined){
      return a
    }
  }
  catch(err){
    console.log(err)
    return ['err']
  }
}
app.use(session({
  secret: 'some secret',
  cookie: {maxAge: 30000},
  saveUninitialized: false,
  resave: false,
  store
}))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use((req,res, next)=>{
  console.log(`${req.method} - ${req.url}`);
  next();
})
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth', authRoute);

app.listen(PORT,()=>{
  console.log(`server starting on port ${PORT}`)
})

app.get('/userpage/*',(req,res)=>{
    let id = req.path.slice('/userpage/'.length)
    getUserReviews(reviews,Number(id)).then(reviews=>{
    let reviewsObj = [];
    
    for(i = 0;i < reviews.length;i++){
      let obj = {};
      obj.name = reviews[i].dataValues.name;
      obj.grade = reviews[i].dataValues.grade;
      obj.text = reviews[i].dataValues.text;
      obj.likes = reviews[i].dataValues.likes;
      obj.userId = reviews[i].dataValues.usersId;
      
      getUser(users,reviews[i].dataValues.usersId).then(users=>{
        obj.userName = users.dataValues.name;
        obj.userSurname = users.dataValues.surname;
      })
      getGroup(groups,reviews[i].dataValues.groupsId).then(groups=>{
        obj.group = groups.dataValues.name;       
      })
      getReviewsTags(tags,reviews[i].dataValues.id).then(tags=>{
        if(tags.length == 0){
          return
        }
        else{
          obj.tags = tags[0].dataValues.name;
        }
      }).catch(function (err) {
        console.log('err1')
      }); 
      reviewsObj.push(obj);
    }
    res.json(reviewsObj)
  })
}) 

app.get('/createreview',(req,res)=>{
  let tagsList = [];
  getTags(tags).then(tags=>{
    for(i=0;i<tags.length;i++){
      tagsList.push(tags[i].dataValues.name)
    } 
  })
  res.json(tagsList)
}) 

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.post('/view',(req,res)=>{
  data = req.body;
  res.json(data)
  // app.get('/view',(req,res)=>{
  
  // })
})

app.post('/createreview',(req,res)=>{
  data = req.body;
  getTagByName(tags, data.tags[0]).then(tags=>{
    if(tags===['err']){
      return
    }
    else{
      data.tagsId = tags.dataValues.id
    }
  })
  getGroupByName(groups, data.group).then(groups=>{
    data.groupsId = groups.dataValues.id;
    Reviews.create(
    {
      usersId: data.usersId,
      groupsId: data.groupsId,
      name: data.name,
      grade: data.grade,
      text: data.text,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ).then(result=>{
      ReviewsTags.create(
      {
        reviewsId: result.id,
        tagsId: data.tagsId,
      }
    )
    })
  })
}) 

app.get('/mainpage',(req,res)=>{
  getReviews(reviews).then(reviews=>{
    let lastReview = {};
    lastReview.name = reviews[reviews.length-1].dataValues.name;
    lastReview.grade = reviews[reviews.length-1].dataValues.grade;
    lastReview.text = reviews[reviews.length-1].dataValues.text;
    lastReview.likes = reviews[reviews.length-1].dataValues.likes;

    getUser(users,reviews[reviews.length-1].dataValues.usersId).then(users=>{
      lastReview.userName = users.dataValues.name;
      lastReview.userSurname = users.dataValues.surname;
    })

    getReviewGroup(groups, reviews[reviews.length-1].dataValues.groupsId).then(groups=>{
      lastReview.group = groups.dataValues.name;
    })
    let a = '7'
    getReviewsTags(tags, reviews[reviews.length-1].dataValues.id).then(tags=>{
      // console.log(tags)
      let tagOne = '';
      getTag(tag,tags[0].dataValues.tagsId).then(tag=>{
        // lastReview.tags = tag.dataValues.name;
        tagOne = tag.dataValues.name;
        // console.log(tagOne)
      })
      // a=tagOne
      // console.log(a)
    })
    // lastReview.tags = tagOne;
       
    getBestReview(reviews).then(reviews=>{
      let bestReview = {};
      bestReview.grade = reviews[0].dataValues.grade;
      bestReview.text = reviews[0].dataValues.text;
      bestReview.name = reviews[0].dataValues.name;
      bestReview.likes = reviews[0].dataValues.likes;
      getUser(users,reviews[0].dataValues.usersId).then(users=>{
        bestReview.userName = users.dataValues.name;
        bestReview.userSurname = users.dataValues.surname;
      })
      getReviewGroup(groups, reviews[0].dataValues.groupsId).then(groups=>{
        bestReview.group = groups.dataValues.name;
      })
      getReviewsTags(tags,reviews[0].dataValues.id).then(tags=>{
        if(tags===undefined){
          return
        }
        else{
          getTag(tag,tags[0].dataValues.tagsId).then(tag=>{
            if(tag ===['err']){
              return
            }
            else{
              bestReview.tags = tag.dataValues.name;
              return bestReview
            }       
          })
        }
      })
      // getReviewsTags(tags, reviews[0].dataValues.id).then(tags=>{
      //   if(tags===undefined){
      //     return
      //   }
      //   else{
      //     let a = tags[0].dataValues.tagsId
      //     return a
      //   }
      // }).then(a=>{
      //     getTag(tag,a).then(tag=>{
      //       if(tag ===['err']){
      //         return
      //       }
      //       else{
      //         bestReview.tags = tag.dataValues.name;
      //         return bestReview
      //         console.log(bestReview)
      //       }       
      //     })
      // })
      // .catch(function (err) {
      //   console.log('err')
      // });
      let tagsCloud = [];
      getCurrentTags(tags).then(tags=>{
        for(i = 0;i < tags.length;i++){
          tagsCloud[i] = tags[i].dataValues.name;
        }
        // console.log(bestReview)
        let mainPage = [tagsCloud, bestReview, lastReview];
        res.json(mainPage)
      })
    })
  })
})

app.get('/adminpage',(req,res)=>{
  getUsers(users).then(users=>{
    let usersList = [];
    for(i=0;i<users.length;i++){
      if(users[i].dataValues.roleId == 2){
        let user = {};
        user.name=users[i].dataValues.name;
        user.surname=users[i].dataValues.surname;
        user.id=users[i].dataValues.id;
        user.email=users[i].dataValues.email;
        let a = 0;
        getUserReviews(reviews,user.id).then(reviews=>{
        
        })
        usersList.push(user)
      }
    }
    res.json(usersList)
  })
  
}) 

app.post('/searchtag',(req,res)=>{
  data = req.body;
  getTagByName(tags, data[0]).then(tags=>{
    let reviewsByTag = [];
    let data = [];
    let user = [];
    let group = [];
    if(tags===['err']){
      return
    }
    else{
      getReviewsByTag(reviews,tags.dataValues.id).then(reviews=>{
        for(i=0;i<reviews.length;i++){
          reviewsByTag.push(reviews[i].dataValues.reviewsId)
        }
        for(i=0;i<reviewsByTag.length;i++){
          getReview(reviews,reviewsByTag[i]).then(reviews=>{
            let objr = {};
            objr.name = reviews.dataValues.name;
            objr.grade = reviews.dataValues.grade;
            objr.text = reviews.dataValues.text;
            objr.likes = reviews.dataValues.likes;
            objr.usersId = reviews.dataValues.usersId;
            objr.groupsId = reviews.dataValues.groupsId;
            data.push(objr)
          }) 
        }
        if(data.length===reviewsByTag.length){
          for(i=0;i<data.length;i++){
            getUser(users,data[i].usersId).then(users=>{
              let usr = {}
              usr.userName = users.dataValues.name;
              usr.userSurname = users.dataValues.surname;
              user.push(usr)
            })
            getReviewGroup(groups,data[i].groupsId).then(groups=>{
              let grp = {};
              grp = groups.dataValues.name;
              group.push(grp)
            })
          }
        }
      })
    }
  })
})