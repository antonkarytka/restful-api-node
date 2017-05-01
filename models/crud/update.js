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
        if (player && club) {
            await player.setClub(club);
            return 200;
        } else {
            return 404;
        };
    },

    doctorsClubField : async(query) => {
        let doctorName = query[0];
        let newClubName = query[1];
        let doctor = await Doctor.find({ where: { doctorName: doctorName }});
        let club = await Club.find({ where: { clubName: newClubName }});
        if (doctor && club) {
            await doctor.setClub(club);
            return 200;
        } else {
            return 404;
        };
    },

    addPlayerToDoctor : async(query) => {
        let doctorName = query[0];
        let playerName = query[1];
        let doctor = await Doctor.find({ where: { doctorName: doctorName }});
        let player = await Player.find({ where: { playerName: playerName }});
        if (doctor && player) {
            await doctor.addPlayer(player);
            return 200;
        } else {
            return 404;
        };
    },

    deletePlayerFromDoctor : async(query) => {
        let doctorName = query[0];
        let playerName = query[1];
        let doctor = await Doctor.find({ where: { doctorName: doctorName }});
        if (doctor) {
            let players = await doctor.getPlayers();
            let deletionIndex = players.indexOf(playerName);
            players.splice(deletionIndex, 1);
            await doctor.setPlayers(players);
            return 200;
        } else {
            return 404;
        };
    },

    addDoctorToPlayer : async(query) => {
        let playerName = query[0];
        let doctorName = query[1];
        let player = await Player.find({ where: { playerName: playerName }});
        let doctor = await Doctor.find({ where: { doctorName: doctorName }});
        if (player && doctor) {
            await player.addDoctor(doctor);
            return 200;
        } else {
            return 404;
        };
    },

    deleteDoctorFromPlayer : async(query) => {
        let playerName = query[0];
        let doctorName = query[1];
        let player = await Player.find({ where: { playerName: playerName }});
        if (player) {
            let doctors = await player.getDoctors();
            let deletionIndex = doctors.indexOf(doctorName);
            doctors.splice(deletionIndex, 1);
            await player.setDoctors(doctors);
            return 200;
        } else {
            return 404;
        };
    }
}
