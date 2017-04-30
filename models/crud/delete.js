const orm = require('../../orm/orm.js');
const Club = orm.Club;
const Player = orm.Player;
const Doctor = orm.Doctor;

module.exports = {
    club : async(club) => {
        let clubDeleted = await Club.destroy({ where: { clubName: club } });
    },

    player : async(player) => {
        let playerDeleted = await Player.destroy({ where: { playerName: player } });
    },

    doctor : async(doctor) => {
        let doctorDeleted = await Doctor.destroy({ where: { doctorName: doctor } });
    }
}
