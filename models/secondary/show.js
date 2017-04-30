const orm = require('../../orm/orm.js');
const Club = orm.Club;
const Player = orm.Player;
const Doctor = orm.Doctor;

module.exports = {
    clubs : async() => {
        let clubsList = 'Existing clubs:\n';
        let clubs = await Club.findAll();
        if (clubs.length > 0) {
            for (let club of clubs)
                clubsList += `- ${club.clubName} (${club.clubId})\n`;
        } else {
            clubsList += 'none';
        };
        return clubsList;
    },

    players : async() => {
        let playersList = 'Existing players:\n';
        let players = await Player.findAll();
        if (players.length > 0) {
            for (let player of players)
                playersList += `- ${player.playerName} (${player.playerId})\n`;
        } else {
            playersList += 'none';
        };
        return playersList;
    },

    doctors : async() => {
        let doctorsList = 'Existing doctors:\n';
        let doctors = await Doctor.findAll();
        if (doctors.length > 0) {
            for (let doctor of doctors)
                doctorsList += `${doctor.doctorName} (${doctor.doctorId})\n`;
        } else {
            doctorsList += 'none';
        };
        return doctorsList;
    }
}
