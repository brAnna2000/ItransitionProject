const Sequelize = require("sequelize");
// const db = new Sequelize("testAnime", "postgres", "1234", {
//     dialect: "postgres",
//     host: "127.0.0.1"
// });
// const db = new Sequelize('postgres://postgres:1234@localhost:5432/dataBaseBaranovskaya')
const db = new Sequelize('postgres://pssmvnrdxqfesn:9443344391a1ae8e9bfbb3d03049ad381a4f1d7e53c81db6fd763b29e4c60f35@ec2-34-192-58-41.compute-1.amazonaws.com:5432/dat91foopsjgnp',
{
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const Roles = db.define("roles", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING
  }
});
const Users = db.define("users", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  roleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "roles",
      key: "id"
    }
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  surname: {
    allowNull: false,
    type: Sequelize.STRING
  },
  email: {
    allowNull: false,
    unique: true,
    type: Sequelize.STRING
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING
  }
});
const Groups = db.define("groups", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING
  }
});
const Reviews = db.define("reviews", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  usersId:{
    type: Sequelize.INTEGER,
    allowNull: false,
    references:{
      model: 'users',
      key: 'id',
    }
  },
  groupsId:{
    type: Sequelize.INTEGER,
    allowNull: false,
    references:{
      model: 'groups',
      key: 'id',
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  grade: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  likes: {
    type: Sequelize.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});
const Tags = db.define("tags", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
});
const ReviewsTags = db.define("reviewsTags", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  reviewsId:{
    type: Sequelize.INTEGER,
    allowNull: false,
    references:{
      model: 'reviews',
      key: 'id',
    }
  },
  tagsId:{
    type: Sequelize.INTEGER,
    allowNull: false,
    references:{
      model: 'tags',
      key: 'id',
    }
  },
});
// db.sync({force: true}).then(result=>{
  
