const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const {Roles, Users, Groups, Reviews, Tags, ReviewsTags} = require('./db');
let roles = '';
let users = '';
let groups = [];
let reviewsGroups = '';
let reviews = '';
let usersReviews = '';
let tags = '';
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
async function getGroups(a) {
  a = await Groups.findAll();
  return a;
}
async function getReviewGroup(a) {
  a = await Groups.findOne({where: {id: 3}});
  return a;
}
async function getReviews(a) {
  a = await Reviews.findAll();
  return a;
}
async function getUserReview(a) {
  a = await Reviews.findAll({where: {usersId: 3}});
  return a;
}
async function getTags(a) {
  a = await Tags.findAll();
  return a;
}
async function getTag(a) {
  a = await Tags.findOne({where: {id: 2}});
  return a;
}
async function getReviewsTags(a) {
  a = await ReviewsTags.findOne({where: {reviewsId: 2}});
  return a;
}

getUserReview(usersReviews).then(usersReviews=>{

    let reviewObj = {};
    reviewObj.name = usersReviews[0].dataValues.name;
    reviewObj.grade = usersReviews[0].dataValues.grade;
    reviewObj.text = usersReviews[0].dataValues.text;

    getReviewGroup(reviewsGroups).then(reviewsGroups=>{
      reviewObj.group = reviewsGroups.dataValues.name;
    })

    getReviewsTags(rwvtags).then(rwvtags=>{
      
      let tagsId = rwvtags.dataValues.tagsId;
      getTag(tags).then(tags=>{
        reviewObj.tags = tags.dataValues.name;
        console.log(reviewObj)
      })
    })
    
    app.listen(PORT,()=>{
      console.log(`server starting on port ${PORT}`)
    })
    app.get('/api',(req,res)=>{
      res.json(reviewObj)
    })
  })
  
// getGroups(grp).then(grp=>{
//     for (var i = 0; i < grp.length; i++) {
//       grp[i] = grp[i].dataValues.name;
    //   let a = i.toString();
    //   objG[a] = grp[i];
    // }
//     app.get('/api',(req,res)=>{
//       res.send(JSON.stringify(grp))
//   })
// })