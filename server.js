const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

// 引入uers.js
const users = require('./routers/api/user');
const profile = require('./routers/api/profile');

// DB config
const db = require('./config/keys').mongoURI;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// node 配置跨域
// app.use((req, res, next) => {
//   //设置允许跨域的域名，*代表允许任意域名跨域
//   res.header("Access-Control-Allow-Origin", "*");
//   //允许的header类型
//   res.header("Access-Control-Allow-Headers", "content-type");
//   //跨域允许的请求方式 
//   res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
//   next();
// })
// passport初始化
app.use(passport.initialize());
require('./config/passport')(passport);

// Connect to Mongodb
mongoose
  .connect(
    db, {
      useNewUrlParser: true
    },
    {useNewUrlParser: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// app.get('/', (req, res) => {
//     res.send('hello word');
// })

// 使用routers
app.use('/api/users', users);
app.use('/api/profile', profile);

const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
