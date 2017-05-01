const orm = require('../../orm/orm.js');
const Club = orm.Club;
const Player = orm.Player;
const Doctor = orm.Doctor;

module.exports = {
    club : async(clubName) => {
        let clubFound = await Club.find({ where: { clubName: clubName } });
        if (clubFound) {
            await Club.destroy({ where: { clubName: clubName } });
            return 200;
        } else {
            return 404;
        };
    },

    player : async(playerName) => {
        let playerFound = await Player.find({ where: { playerName: playerName } });
        if (playerFound) {
            await Player.destroy({ where: { playerName: playerName } });
            return 200;
        } else {
            return 404;
        };
    },

    doctor : async(doctorName) => {
        let doctorFound = await Doctor.find({ where: { doctorName: doctorName } });
        if (doctorFound) {
            await Doctor.destroy({ where: { doctorName: doctorName } });
            return 200;
        } else {
            return 404;
        }
    }
}
