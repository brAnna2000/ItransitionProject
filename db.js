const Sequelize = require("sequelize");
// const db = new Sequelize("testAnime", "postgres", "1234", {
//     dialect: "postgres",
//     host: "127.0.0.1"
// });
const db = new Sequelize('postgres://postgres:1234@localhost:5432/testAnime')

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
  //       name: 'Администратор',
  //   },
  //   )
  //   Roles.create(
  //   {
  //       name: 'Пользователь',
  //   }
  //   )
  //   Users.create(
  //   {
  //       roleId: 2,
  //       name: 'Анна',
  //       surname: 'Барановская',
  //       email: 'anya.baranovskaya@gmail.com'
  //   }
  //   )
  //   Users.create(
  //   {
  //       roleId: 2,
  //       name: 'Настя',
  //       surname: 'Пасюк',
  //       email: 'nastya.pasyuk@gmail.com'
  //   }
  //   )
  //   Users.create(
  //   {
  //       roleId: 2,
  //       name: 'Олег',
  //       surname: 'Сульжич',
  //       email: 'sulzicholeg@gmail.com'
  //   }
  //   )
  //   Groups.create(
  //   {
  //       name: 'Кино'
  //   }
  //   )
  //   Groups.create(
  //   {
  //       name: 'Книги'
  //   }
  //   )
  //   Groups.create(
  //   {
  //       name: 'Игры'
  //   }
  //   )
  //   Reviews.create(
  //   {
  //       usersId: 2,
  //       groupsId: 2,
  //       name: 'Смерть на Ниле',
  //       grade: 9,
  //       text: 'Одна из любимых книг Агаты Кристи. Тонкая, печальная, глубоко психологичная – о любви, которая искажает и извращает взгляд на мир, о предательстве, о том, что можно купить за деньги, а что нет. Ну и, конечно, как и всегда – лихо закрученная интрига, неожиданная развязка и обаяние Эркюля Пуаро',
  //       likes: 0,
  //       createdAt: new Date(),
  //       updatedAt: new Date()
  //   }
  //   )
  //   Reviews.create(
  //   {
  //       usersId: 3,
  //       groupsId: 3,
  //       name: 'Red Dead Redemption 2',
  //       grade: 10,
  //       text: 'Red Dead Redemption 2 — лучшая игра в открытом мире из всех существующих на сегодня. И, разумеется, это лучшая игра Rockstar. Самая взрослая. Самая красивая и продуманная. Огромная, но почти без лишних элементов. Это не «GTA про лошадей». Это новый уровень для студии, важный шаг в ее развитии, и в развитии видеоигр вообще. В нее нужно играть, если вы любите видеоигры. Такое я заявляю очень редко.',
  //       likes: 0,
  //       createdAt: new Date(),
  //       updatedAt: new Date()
  //   }
  //   )
  //   Tags.create(
  //   {
  //       name: 'Детектив',
  //       status: 1,
  //   }
  //   )
  //   Tags.create(
  //   {
  //       name: 'Приключения',
  //       status: 1,
  //   }
  //   )
  //   ReviewsTags.create(
  //   {
  //       reviewsId: 1,
  //       tagsId: 1,
  //   }
  //   )
  //   ReviewsTags.create(
  //   {
  //       reviewsId: 2,
  //       tagsId: 2,
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