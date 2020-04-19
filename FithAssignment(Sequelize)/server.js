const express = require('express')
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 3000;
const UserRouter = require('./routes/users');

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use('/user', UserRouter );

db.sequelize.sync();

// drop existing tables and re-sync database. Just use force: true 
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

app.listen(PORT, ()=> {
    console.log('Listening on : http://localhost:$(PORT)');
});
