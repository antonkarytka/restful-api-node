const orm = require('../../orm/orm.js');
const Club = orm.Club;
const Player = orm.Player;
const Doctor = orm.Doctor;

module.exports = {
    club : async(clubName) => {
        let clubFound = await Club.find({ where: { clubName: clubName } });
        if (!clubFound) {
            club = await Club.create({ clubName: clubName });
        };
    },

    player : async(query) => {
        let playerName = query[0];
        let clubName = query[query.length - 1];
        let clubFound = await Club.find({ where: { clubName: clubName } });
        if (clubFound) {
            let playerFound = await Player.find({ where: { playerName: playerName } });
            if (playerFound) {
                await playerFound.setClub(clubFound);
                await clubFound.addPlayer(playerFound);
                if (query.length > 2) {
                    for (let i = 1; i < query.length - 1; i++) {
                        let doctorFound = await Doctor.find({ where: { doctorName: query[i] }});
                        if (doctorFound) {
                            await doctorFound.setClub(clubFound);
                            await clubFound.addDoctor(doctorFound);
                            await playerFound.addDoctor(doctorFound);
                        } else {
                            let doctor = await Doctor.create({ doctorName: query[i] });
                            await doctor.setClub(clubFound);
                            await clubFound.addDoctor(doctorFound);
                            await playerFound.addDoctor(doctorFound);
                        };
                    };
                };
            } else {
                let player = await Player.create({ playerName: playerName });
                await player.setClub(clubFound);
                await clubFound.addPlayer(player);
                if (query.length > 2) {
                    for (let i = 1; i < query.length - 1; i++) {
                        let doctorFound = await Doctor.find({ where: { doctorName: query[i] }});
                        if (doctorFound) {
                            await doctorFound.setClub(clubFound);
                            await clubFound.addDoctor(doctorFound);
                            await player.addDoctor(doctorFound);
                        } else {
                            let doctor = await Doctor.create({ doctorName: query[i] });
                            await doctor.setClub(clubFound);
                            await clubFound.addDoctor(doctor);
                            await player.addDoctor(doctor);
                        };
                    };
                };
            };
        } else {
            let club = await Club.create({ clubName: clubName });
            let playerFound = await Player.find({ where: { playerName: playerName } });
            if (playerFound) {
                await playerFound.setClub(club);
                await club.addPlayer(playerFound);
                if (query.length > 2) {
                    for (let i = 1; i < query.length - 1; i++) {
                        let doctorFound = await Doctor.find({ where: { doctorName: query[i] }});
                        if (doctorFound) {
                            await doctorFound.setClub(club);
                            await club.addDoctor(doctorFound);
                            await playerFound.addDoctor(doctorFound);
                        } else {
                            let doctor = await Doctor.create({ doctorName: query[i] });
                            await doctor.setClub(club);
                            await club.addDoctor(doctorFound);
                            await playerFound.addDoctor(doctorFound);
                        };
                    };
                };
            } else {
                let player = await Player.create({ playerName: playerName });
                await player.setClub(club);
                await club.addPlayer(player);
                if (query.length > 2) {
                    for (let i = 1; i < query.length - 1; i++) {
                        let doctorFound = await Doctor.find({ where: { doctorName: query[i] }});
                        if (doctorFound) {
                            await doctorFound.setClub(club);
                            await club.addDoctor(doctorFound);
                            await player.addDoctor(doctorFound);
                        } else {
                            let doctor = await Doctor.create({ doctorName: query[i] });
                            await doctor.setClub(club);
                            await club.addDoctor(doctor);
                            await player.addDoctor(doctor);
                        };
                    };
                };
            };
        };
    },

    doctor : async(query, cb) => {
        let doctorName = query[0];
        let clubName = query[query.length - 1];
        let clubFound = await Club.find({ where: { clubName: clubName } });
        if (clubFound) {
            let doctorFound = await Doctor.find({ where: { doctorName: doctorName } });
            if (doctorFound) {
                await doctorFound.setClub(clubFound);
                await clubFound.addDoctor(doctorFound);
                if (query.length > 2) {
                    for (let i = 1; i < query.length - 1; i++) {
                        let playerFound = await Player.find({ where: { playerName: query[i] }});
                        if (playerFound) {
                            await playerFound.setClub(clubFound);
                            await clubFound.addPlayer(playerFound);
                            await doctorFound.addPlayer(playerFound);
                        } else {
                            let player = await Player.create({ playerName: query[i] });
                            await player.setClub(clubFound);
                            await clubFound.addPlayer(player);
                            await doctorFound.addPlayer(player);
                        };
                    };
                };
            } else {
                let doctor = await Doctor.create({ doctorName: doctorName });
                await doctor.setClub(clubFound);
                await clubFound.addDoctor(doctor);
                if (query.length > 2) {
                    for (let i = 1; i < query.length - 1; i++) {
                        let playerFound = await Player.find({ where: { playerName: query[i] }});
                        if (playerFound) {
                            await playerFound.setClub(clubFound);
                            await clubFound.addPlayer(playerFound);
                            await doctor.addPlayer(playerFound);
                        } else {
                            let player = await Player.create({ playerName: query[i] });
                            await player.setClub(clubFound);
                            await clubFound.addPlayer(player);
                            await doctor.addPlayer(player);
                        };
                    };
                };
            };
        } else {
            let club = await Club.create({ clubName: clubName });
            let doctorFound = await Doctor.find({ where: { doctorName: doctorName } });
            if (doctorFound) {
                await doctorFound.setClub(club);
                await club.addDoctor(doctorFound);
                if (query.length > 2) {
                    for (let i = 1; i < query.length - 1; i++) {
                        let playerFound = await Player.find({ where: { playerName: query[i] }});
                        if (playerFound) {
                            await playerFound.setClub(club);
                            await club.addPlayer(playerFound);
                            await doctorFound.addPlayer(playerFound);
                        } else {
                            let player = await Player.create({ playerName: query[i] });
                            await player.setClub(club);
                            await club.addPlayer(player);
                            await doctorFound.addPlayer(player);
                        };
                    };
                };
            } else {
                let doctor = await Doctor.create({ doctorName: doctorName });
                await doctor.setClub(club);
                await club.addDoctors(doctor);
                if (query.length > 2) {
                    for (let i = 1; i < query.length - 1; i++) {
                        let playerFound = await Player.find({ where: { playerName: query[i] }});
                        if (playerFound) {
                            await playerFound.setClub(club);
                            await club.addPlayer(playerFound);
                            await doctor.addPlayer(playerFound);
                        } else {
                            let player = await Player.create({ playerName: query[i] });
                            await player.setClub(club);
                            await club.addPlayer(player);
                            await doctor.addPlayer(player);
                        };
                    };
                };
            };
        };
    }
}
