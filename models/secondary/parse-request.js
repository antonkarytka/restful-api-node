const create = require('../crud/create');
const read = require('../crud/read');
const update = require('../crud/update');
const del = require('../crud/delete');

module.exports = {
    create : requestBody => {
        try {
            let query = [];
            switch (Object.keys(requestBody)[0]) {
                case 'club':
                    create.club(requestBody.club);
                    break;
                case 'player':
                    query.push(requestBody.player);
                    for (let i = 0; i < Object.keys(requestBody).length - 2; i++)
                        query.push(requestBody.doctor);
                    query.push(requestBody.club);
                    create.player(query);
                    break;
                case 'doctor':
                    query.push(requestBody.doctor);
                    for (let i = 1; i < Object.keys(requestBody).length - 1; i++)
                        query.push(requestBody.player);
                    query.push(requestBody.club);
                    create.doctor(query);
                    break;
                default:
                    throw new Error('Unavailable entity requested.');
                    break;
            };
            return 200;
        } catch (e) {
            return 404;
        };
    },

    update : requestBody => {
        try {
            let query = [];
            switch (requestBody.field) {
                case 'club':
                    if (Object.keys(requestBody)[1] == 'player') {
                        query.push(requestBody.player);
                        query.push(requestBody.newClub);
                        update.playersClubField(query);
                    } else if (Object.keys(requestBody)[1] == 'doctor') {
                        query.push(requestBody.player);
                        query.push(requestBody.newClub);
                        update.doctorsClubField(query);
                    }
                    break;
                case 'player':
                    query.push(requestBody.doctor);
                    if (requestBody.action == 'add') {
                        query.push(requestBody.player);
                        update.addPlayerToDoctor(query);
                    } else if (requestBody.action == 'delete') {
                        query.push(requestBody.player);
                        update.deletePlayerFromDoctor(query);
                    }
                    break;
                case 'doctor':
                    query.push(requestBody.player);
                    if (requestBody.action == 'add') {
                        query.push(requestBody.doctor);
                        update.addDoctorToPlayer(query);
                    } else if (requestBody.action == 'delete') {
                        query.push(requestBody.doctor);
                        update.deleteDoctorFromPlayer(query);
                    }
                    break;
                default:
                    throw new Error('Unavailable entity requested.');
                    break;
            };
            return 200;
        } catch (e) {
            return 404;
        };
    },

    delete : requestBody => {
        try {
            switch (Object.keys(requestBody)[0]) {
                case 'club':
                    del.club(requestBody.club);
                    break;
                case 'player':
                    del.player(requestBody.player);
                    break;
                case 'doctor':
                    del.doctor(requestBody.doctor);
                    break;
                default:
                    throw new Error('Unavailable entity requested.');
                    break;
            };
            return 200;
        } catch (e) {
            return 404;
        };
    }
}
