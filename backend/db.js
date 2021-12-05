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
//     name: 'Администратор',
//   },
//   )
//   Roles.create(
//   {
//     name: 'Пользователь',
//   }
//   )
//   Users.create(
//   {
//     roleId: 1,
//     name: 'Анна',
//     surname: 'Барановская',
//     email: 'anya.baranovskaya@gmail.com',
//     password: '5270june'
//   }
//   )
//   Users.create(
//   {
//     roleId: 2,
//     name: 'Настя',
//     surname: 'Пасюк',
//     email: 'nastya.pasyuk@gmail.com',
//     password: '8765february'
//   }
//   )
//   Users.create(
//   {
//     roleId: 2,
//     name: 'Олег',
//     surname: 'Сульжич',
//     email: 'sulzicholeg@gmail.com',
//     password: '9913may'
//   }
//   )
//   Users.create(
//   {
//     roleId: 2,
//     name: 'Вероника',
//     surname: 'Иодковская',
//     email: 'veriodkovskaya@gmail.com',
//     password: '0105may'
//   }
//   )
//   Users.create(
//   {
//     roleId: 2,
//     name: 'Даша',
//     surname: 'Флерко',
//     email: 'dashaflerko@gmail.com',
//     password: '5555march'
//   }
//   )
//   Users.create(
//   {
//     roleId: 2,
//     name: 'Валера',
//     surname: 'Зелепуха',
//     email: 'valerazelepukha@gmail.com',
//     password: '1111august'
//   }
//   )
//   Users.create(
//   {
//     roleId: 2,
//     name: 'Андрей',
//     surname: 'Свиридов',
//     email: 'sviridovandrei@gmail.com',
//     password: '3636january'
//   }
//   )
//   Users.create(
//   {
//     roleId: 2,
//     name: 'Катя',
//     surname: 'Барковская',
//     email: 'katebarkovskaya@gmail.com',
//     password: '1604april'
//   }
//   )
//   Groups.create(
//   {
//     name: 'Кино'
//   }
//   )
//   Groups.create(
//   {
//     name: 'Книги'
//   }
//   )
//   Groups.create(
//   {
//     name: 'Игры'
//   }
//   )
//   Groups.create(
//   {
//     name: 'Комиксы'
//   }
//   )
//   Groups.create(
//   {
//     name: 'Фанфики'
//   }
//   )
//   Groups.create(
//   {
//     name: 'Аниме'
//   }
//   )
//   Groups.create(
//   {
//     name: 'Сериалы'
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 2,
//     groupsId: 2,
//     name: 'Смерть на Ниле',
//     grade: 9,
//     text: 'Одна из любимых книг Агаты Кристи. Тонкая, печальная, глубоко психологичная – о любви, которая искажает и извращает взгляд на мир, о предательстве, о том, что можно купить за деньги, а что нет. Ну и, конечно, как и всегда – лихо закрученная интрига, неожиданная развязка и обаяние Эркюля Пуаро',
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
//     text: 'Один из самых прекрасных фильмов, что я смотрела. Очень сложно подбирать слова, чтобы описать мои чувства после просмотра... Моя оценка - минимум 12 из 10!',
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
//     text: 'Возможно на фоне современных изысков в компьютерных играх первый Ассассин смотрится не так шикарно, но ... Но это просто превосходное начало, давшее жизнь целой череде великолепных, потрясающих в изяществе графики и увлекательности сюжетов игр в серии Assassin Creed. Конечно же, я рекомендую познакомиться с данной отличной игрой всем, кто не знаком, но интересуется категорией Action',
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
//     text: 'Red Dead Redemption 2 — лучшая игра в открытом мире из всех существующих на сегодня. И, разумеется, это лучшая игра Rockstar. Самая взрослая. Самая красивая и продуманная. Огромная, но почти без лишних элементов. Это не «GTA про лошадей». Это новый уровень для студии, важный шаг в ее развитии, и в развитии видеоигр вообще. В нее нужно играть, если вы любите видеоигры. Такое я заявляю очень редко.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 4,
//     groupsId: 6,
//     name: 'Аватар: Легенда об Аанге',
//     grade: 8,
//     text: '«Аватар: Легенда об Аанге» — это красивая сказка о справедливости, которую можно пересматривать бессчётное количество раз. В сюжете гармонично переплетаются легкомыслие и серьёзность, что позволяет зрителю любого возраста найти что-то интересное. Однозначно рекомендую к просмотру.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 4,
//     groupsId: 5,
//     name: 'Магловские штучки',
//     grade: 8,
//     text: 'Первый раз читаю про такого Снейпа. И действительно, как он был шпионом? Нестандартно очень. Но Автору большое спасибо. Очень нравится',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 4,
//     groupsId: 1,
//     name: 'Очень страшное кино 5',
//     grade: 5,
//     text: 'Разочаровало в фильме практически всё. Практически все шутки в фильме банальные, про то, что кто-то постоянно падает, ударяется и т.д. Ужасная пародия на фильмы `Мама` и `Паранормальные явления`. Я, как человек, которые предыдущие части пересматривал большое количество раз, ОСК 5 посмотрел только один единственный раз, и в ближайшее время точно не собираюсь смотреть его. За некоторые смешные шутки. И за Snoop Dogа. И за такую же тупую атмосферу в фильме.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 5,
//     groupsId: 6,
//     name: 'Евангелион',
//     grade: 10,
//     text: 'Аска Ленгли, на мой взгляд - самый живой персонаж Neon Genesis Evangelion, ее чувства реальны, а переживания обоснованы. Только она, и отчасти Мисато Кацураги, вызывают сочувствие. Хоть Синдзи Икари и выпала тяжелая ноша, но он самый тупой, слабый и пустой персонаж в Еве (это круто - он определенно вызывает эмоции). А душа Синдзи Икари поражает уродством. Однозначно аниме достойнейшее, за мириады испытанных разрозненных эмоций: гнев и сопереживание, желание защитить и влечение испепелить. Евангелион по праву можно считать достоянием человечества, это отражение исключительной силы разума людей.',
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
//     text: 'Spirit of the North хорошо справляется с тем, чтобы поведать занимательную скандинавскую быль без слов. Чувство упоённости волшебством здесь достигается через чарующий саундтрек, искусный визуальный стиль и весёлые головоломки, от которых сложно оторваться. В проекте Infuse Studio также есть, что следует улучшить: просторным локациям пошло бы на пользу более обильное наполнение контентом, а платформенную часть не помешало бы выпутать из паутины бектрекинга. Некоторые технические недочёты изредка напоминают о себе, но, благодаря компактной и гибкой системе выбора глав, при надобности можно перезапустить отдельные участки. Spirit of the North заслуживает внимания поклонников жанра, а также любителей милых лисичек и скандинавской тематики.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 5,
//     groupsId: 7,
//     name: 'Игра в кальмара',
//     grade: 9,
//     text: 'Я не из тех, кто увлекался корейской культурой до того как это стало мейнстримом, но одна из тех кто посмотрела нашумевший и самый популярный сериал нетфликса "Игра в кальмара". Если кратко и без спойлеров, то сериал о людях. О том как принимать решения, о том насколько важно оставаться человеком, о том, что ситуации бывают разные и неоднозначные, что мир не белый/черный. Феномен популярности сериала в том, что он актуален для всех миров/стран, везде есть социальное неравенство/долги/выбор. Все эти насущные проблемы, которые в той или иной степени касаются обычного человека. Но, важно понимать, что формат игры для азиатских стран не нов. "Наш мир, уже похож на антиутопию, где процветают несправедливость и неравенство". Довольно забавно, что речь про жадность и капитализм, о котором идет речь в сериале - обогащает одну из крупных корпораций. P.S. Однозначно, стоит его смотреть, вопрос понравится или нет, как всегда вопрос вкусовщины, но стоит отметить, что сериал породил целый мир мемов и культуры. Отличная социальная рефлексия вышла.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 6,
//     groupsId: 1,
//     name: 'Титаник',
//     grade: 10,
//     text: 'Смотрю этот фильм уже шестой раз и до сих пор восхищаюсь игрой актеров. Я мог бы бесконечно наблюдать за мимикой влюбленных. У каждого разная судьба, но главное - это времяпровождение героев на судне. Я был очень растроган такой непредсказуемой концовкой фильма. Но и вдохновлен одновременно. Ведь любовь может жить в человеке всю его жизнь. И пара влюбленных из фильма это показывает.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 6,
//     groupsId: 1,
//     name: 'Шан-чи и легенда десяти колец',
//     grade: 6,
//     text: 'Отличный сборник стереотипов о Китае и Азии в целом. Яркие неоновые города, якудза, драконы, бамбуковые рощи, кунг-фу, тут полный набор. На выходе обыкновенный киноаттракцион от Марвел, отторжения не вызывает, но и ничего нового не несет, хотели отмазаться от Мандарина из ЖЧ3, так этот фильм и есть ЖЧ3 в плане качества. От просмотра ни тепло ни холодно, пропустишь и не заметишь, посмотришь и не вспомнишь. Смотреть можно, но нужно ли, вот главный вопрос.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 7,
//     groupsId: 1,
//     name: 'Человек-Паук',
//     grade: 8,
//     text: 'Прикольный и явно кассовый фильм. Снята лента достойно, смотрится легко, особых переживаний не требуется. Идеи в сюжете не блестящие, но такие всегда срабатывают почти на 100%. Можно даже смотреть с подружкой. И хотя многое по сюжету понятно заранее, фильм интересный и заслуживает внимания.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 7,
//     groupsId: 7,
//     name: 'Южный парк',
//     grade: 10,
//     text: 'Можно любить ЮП, избегать или ненавидеть. Но время расставило все по своим местам - Южный парк это не мультфильм - это новости наоборот. Это сатира как есть, все вечные проявления человеческой натуры и все острые на сегодняшний день моменты - все есть тут.Советовать ЮП я никому не буду, потому что для меня отдельных серий ЮП не существует, для меня есть постепенно развивающийся и меняющийся мир. Но если кто-то решиться - милости прошу.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 8,
//     groupsId: 4,
//     name: 'Женщина-кошка',
//     grade: 9,
//     text: 'Видела замечательные иллюстрации в интернете, но когда держишь эту книгу в руках - все гораздо лучше! Очень приятная, хорошего качества книга! Красочные динамичные картинки и подробная история женщины-кошки - в общем, то, что надо для ценителей этой героини! :) ',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//   {
//     usersId: 8,
//     groupsId: 7,
//     name: 'Половое воспитание',
//     grade: 8,
//     text: 'Sex Education - это не только, и не столько про секс. Он про то, что нужно разговаривать о проблемах и не бояться разговаривать о своих чувствах. Этого в реальной жизни чертовски не хватает - множество людей пытаются запрятать свои чувства подальше, мысли поглубже, отвлечься на работу, алкоголь, хобби или что-то еще, лишь бы никто не узнал, что у него на душе. Ребята, тут Вам наглядно показывают, что ничего страшного нет, в том, чтобы сказать что Вам нравится, или наоборот, не нравится. Что Вы чего-то хотите. Честно скажу, что посмотри я этот сериал в 18-20 лет, моя жизнь могла бы сильно поменяться в лучшую сторону. Надеюсь, кому-то больше повезёт. Актёры все очень старательно отыгрывают роль, эмоции, чувства и этому веришь. Особенно шикарен Ншути Гатва. Его герой (не обращаем внимание на ориентацию) просто потрясающий, такого друга (подчеркну, друга) хотелось бы иметь наверняка каждому. Минусом можно назвать немного затянутую драму во втором сезоне и слегка неуместный туалетный юмор в третьем.',
//     likes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   )
//   Reviews.create(
//     {
//       usersId: 8,
//       groupsId: 5,
//       name: 'Чистая победа',
//       grade: 10,
//       text: 'ВЕЛИКОЛЕПНАЯ РАБОТА!!! Очень вкусная, сочная нца, очаровашка Горо, а ваш Итто.... Боги, я его обожаю, он таким охуенным получился!!!! И диалоги у вас супер, и описания и в общем... СПАСИБО',
//       likes: 0,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     }
//     )
//   Tags.create(
//   {
//     name: 'Детектив',
//     status: 1,
//   }
//   )
//   Tags.create(
//   {
//     name: 'Приключения',
//     status: 1,
//   }
//   )
//   Tags.create(
//   {
//     name: 'Топ',
//     status: 1,
//   }
//   )
//   Tags.create(
//   {
//     name: 'Мультфильмы',
//     status: 1,
//   }
//   )
//   Tags.create(
//   {
//     name: 'Для взрослых',
//     status: 1,
//   }
//   )
//   Tags.create(
//   {
//     name: 'Мелодрамма',
//     status: 1,
//   }
//   )
//   Tags.create(
//   {
//     name: 'Супергерои',
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
//     name: 'Комедия',
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