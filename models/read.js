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
                'name': club.name,
                'players': players.map(player => { return `${player.name} : /players/${player.id}` }),
                'doctors': doctors.map(doctor => { return `${doctor.name} : /doctors/${doctor.id}` })
            });
            clubInfo.addLink('self', `/clubs/${club.id}`);
            clubInfo.addLink('create new club', `/clubs`);
            clubInfo.addLink('update club', `/clubs/${club.id}`);
            clubInfo.addLink('delete club', `/clubs/${club.id}`);
            const allPlayers = await Player.findAll();
            allPlayers.map(player => {
                clubInfo.addLink(`add player ${player.name}`, `/clubs/${club.id}/players/${player.id}`);            
                clubInfo.addLink(`remove player ${player.name}`, `/clubs/${club.id}/players/${player.id}`);            
            });
            const allDoctors = await Doctor.findAll();
            allDoctors.map(doctor => {
                clubInfo.addLink(`add doctor ${doctor.name}`, `/clubs/${club.id}/doctors/${doctor.id}`);            
                clubInfo.addLink(`remove doctor ${doctor.name}`, `/clubs/${club.id}/doctors/${doctor.id}`);            
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
                'name': player.name,
                'club': `${clubName} : /clubs/${clubId}`,
                'doctors': doctors.map(doctor => { return `${doctor.name} : /doctors/${doctor.id}` })
            });
            playerInfo.addLink('self', `/players/${player.id}`);
            playerInfo.addLink('create new player', `/players`);
            playerInfo.addLink('update player', `/players/${player.id}`);
            playerInfo.addLink('delete player', `/players/${player.id}`);
            const allClubs = Club.findAll();
            allClubs.map(club => { playerInfo.addLink(`add club ${club.name}`, `/players/${player.id}/clubs/${club.id}`) });
            const allDoctors = Doctor.findAll();
            // const availableDoctors = doctors.not(allDoctors).get();
            allDoctors.map(doctor => {
                playerInfo.addLink(`add doctor ${doctor.name}`, `/players/${player.id}/doctors/${doctor.id}`);            
                playerInfo.addLink(`remove doctor ${doctor.name}`, `/players/${player.id}/doctors/${doctor.id}`);    
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
                'name': doctor.name,
                'club': `${clubName} : /clubs/${clubId}`,
                'players': players.map(player => { return `${player.name} : /players/${player.id}` }),
            });
            doctorInfo.addLink('self', `/doctors/${doctor.id}`);
            doctorInfo.addLink('create new doctor', `/doctors`);
            doctorInfo.addLink('update doctor', `/doctors/${doctor.id}`);
            doctorInfo.addLink('delete doctor', `/doctors/${doctor.id}`);
            const allClubs = Club.findAll();
            allClubs.map(club => { doctorInfo.addLink(`add club ${club.name}`, `/doctors/${doctor.id}/clubs/${club.id}`) });
            const allPlayers = Player.findAll();
            // const availablePlayers = players.not(allPlayers).get();
            allPlayers.map(player => {
                doctorInfo.addLink(`add player ${player.name}`, `/doctors/${doctor.id}/players/${player.id}`);            
                doctorInfo.addLink(`remove player ${player.name}`, `/doctors/${doctor.id}/players/${player.id}`);    
            });
            
            return doctorInfo;
        } else {
            return 404;
        };
    }
}
