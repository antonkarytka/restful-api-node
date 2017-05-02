const orm = require('../../orm/orm.js');
const Club = orm.Club;
const Player = orm.Player;
const Doctor = orm.Doctor;

module.exports = {
    club : async(clubId) => {
        let club = await Club.find({ where: { clubId: clubId } });
        if (club) {
            let players = await club.getPlayers();
            let doctors = await club.getDoctors();
            let clubInfo = {
                'id': club.clubId,
                'name': club.clubName,
                'players': {
                    'player': players.map(player => { return `${player.playerName} (${player.playerId})` })
                },
                'doctors': {
                    'doctor': doctors.map(doctor => { return `${doctor.doctorName} (${doctor.doctorId})` })
                }
            };
            return clubInfo;
        } else {
            return 404;
        };
    },

    player : async(playerId) => {
        let player = await Player.find({ where: { playerId: playerId } });
        if (player) {
            let club = await player.getClub();
            let doctors = await player.getDoctors();
            let playerInfo = {
                'id': player.playerId,
                'name': player.playerName,
                'club': `${club.clubName} (${club.clubId})`,
                'doctors': {
                    'doctor': doctors.map(doctor => { return `${doctor.doctorName} (${doctor.doctorId})` })
                }
            };
            return playerInfo;
        } else {
            return 404;
        };
    },

    doctor : async(doctorId) => {
        let doctor = await Doctor.find({ where: { doctorId: doctorId } });
        if (doctor) {
            let club = await doctor.getClub();
            let players = await doctor.getPlayers();
            let doctorInfo = {
                'id': doctor.doctorId,
                'name': doctor.doctorName,
                'club': `${club.clubName} (${club.clubId})`,
                'players': {
                    'player': players.map(player => { return `${player.playerName} (${player.playerId})` })
                }
            };
            return doctorInfo;
        } else {
            return 404;
        };
    }
}
