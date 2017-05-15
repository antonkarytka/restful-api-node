const orm = require('../orm/orm.js');
const Club = orm.Club;
const Player = orm.Player;
const Doctor = orm.Doctor;

module.exports = {
    clubs : async(clubId) => {
        let club = await Club.find({ where: { id: clubId } });
        if (club) {
            let players = await club.getPlayers();
            let doctors = await club.getDoctors();
            let clubInfo = {
                'id': club.id,
                'name': club.name,
                'players': players.map(player => { return `${player.name} (${player.id})` }),
                'doctors': doctors.map(doctor => { return `${doctor.name} (${doctor.id})` })
            };
            return clubInfo;
        } else {
            return 404;
        };
    },

    players : async(playerId) => {
        let player = await Player.find({ where: { id: playerId } });
        if (player) {
            let club = await player.getClub();
            let doctors = await player.getDoctors();
            let clubName = '';
            let clubId = '';
            if (club == null) {
                clubName = '';
                clubId = '';
            } else {
                clubName = club.name;
                clubId = club.id;
            };
            let playerInfo = {
                'id': player.id,
                'name': player.name,
                'club': `${clubName} (${clubId})`,
                'doctors': doctors.map(doctor => { return `${doctor.name} (${doctor.id})` })
            };
            return playerInfo;
        } else {
            return 404;
        };
    },

    doctors : async(doctorId) => {
        let doctor = await Doctor.find({ where: { id: doctorId } });
        if (doctor) {
            let club = await doctor.getClub();
            let players = await doctor.getPlayers();
            let clubName = '';
            let clubId = '';
            if (club == null) {
                clubName = '';
                clubId = '';
            } else {
                clubName = club.name;
                clubId = club.id;
            };
            let doctorInfo = {
                'id': doctor.id,
                'name': doctor.name,
                'club': `${clubName} (${clubId})`,
                'players': players.map(player => { return `${player.name} (${player.id})` })
            };
            return doctorInfo;
        } else {
            return 404;
        };
    }
}
