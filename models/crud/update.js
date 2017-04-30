const orm = require('../../orm/orm.js');
const Club = orm.Club;
const Player = orm.Player;
const Doctor = orm.Doctor;

module.exports = {
    club : async(query) => {
        let instanceChoice = query[0];
        let instanceName = query[1];
        let newClubName = query[2];
        if (instanceChoice == 'player') {
            let player = await Player.find({ where: { playerName: instanceName }});
            let club = await Club.find({ where: { clubName: newClubName }});
            if (club) {
                await player.setClub(club);
            };
        } else {
            let doctor = await Doctor.find({ where: { doctorName: instanceName }});
            let club = await Club.find({ where: { clubName: newClubName }});
            if (club) {
                doctor.setClub(club);
            };
        };
    },

    player : async(query) => {
        let doctorName = query[0];
        let actionChoice = query[1];
        let playerName = query[2];
        if (actionChoice == 'add') {
            let doctor = await Doctor.find({ where: { doctorName: doctorName }});
            let player = await Player.find({ where: { playerName: playerName }});
            await doctor.addPlayer(player);
            cb(`${doctorName}\'s players list updated successfully!`);
        } else {
            let doctor = await Doctor.find({ where: { doctorName: doctorName }});
            let player = await Player.find({ where: { playerName: playerName }});
            let players = await doctor.getPlayers();
            let deletionIndex = players.indexOf(playerName);
            players.splice(deletionIndex, 1);
            await doctor.setPlayers(players);
            cb(`${doctorName}\'s players list updated successfully!`);
        };
    },

    doctor : async(query) => {
        let playerName = query[0];
        let actionChoice = query[1];
        let doctorName = query[2];
        if (actionChoice == 'add') {
            let player = await Player.find({ where: { playerName: playerName }});
            let doctor = await Doctor.find({ where: { doctorName: doctorName }});
            await player.addDoctor(doctor);
            cb(`${playerName}\'s doctors list updated successfully!`);
        } else {
            let player = await Player.find({ where: { playerName: playerName }});
            let doctor = await Doctor.find({ where: { doctorName: doctorName }});
            let doctors = await player.getDoctors();
            let deletionIndex = doctors.indexOf(doctorName);
            doctors.splice(deletionIndex, 1);
            await player.setDoctors(doctors);
            cb(`${playerName}\'s doctors list updated successfully!`);
        };
    }
}
