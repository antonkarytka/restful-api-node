const orm = require('../../orm/orm.js');
const Club = orm.Club;
const Player = orm.Player;
const Doctor = orm.Doctor;

module.exports = {
    club : async(clubId) => {
        let club = await Club.find({ where: { clubId: clubId } });
        if (club) {
            let clubInfo = '';
            let players = await club.getPlayers();
            clubInfo += 'Players:\n';
            if (players.length > 0) {
                for (let player of players)
                    clubInfo += `- ${player.playerName} (${player.playerId})`;
                clubInfo += '\n';
            } else {
                clubInfo += '- none';
                clubInfo += '\n';
            };

            let doctors = await club.getDoctors();
            clubInfo += 'Doctors:\n';
            if (doctors.length > 0) {
                for (let doctor of doctors)
                clubInfo += `- ${doctor.doctorName} (${doctor.doctorId})`;
                clubInfo += '\n';
            } else {
                clubInfo += '- none';
            };
            return clubInfo;
        } else {
            return '';
        };
    },

    player : async(playerId) => {
        let player = await Player.find({ where: { playerId: playerId } });
        if (player) {
            let club = await player.getClub();
            let playerInfo = `Club: ${club.clubName} (${club.clubId})\n`;
            let doctors = await player.getDoctors();
            playerInfo += 'Doctors:\n';
            if (doctors.length > 0) {
                for (let doctor of doctors)
                    playerInfo += `- ${doctor.doctorName} (${doctor.doctorId})`;
            } else {
                playerInfo += '- none';
            };
            return playerInfo;
        } else {
            return '';
        };
    },

    doctor : async(doctorId) => {
        let doctor = await Doctor.find({ where: { doctorId: doctorId } });
        if (doctor) {
            let club = await doctor.getClub();
            let doctorInfo = `Club: ${club.clubName}\n`;
            let players = await doctor.getPlayers();
            doctorInfo += 'Players:\n';
            if (players.length > 0) {
                for (let player of players)
                    doctorInfo += `- ${player.playerName} (${player.playerId})`;
            } else {
                doctorInfo += '- none';
            };
            return doctorInfo;
        } else {
            return '';
        };
    }
}
