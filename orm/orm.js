const Sequelize = require('sequelize');

const sequelize = new Sequelize('footballClub.sqlite', null, null, {
    host: 'localhost',
    port: 3000,
    dialect: 'sqlite',
    storage: './footballClub.sqlite'
});

const Club = sequelize.define('club', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.TEXT
    }
});

const Player = sequelize.define('player', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.TEXT
    }
});

const Doctor = sequelize.define('doctor', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.TEXT
    }
});

Player.belongsTo(Club);
Club.hasMany(Player);
Doctor.belongsTo(Club);
Club.hasMany(Doctor);
Player.belongsToMany(Doctor, {through: 'PlayersDoctors'});
Doctor.belongsToMany(Player, {through: 'PlayersDoctors'});

sequelize.sync();

module.exports.sequelize = sequelize;
module.exports.Club = Club;
module.exports.Player = Player;
module.exports.Doctor = Doctor;
