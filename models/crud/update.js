const orm = require('../../orm/orm.js');
const Club = orm.Club;
const Player = orm.Player;
const Doctor = orm.Doctor;

module.exports = {
    playersClubField : async(query) => {
        let playerName = query[0];
        let newClubName = query[1];
        let player = await Player.find({ where: { playerName: playerName }});
        let club = await Club.find({ where: { clubName: newClubName }});
        if (club) {
            player.setClub(club);
        };
    },

    doctorsClubField : async(query) => {
        let doctorName = query[0];
        let newClubName = query[1];
        let doctor = await Doctor.find({ where: { doctorName: doctorName }});
        let club = await Club.find({ where: { clubName: newClubName }});
        if (club) {
            doctor.setClub(club);
        };
    },

    addPlayerToDoctor : async(query) => {
        let doctorName = query[0];
        let playerName = query[1];
        let doctor = await Doctor.find({ where: { doctorName: doctorName }});
        let player = await Player.find({ where: { playerName: playerName }});
        doctor.addPlayer(player);
    },

    deletePlayerFromDoctor : async(query) => {
        let doctorName = query[0];
        let playerName = query[1];
        let doctor = await Doctor.find({ where: { doctorName: doctorName }});
        let player = await Player.find({ where: { playerName: playerName }});
        let players = await doctor.getPlayers();
        let deletionIndex = players.indexOf(playerName);
        players.splice(deletionIndex, 1);
        doctor.setPlayers(players);
    },

    addDoctorToPlayer : async(query) => {
        let playerName = query[0];
        let doctorName = query[1];
        let player = await Player.find({ where: { playerName: playerName }});
        let doctor = await Doctor.find({ where: { doctorName: doctorName }});
        player.addDoctor(doctor);
    },

    deleteDoctorFromPlayer : async(query) => {
        let playerName = query[0];
        let doctorName = query[1];
        let player = await Player.find({ where: { playerName: playerName }});
        let doctor = await Doctor.find({ where: { doctorName: doctorName }});
        let doctors = await player.getDoctors();
        let deletionIndex = doctors.indexOf(doctorName);
        doctors.splice(deletionIndex, 1);
        player.setDoctors(doctors);
    }
}
