const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const Candy = require('./models/Candy.js')
// const cors = require('cors')
const port=3000

const ejs = require('ejs');

// const errorController = require('./controllers/error');
const sequelize =require('./util/database')

const app = express();

// app.use(cors())

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// app.set('views', 'views');
// app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');
const adminRoutes  = require('./routes/candies');

// app.use(bodyParser.json({ extended: false }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRoutes)

app.get('/',(req,res)=>{
  res.redirect('/shop')
})

// Route to render the candy_shop.html using EJS
app.get('/shop', (req, res) => {
    console.log(req)
    res.render('candy_shop');
  });

app.get('*',(req,res)=>{
  res.render('error')
})

// Sync the model with the database (create the Candy table if it doesn't exist)
sequelize
  .sync()
  .then(() => {
    console.log('Connected to the database and synced the models.');
    app.listen(port, () => {
      console.log('Server started and listening on port 3000.');
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
  });

// sequelize.sync().then(res=>{
//     console.log(res)
//     app.listen(4000);
// })
// .catch(e=>console.log(e))

