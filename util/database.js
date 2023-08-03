const Sequelize = require('sequelize')

const sequelize = new Sequelize('dbdatabase','root','Ithinkican@123',
{dialect:'mysql',host:'localhost'})

 module.exports=sequelize

