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
async function getUserByName(a,b) {
  a = await Users.findOne({where: {name: b}});
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
    console.log(err)
    return 'err'
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
  saveUninitialized: true,
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
    if(''==id){
      id = req.user;
    }
    console.log('userpage.id='+id);
    getUserReviews(reviews,Number(id)).then(async (reviews)=>{
    let reviewsObj = [];
    
    for(i = 0;i < reviews.length;i++){
      let obj = {};
      obj.name = reviews[i].dataValues.name;
      obj.grade = reviews[i].dataValues.grade;
      obj.text = reviews[i].dataValues.text;
      obj.likes = reviews[i].dataValues.likes;
      obj.userId = reviews[i].dataValues.usersId;
      await getUser(users,reviews[i].dataValues.usersId).then(users=>{
        obj.userName = users.dataValues.name;
        obj.userSurname = users.dataValues.surname;
      })
      await getGroup(groups,reviews[i].dataValues.groupsId).then(groups=>{
        obj.group = groups.dataValues.name;       
      })
      await getReviewsTags(tags,reviews[i].dataValues.id).then(async (tags)=>{
        obj.tags = [];
        if(tags.length == 0){
          return obj.tags.push('')
        }
        else{      
          for(j=0;j<tags.length;j++){
            await getTag(tag,tags[j].dataValues.tagsId).then(tag=>{
              obj.tags.push(tag.dataValues.name)
            })
          }
        }
      }).catch(function (err) {
        console.log('err1')
      }); 
      reviewsObj.push(obj);
    }
    res.json(reviewsObj)
  })
  
}) 

app.post('/userpage/change',(req,res)=>{
  Reviews.update({ text: req.body.text }, {
    where: {
      usersId: req.body.userId,
      name: req.body.name
    }
  })
})

app.post('/userpage/delete',(req,res)=>{
  Reviews.destroy({
    where: {
      usersId: req.body.userId,
      name: req.body.name
    }
  }).then((res) => {
    console.log(res);
  });
})

app.get('/createreview',(req,res)=>{
  let obj = {}
  let tagsList = [];
  let groupsList = [];
  getTags(tags).then(tags=>{
    for(i=0;i<tags.length;i++){
      tagsList.push(tags[i].dataValues.name)
    } 
    obj.tags = tagsList
  })
  getGroups(groups).then(groups=>{
    for(i=0;i<groups.length;i++){
      groupsList.push(groups[i].dataValues.name)
    } 
    obj.groups = groupsList
    res.json(obj)
  })
}) 

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.post('/view',(req,res)=>{
  data = req.body;
  console.log(data)
  res.json(data)
  app.get('/view',(req,res)=>{
    console.log('RES!!!!  ',res.body)
  })
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
  getReviews(reviews).then(async (reviews)=>{
    let lastReview = {};
    lastReview.name = reviews[reviews.length-1].dataValues.name;
    lastReview.grade = reviews[reviews.length-1].dataValues.grade;
    lastReview.text = reviews[reviews.length-1].dataValues.text;
    lastReview.likes = reviews[reviews.length-1].dataValues.likes;

    await getUser(users,reviews[reviews.length-1].dataValues.usersId).then(users=>{
      lastReview.userName = users.dataValues.name;
      lastReview.userSurname = users.dataValues.surname;
    })
    await getReviewGroup(groups, reviews[reviews.length-1].dataValues.groupsId).then(groups=>{
      lastReview.group = groups.dataValues.name;
    })
    await getReviewsTags(tags, reviews[reviews.length-1].dataValues.id).then(async(tags)=>{
      if(tags.length == 0){
        return
      }
      else{
        console.log(tags)
        await getTag(tag,tags[0].dataValues.tagsId).then(tag=>{
          if(tag===['err']){
            return
          }
          else{
            lastReview.tags = tag.dataValues.name;
          }
        })
      }
    })
       
    getBestReview(reviews).then(async (reviews)=>{
      let bestReview = {};
      bestReview.grade = reviews[0].dataValues.grade;
      bestReview.text = reviews[0].dataValues.text;
      bestReview.name = reviews[0].dataValues.name;
      bestReview.likes = reviews[0].dataValues.likes;
      await getUser(users,reviews[0].dataValues.usersId).then(users=>{
        bestReview.userName = users.dataValues.name;
        bestReview.userSurname = users.dataValues.surname;
      })
      await getReviewGroup(groups, reviews[0].dataValues.groupsId).then(groups=>{
        bestReview.group = groups.dataValues.name;
      })
      await getReviewsTags(tags,reviews[0].dataValues.id).then(async (tags)=>{
        if(tags===undefined){
          return
        }
        else{
          await getTag(tag,tags[0].dataValues.tagsId).then(tag=>{
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

      let tagsCloud = [];
      getCurrentTags(tags).then(tags=>{
        for(i = 0;i < tags.length;i++){
          tagsCloud[i] = tags[i].dataValues.name;
        }
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
  getTagByName(tags, data[0]).then(async (tags)=>{
    let reviewsByTag = [];
    let rev = {};

    await getReviewsByTag(reviews,tags.dataValues.id).then(async (reviews)=>{
      console.log(reviews)
      for(i=0;i<reviews.length;i++){
        rev.id = reviews[i].dataValues.reviewsId
        
        await getReview(reviews,reviews[i].dataValues.reviewsId).then(async (reviews)=>{
          rev.name = reviews.dataValues.name;
          rev.grade = reviews.dataValues.grade;
          rev.text = reviews.dataValues.text;
          rev.likes = reviews.dataValues.likes;
          rev.usersId = reviews.dataValues.usersId;
          rev.groupsId = reviews.dataValues.groupsId;

          await getUser(users,rev.usersId).then(users=>{
            rev.userName = users.dataValues.name;
            rev.userSurname = users.dataValues.surname;
          })

          await getReviewGroup(groups,rev.groupsId).then(groups=>{
            rev.group = groups.dataValues.name;
          })
        }) 
        reviewsByTag.push(rev)
      }
      console.log(reviewsByTag)
      res.json(reviewsByTag)
    })
  })
})