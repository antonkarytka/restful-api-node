const halson = require('halson');

const orm = require('../orm/orm.js');
const Club = orm.Club;
const Player = orm.Player;
const Doctor = orm.Doctor;

module.exports = {
    clubs : async(clubId) => {
        const club = await Club.find({ where: { id: clubId } });
        if (club) {
            const players = await club.getPlayers();
            const doctors = await club.getDoctors();
            const clubInfo = halson({
                'id': club.id,
                'name': club.name
            });
            clubInfo.addLink('Self', `clubs/${club.id}`);
            players.map(player => clubInfo.addLink(`Related player: ${player.name} (${player.id})`, `players/${player.id}`));
            doctors.map(doctor => clubInfo.addLink(`Related doctor: ${doctor.name} (${doctor.id})`, `doctors/${doctor.id}`));
            clubInfo.addLink('Create : new club', `clubs`);
            clubInfo.addLink(`Update : ${club.name} (${club.id})`, `clubs/${club.id}`);
            clubInfo.addLink(`Delete : ${club.name} (${club.id})`, `clubs/${club.id}`);
            const allPlayers = await Player.findAll();
            allPlayers.map(player => {
                clubInfo.addLink(`Add player : ${player.name}`, `clubs/${club.id}/players/${player.id}`);            
                clubInfo.addLink(`Remove player : ${player.name}`, `clubs/${club.id}/players/${player.id}`);            
            });
            const allDoctors = await Doctor.findAll();
            allDoctors.map(doctor => {
                clubInfo.addLink(`Add doctor : ${doctor.name}`, `clubs/${club.id}/doctors/${doctor.id}`);            
                clubInfo.addLink(`Remove doctor : ${doctor.name}`, `clubs/${club.id}/doctors/${doctor.id}`);            
            });

            return clubInfo;
        } else {
            return 404;
        };
    },

    players : async(playerId) => {
        const player = await Player.find({ where: { id: playerId } });
        if (player) {
            const club = await player.getClub();
            const doctors = await player.getDoctors();
            let clubName = '';
            let clubId = '';
            if (club == null) {
                clubName = '';
                clubId = '';
            } else {
                clubName = club.name;
                clubId = club.id;
            };
            const playerInfo = halson({
                'id': player.id,
                'name': player.name
            });
            playerInfo.addLink('Self', `players/${player.id}`);
            playerInfo.addLink(`Club : ${clubName} (${clubId})`, `clubs/${clubId}`)
            doctors.map(doctor => playerInfo.addLink(`Related doctor: ${player.name} (${player.id})`, `doctors/${doctor.id}`));            
            playerInfo.addLink('Create : new player', `players`);
            playerInfo.addLink(`Update : ${player.name} (${player.id})`, `players/${player.id}`);
            playerInfo.addLink(`Delete : ${player.name} (${player.id})`, `players/${player.id}`);
            const allClubs = Club.findAll();
            allClubs.map(club => playerInfo.addLink(`Add club: ${club.name} (${club.id})`, `players/${player.id}/clubs/${club.id}`));
            const allDoctors = Doctor.findAll();
            // const availableDoctors = doctors.not(allDoctors).get();
            allDoctors.map(doctor => {
                playerInfo.addLink(`Add doctor : ${doctor.name} (${doctor.id})`, `players/${player.id}/doctors/${doctor.id}`);            
                playerInfo.addLink(`Remove doctor : ${doctor.name} (${doctor.id})`, `players/${player.id}/doctors/${doctor.id}`);    
            });

            return playerInfo;
        } else {
            return 404;
        };
    },

    doctors : async(doctorId) => {
        const doctor = await Doctor.find({ where: { id: doctorId } });
        if (doctor) {
            const club = await doctor.getClub();
            const players = await doctor.getPlayers();
            let clubName = '';
            let clubId = '';
            if (club == null) {
                clubName = '';
                clubId = '';
            } else {
                clubName = club.name;
                clubId = club.id;
            };
            const doctorInfo = halson({
                'id': doctor.id,
                'name': doctor.name
            });
            doctorInfo.addLink('Self', `doctors/${doctor.id}`);
            doctorInfo.addLink(`Club : ${clubName} (${clubId})`, `clubs/${clubId}`)
            players.map(player => doctorInfo.addLink(`Related player: ${player.name} (${player.id})`, `players/${player.id}`));
            doctorInfo.addLink('Create : new doctor', `doctors`);
            doctorInfo.addLink(`Update : ${doctor.name} (${doctor.id})`, `doctors/${doctor.id}`);
            doctorInfo.addLink(`Delete : ${doctor.name} (${doctor.id})`, `doctors/${doctor.id}`);
            const allClubs = Club.findAll();
            allClubs.map(club => { doctorInfo.addLink(`Add club: ${club.name} (${club.id})`, `doctors/${doctor.id}/clubs/${club.id}`) });
            const allPlayers = Player.findAll();
            // const availablePlayers = players.not(allPlayers).get();
            allPlayers.map(player => {
                doctorInfo.addLink(`Add player : ${player.name} (${player.id})`, `doctors/${doctor.id}/players/${player.id}`);            
                doctorInfo.addLink(`Remove player : ${player.name} (${player.id})`, `doctors/${doctor.id}/players/${player.id}`);    
            });
            
            return doctorInfo;
        } else {
            return 404;
        };
    }
}