//   Roles.create(
//   {
//     name: '??????????????????????????',
//   },
//   )
//   Roles.create(
//   {
//     name: '????????????????????????',
//   }
//   )
//   Users.create(
//   {
//     roleId: 1,
//     name: '????????',
//     surname: '??????????????????????',
//     email: 'anya.baranovskaya@gmail.com',
//     password: '5270june'
//   }
//   )
//   Users.create(
//   {
//     roleId: 2,
//     name: '??????????',
//     surname: '??????????',
//     email: 'nastya.pasyuk@gmail.com',
//     password: '8765february'
//   }
//   )
//   Users.create(
//   {
//     roleId: 2,
//     name: '????????',
//     surname: '??????????????',
//     email: 'sulzicholeg@gmail.com',
//     password: '9913may'
//   }
//   )
//   Users.create(
//   {
//     roleId: 2,
//     name: '????????????????',
//     surname: '????????????????????',
//     email: 'veriodkovskaya@gmail.com',
//     password: '0105may'
//   }
//   )
//   Users.create(
//   {
//     roleId: 2,
//     name: '????????',
//     surname: '????????????',
//     email: 'dashaflerko@gmail.com',
//     password: '5555march'
//   }
//   )
//   Users.create(
//   {
//     roleId: 2,
//     name: '????????????',
//     surname: '????????????????',
//     email: 'valerazelepukha@gmail.com',
//     password: '1111august'
//   }
//   )
//   Users.create(
//   {
//     roleId: 2,
//     name: '????????????',
//     surname: '????????????????',
//     email: 'sviridovandrei@gmail.com',
//     password: '3636january'
//   }
//   )
//   Users.create(
//   {
//     roleId: 2,
//     name: '????????',
//     surname: '????????????????????',
//     email: 'katebarkovskaya@gmail.com',
//     password: '1604april'
//   }
//   )
//   Groups.create(
//   {
//     name: '????????'
//   }
//   )
//   Groups.create(
//   {
//     name: '??????????'
//   }
//   )
//   Groups.create(
//   {
//     name: '????????'
//   }
//   )
//   Groups.create(
//   {
//     name: '??????????????'
//   }
//   )
//   Groups.create(
//   {
//     name: '??????????????'
//   }
//   )
//   Groups.create(
//   {
//     name: '??????????'
//   }
//   )
//   Groups.create(
//   {
//     name: '??????????????'
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 2,
//     groupsId: 2,
//     name: '???????????? ???? ????????',
//     grade: 9,
//     text: '???????? ???? ?????????????? ???????? ?????????? ????????????. ????????????, ??????????????????, ?????????????? ?????????????????????????? ??? ?? ??????????, ?????????????? ???????????????? ?? ?????????????????? ???????????? ???? ??????, ?? ??????????????????????????, ?? ??????, ?????? ?????????? ???????????? ???? ????????????, ?? ?????? ??????. ???? ??, ??????????????, ?????? ?? ???????????? ??? ???????? ?????????????????????? ??????????????, ?????????????????????? ???????????????? ?? ?????????????? ???????????? ??????????',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 2,
//     groupsId: 1,
//     name: '1+1',
//     grade: 10,
//     text: '???????? ???? ?????????? ???????????????????? ??????????????, ?????? ?? ????????????????. ?????????? ???????????? ?????????????????? ??????????, ?????????? ?????????????? ?????? ?????????????? ?????????? ??????????????????... ?????? ???????????? - ?????????????? 12 ???? 10!',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 2,
//     groupsId: 3,
//     name: `Assassin's Creed`,
//     grade: 8,
//     text: '???????????????? ???? ???????? ?????????????????????? ?????????????? ?? ???????????????????????? ?????????? ???????????? ???????????????? ?????????????????? ???? ?????? ??????????????, ???? ... ???? ?????? ???????????? ???????????????????????? ????????????, ???????????? ?????????? ?????????? ???????????? ????????????????????????, ?????????????????????? ?? ?????????????????? ?????????????? ?? ?????????????????????????????? ?????????????? ?????? ?? ?????????? Assassin Creed. ?????????????? ????, ?? ???????????????????? ?????????????????????????? ?? ???????????? ???????????????? ?????????? ????????, ?????? ???? ????????????, ???? ???????????????????????? ???????????????????? Action',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 3,
//     groupsId: 3,
//     name: 'Red Dead Redemption 2',
//     grade: 10,
//     text: 'Red Dead Redemption 2 ??? ???????????? ???????? ?? ???????????????? ???????? ???? ???????? ???????????????????????? ???? ??????????????. ??, ????????????????????, ?????? ???????????? ???????? Rockstar. ?????????? ????????????????. ?????????? ???????????????? ?? ??????????????????????. ????????????????, ???? ?????????? ?????? ???????????? ??????????????????. ?????? ???? ??GTA ?????? ????????????????. ?????? ?????????? ?????????????? ?????? ????????????, ???????????? ?????? ?? ???? ????????????????, ?? ?? ???????????????? ???????????????? ????????????. ?? ?????? ?????????? ????????????, ???????? ???? ???????????? ??????????????????. ?????????? ?? ?????????????? ?????????? ??????????.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 4,
//     groupsId: 6,
//     name: '????????????: ?????????????? ???? ??????????',
//     grade: 8,
//     text: '??????????????: ?????????????? ???? ???????????? ??? ?????? ???????????????? ???????????? ?? ????????????????????????????, ?????????????? ?????????? ???????????????????????????? ???????????????????? ???????????????????? ??????. ?? ???????????? ???????????????????? ?????????????????????????? ?????????????????????? ?? ??????????????????????, ?????? ?????????????????? ?????????????? ???????????? ???????????????? ?????????? ??????-???? ????????????????????. ???????????????????? ???????????????????? ?? ??????????????????.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 4,
//     groupsId: 5,
//     name: '???????????????????? ????????????',
//     grade: 8,
//     text: '???????????? ?????? ?????????? ?????? ???????????? ????????????. ?? ??????????????????????????, ?????? ???? ?????? ??????????????? ???????????????????????? ??????????. ???? ???????????? ?????????????? ??????????????. ?????????? ????????????????',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 4,
//     groupsId: 1,
//     name: '?????????? ???????????????? ???????? 5',
//     grade: 5,
//     text: '???????????????????????? ?? ???????????? ?????????????????????? ??????. ?????????????????????? ?????? ?????????? ?? ???????????? ??????????????????, ?????? ????, ?????? ??????-???? ?????????????????? ????????????, ?????????????????? ?? ??.??. ?????????????? ?????????????? ???? ???????????? `????????` ?? `???????????????????????????? ??????????????`. ??, ?????? ??????????????, ?????????????? ???????????????????? ?????????? ?????????????????????????? ?????????????? ???????????????????? ??????, ?????? 5 ?????????????????? ???????????? ???????? ???????????????????????? ??????, ?? ?? ?????????????????? ?????????? ?????????? ???? ?????????????????? ???????????????? ??????. ???? ?????????????????? ?????????????? ??????????. ?? ???? Snoop Dog??. ?? ???? ?????????? ???? ?????????? ?????????????????? ?? ????????????.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 5,
//     groupsId: 6,
//     name: '????????????????????',
//     grade: 10,
//     text: '???????? ????????????, ???? ?????? ???????????? - ?????????? ?????????? ???????????????? Neon Genesis Evangelion, ???? ?????????????? ??????????????, ?? ?????????????????????? ????????????????????. ???????????? ??????, ?? ?????????????? ???????????? ????????????????, ???????????????? ????????????????????. ???????? ???????????? ?????????? ?? ???????????? ?????????????? ????????, ???? ???? ?????????? ??????????, ???????????? ?? ???????????? ???????????????? ?? ?????? (?????? ?????????? - ???? ?????????????????????? ???????????????? ????????????). ?? ???????? ???????????? ?????????? ???????????????? ??????????????????. ???????????????????? ?????????? ????????????????????????, ???? ?????????????? ???????????????????? ???????????????????????? ????????????: ???????? ?? ??????????????????????????, ?????????????? ???????????????? ?? ???????????????? ????????????????????. ???????????????????? ???? ?????????? ?????????? ?????????????? ???????????????????? ????????????????????????, ?????? ?????????????????? ???????????????????????????? ???????? ???????????? ??????????.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 5,
//     groupsId: 3,
//     name: 'Spirit of the North',
//     grade: 9,
//     text: 'Spirit of the North ???????????? ?????????????????????? ?? ??????, ?????????? ???????????????? ?????????????????????????? ?????????????????????????? ???????? ?????? ????????. ?????????????? ???????????????????? ?????????????????????? ?????????? ?????????????????????? ?????????? ???????????????? ??????????????????, ???????????????? ???????????????????? ?????????? ?? ?????????????? ??????????????????????, ???? ?????????????? ???????????? ????????????????????. ?? ?????????????? Infuse Studio ?????????? ????????, ?????? ?????????????? ????????????????: ???????????????????? ???????????????? ?????????? ???? ???? ???????????? ?????????? ???????????????? ???????????????????? ??????????????????, ?? ?????????????????????????? ?????????? ???? ???????????????? ???? ???????????????? ???? ?????????????? ??????????????????????. ?????????????????? ?????????????????????? ???????????????? ?????????????? ???????????????????? ?? ????????, ????, ?????????????????? ???????????????????? ?? ???????????? ?????????????? ???????????? ????????, ?????? ???????????????????? ?????????? ?????????????????????????? ?????????????????? ??????????????. Spirit of the North ?????????????????????? ???????????????? ?????????????????????? ??????????, ?? ?????????? ?????????????????? ?????????? ?????????????? ?? ?????????????????????????? ????????????????.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 5,
//     groupsId: 7,
//     name: '???????? ?? ????????????????',
//     grade: 9,
//     text: '?? ???? ???? ??????, ?????? ?????????????????? ?????????????????? ?????????????????? ???? ???????? ?????? ?????? ?????????? ??????????????????????, ???? ???????? ???? ?????? ?????? ???????????????????? ???????????????????? ?? ?????????? ???????????????????? ???????????? ?????????????????? "???????? ?? ????????????????". ???????? ???????????? ?? ?????? ??????????????????, ???? ???????????? ?? ??????????. ?? ?????? ?????? ?????????????????? ??????????????, ?? ?????? ?????????????????? ?????????? ???????????????????? ??????????????????, ?? ??????, ?????? ???????????????? ???????????? ???????????? ?? ??????????????????????????, ?????? ?????? ???? ??????????/????????????. ?????????????? ???????????????????????? ?????????????? ?? ??????, ?????? ???? ???????????????? ?????? ???????? ??????????/??????????, ?????????? ???????? ???????????????????? ??????????????????????/??????????/??????????. ?????? ?????? ???????????????? ????????????????, ?????????????? ?? ?????? ?????? ???????? ?????????????? ???????????????? ???????????????? ????????????????. ????, ?????????? ????????????????, ?????? ???????????? ???????? ?????? ?????????????????? ?????????? ???? ??????. "?????? ??????, ?????? ?????????? ???? ????????????????????, ?????? ???????????????????? ???????????????????????????????? ?? ??????????????????????". ???????????????? ??????????????, ?????? ???????? ?????? ???????????????? ?? ????????????????????, ?? ?????????????? ???????? ???????? ?? ?????????????? - ?????????????????? ???????? ???? ?????????????? ????????????????????. P.S. ????????????????????, ?????????? ?????? ????????????????, ???????????? ???????????????????? ?????? ??????, ?????? ???????????? ???????????? ????????????????????, ???? ?????????? ????????????????, ?????? ???????????? ?????????????? ?????????? ?????? ?????????? ?? ????????????????. ???????????????? ???????????????????? ?????????????????? ??????????.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 6,
//     groupsId: 1,
//     name: '??????????????',
//     grade: 10,
//     text: '???????????? ???????? ?????????? ?????? ???????????? ?????? ?? ???? ?????? ?????? ???????????????????? ?????????? ??????????????. ?? ?????? ???? ???????????????????? ?????????????????? ???? ?????????????? ????????????????????. ?? ?????????????? ???????????? ????????????, ???? ?????????????? - ?????? ???????????????????????????????? ???????????? ???? ??????????. ?? ?????? ?????????? ?????????????????? ?????????? ?????????????????????????????? ?????????????????? ????????????. ???? ?? ???????????????????? ????????????????????????. ???????? ???????????? ?????????? ???????? ?? ???????????????? ?????? ?????? ??????????. ?? ???????? ???????????????????? ???? ???????????? ?????? ????????????????????.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 6,
//     groupsId: 1,
//     name: '??????-???? ?? ?????????????? ???????????? ??????????',
//     grade: 6,
//     text: '???????????????? ?????????????? ?????????????????????? ?? ?????????? ?? ???????? ?? ??????????. ?????????? ???????????????? ????????????, ????????????, ??????????????, ???????????????????? ????????, ????????-????, ?????? ???????????? ??????????. ???? ???????????? ???????????????????????? ???????????????????????????? ???? ????????????, ???????????????????? ???? ????????????????, ???? ?? ???????????? ???????????? ???? ??????????, ???????????? ???????????????????? ???? ?????????????????? ???? ????3, ?????? ???????? ?????????? ?? ???????? ????3 ?? ?????????? ????????????????. ???? ?????????????????? ???? ?????????? ???? ??????????????, ???????????????????? ?? ???? ????????????????, ???????????????????? ?? ???? ??????????????????. ???????????????? ??????????, ???? ?????????? ????, ?????? ?????????????? ????????????.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 7,
//     groupsId: 1,
//     name: '??????????????-????????',
//     grade: 8,
//     text: '???????????????????? ?? ???????? ???????????????? ??????????. ?????????? ?????????? ????????????????, ?????????????????? ??????????, ???????????? ?????????????????????? ???? ??????????????????. ???????? ?? ???????????? ???? ??????????????????, ???? ?????????? ???????????? ?????????????????????? ?????????? ???? 100%. ?????????? ???????? ???????????????? ?? ??????????????????. ?? ???????? ???????????? ???? ???????????? ?????????????? ??????????????, ?????????? ???????????????????? ?? ?????????????????????? ????????????????.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 7,
//     groupsId: 7,
//     name: '?????????? ????????',
//     grade: 10,
//     text: '?????????? ???????????? ????, ???????????????? ?????? ????????????????????. ???? ?????????? ???????????????????? ?????? ???? ?????????? ???????????? - ?????????? ???????? ?????? ???? ???????????????????? - ?????? ?????????????? ????????????????. ?????? ???????????? ?????? ????????, ?????? ???????????? ???????????????????? ???????????????????????? ???????????? ?? ?????? ???????????? ???? ?????????????????????? ???????? ?????????????? - ?????? ???????? ??????.???????????????????? ???? ?? ???????????? ???? ????????, ???????????? ?????? ?????? ???????? ?????????????????? ?????????? ???? ???? ????????????????????, ?????? ???????? ???????? ???????????????????? ?????????????????????????? ?? ???????????????????? ??????. ???? ???????? ??????-???? ???????????????? - ?????????????? ??????????.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 8,
//     groupsId: 4,
//     name: '??????????????-??????????',
//     grade: 9,
//     text: '???????????? ?????????????????????????? ?????????????????????? ?? ??????????????????, ???? ?????????? ?????????????? ?????? ?????????? ?? ?????????? - ?????? ?????????????? ??????????! ?????????? ????????????????, ???????????????? ???????????????? ??????????! ?????????????????? ???????????????????? ???????????????? ?? ?????????????????? ?????????????? ??????????????-?????????? - ?? ??????????, ????, ?????? ???????? ?????? ?????????????????? ???????? ??????????????! :) ',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 8,
//     groupsId: 7,
//     name: '?????????????? ????????????????????',
//     grade: 8,
//     text: 'Sex Education - ?????? ???? ????????????, ?? ???? ?????????????? ?????? ????????. ???? ?????? ????, ?????? ?????????? ?????????????????????????? ?? ?????????????????? ?? ???? ?????????????? ?????????????????????????? ?? ?????????? ????????????????. ?????????? ?? ???????????????? ?????????? ?????????????????? ???? ?????????????? - ?????????????????? ?????????? ???????????????? ?????????????????? ???????? ?????????????? ????????????????, ?????????? ????????????????, ?????????????????? ???? ????????????, ????????????????, ?????????? ?????? ??????-???? ??????, ???????? ???? ?????????? ???? ??????????, ?????? ?? ???????? ???? ????????. ????????????, ?????? ?????? ???????????????? ????????????????????, ?????? ???????????? ?????????????????? ??????, ?? ??????, ?????????? ?????????????? ?????? ?????? ????????????????, ?????? ????????????????, ???? ????????????????. ?????? ???? ????????-???? ????????????. ???????????? ??????????, ?????? ???????????????? ?? ???????? ???????????? ?? 18-20 ??????, ?????? ?????????? ?????????? ???? ???????????? ???????????????????? ?? ???????????? ??????????????. ??????????????, ????????-???? ???????????? ??????????????. ???????????? ?????? ?????????? ?????????????????????? ???????????????????? ????????, ????????????, ?????????????? ?? ?????????? ????????????. ???????????????? ?????????????? ?????????? ??????????. ?????? ?????????? (???? ???????????????? ???????????????? ???? ????????????????????) ???????????? ??????????????????????, ???????????? ?????????? (??????????????????, ??????????) ???????????????? ???? ?????????? ?????????????????? ??????????????. ?????????????? ?????????? ?????????????? ?????????????? ?????????????????? ?????????? ???? ???????????? ???????????? ?? ???????????? ???????????????????? ?????????????????? ???????? ?? ??????????????.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//     {
//       usersId: 8,
//       groupsId: 5,
//       name: '???????????? ????????????',
//       grade: 10,
//       text: '???????????????????????? ????????????!!! ?????????? ??????????????, ???????????? ??????, ???????????????????? ????????, ?? ?????? ????????.... ????????, ?? ?????? ????????????, ???? ?????????? ???????????????? ??????????????????!!!! ?? ?????????????? ?? ?????? ??????????, ?? ???????????????? ?? ?? ??????????... ??????????????',
//       likes: 0,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     }
//     )
//   Tags.create(
//   {
//     name: '????????????????',
//     status: 1,
//   }
//   )
//   Tags.create(
//   {
//     name: '??????????????????????',
//     status: 1,
//   }
//   )
//   Tags.create(
//   {
//     name: '??????',
//     status: 1,
//   }
//   )
//   Tags.create(
//   {
//     name: '??????????????????????',
//     status: 1,
//   }
//   )
//   Tags.create(
//   {
//     name: '?????? ????????????????',
//     status: 1,
//   }
//   )
//   Tags.create(
//   {
//     name: '????????????????????',
//     status: 1,
//   }
//   )
//   Tags.create(
//   {
//     name: '????????????????????',
//     status: 1,
//   }
//   )
//   Tags.create(
//   {
//     name: 'Marvel',
//     status: 1,
//   }
//   )
//   Tags.create(
//   {
//     name: '??????????????',
//     status: 1,
//   }
//   )
//   ReviewsTags.create(
//   {
//     reviewsId: 1,
//     tagsId: 1,
//   }
//   )
//   ReviewsTags.create(
//   {
//     reviewsId: 2,
//     tagsId: 2,
//   }
//   )
//   ReviewsTags.create(
//   {
//     reviewsId: 5,
//     tagsId: 3,
//   }
//   )
//   ReviewsTags.create(
//   {
//     reviewsId: 5,
//     tagsId: 4,
//   }
//   )
//   ReviewsTags.create(
//   {
//     reviewsId: 7,
//     tagsId: 9,
//   }
//   )
//   ReviewsTags.create(
//   {
//     reviewsId: 9,
//     tagsId: 1,
//   }
//   )
//   ReviewsTags.create(
//   {
//     reviewsId: 12,
//     tagsId: 8,
//   }
//   )
//   ReviewsTags.create(
//   {
//     reviewsId: 12,
//     tagsId: 7,
//   }
//   )
//   ReviewsTags.create(
//   {
//     reviewsId: 16,
//     tagsId: 4,
//   }
//   )
// })
// .catch(err=> console.log(err));
module.exports = {
  db,
  Roles,
  Users,
  Groups, 
  Reviews,
  Tags,
  ReviewsTags
}