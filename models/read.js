const orm = require('../orm/orm.js');
const Club = orm.Club;
const Player = orm.Player;
const Doctor = orm.Doctor;

module.exports = {
    club : async(clubId) => {
        let club = await Club.find({ where: { id: clubId } });
        if (club) {
            let players = await club.getPlayers();
            let doctors = await club.getDoctors();
            let clubInfo = {
                'id': club.id,
                'name': club.name,
                'players': {
                    'player': players.map(player => { return `${player.name} (${player.id})` })
                },
                'doctors': {
                    'doctor': doctors.map(doctor => { return `${doctor.name} (${doctor.id})` })
                }
            };
            return clubInfo;
        } else {
            return 404;
        };
    },

    player : async(playerId) => {
        let player = await Player.find({ where: { id: playerId } });
        if (player) {
            let club = await player.getClub();
            let doctors = await player.getDoctors();
            let clubName = '';
            let clubId = '';
            if (club == null) {
                console.log('heyehey');
                clubName = '';
                clubId = '';
            } else {
                clubName = club.name;
                clubId = club.id;
            }
            let playerInfo = {
                'id': player.id,
                'name': player.name,
                'club': `${clubName} (${clubId})`,
                'doctors': {
                    'doctor': doctors.map(doctor => { return `${doctor.name} (${doctor.id})` })
                }
            };
            return playerInfo;
        } else {
            return 404;
        };
    },

    doctor : async(doctorId) => {
        let doctor = await Doctor.find({ where: { id: doctorId } });
        if (doctor) {
            let club = await doctor.getClub();
            let players = await doctor.getPlayers();
            let doctorInfo = {
                'id': doctor.id,
                'name': doctor.name,
                'club': `${club.name} (${club.id})`,
                'players': {
                    'player': players.map(player => { return `${player.name} (${player.id})` })
                }
            };
            return doctorInfo;
        } else {
            return 404;
        };
    },

    allObjects : async(entityNamePlural) => {
        let entityNameSingular = entityNamePlural.slice(0, -1);
        modelName = entityNameSingular.charAt(0).toUpperCase() + entityNameSingular.slice(1);
        let objects = await orm[modelName].findAll();
        let objectsList = {
            [`${entityNameSingular}`]: objects.map(object => { return `${object.name} (${object.id})` })
        };
        return objectsList;
    }
}
