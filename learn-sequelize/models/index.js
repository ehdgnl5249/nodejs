const { Server } = require('http');
const path = require('path');
const Sequelize = require('sequelize');
const { serialize } = require('v8');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

db.User.hasMany(db.Comment, { foriegnKey: 'commenter', sourceKey: 'id' });
db.Comment.belongsTo(db.User, {foriegnKey: 'commenter', targetKey: 'id' });

module.exports = db;