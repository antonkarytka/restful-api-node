const orm = require('../../orm/orm.js');
const Club = orm.Club;
const Player = orm.Player;
const Doctor = orm.Doctor;

module.exports = {
    clubs : async() => {
        let clubs = await Club.findAll();
        let clubsList = {
            'clubs': clubs.map(club => { return `${club.clubName} (${club.clubId})` })
        };
        return clubsList;
    },

    players : async() => {
        let players = await Player.findAll();
        let playersList = {
            'players': players.map(player => { return `${player.playerName} (${player.playerId})` })
        };
        return playersList;
    },

    doctors : async() => {
        let doctors = await Doctor.findAll();
        let doctorsList = {
            'doctors': doctors.map(doctor => { return `${doctor.doctorName} (${doctor.doctorId})` })
        };
        return doctorsList;
    }
}
