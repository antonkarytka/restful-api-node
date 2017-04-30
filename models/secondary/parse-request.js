const create = require('../crud/create');
const read = require('../crud/read');
const update = require('../crud/update');
const del = require('../crud/delete');

module.exports = {
    create : async(requestBody) => {
        try {
            let query = [];
            switch (Object.keys(requestBody)[0]) {
                case 'club':
                    await create.club(requestBody.club);
                    break;
                case 'player':
                    query.push(requestBody.player);
                    for (let i = 0; i < Object.keys(requestBody).length - 2; i++)
                        query.push(requestBody.doctor);
                    query.push(requestBody.club);
                    await create.player(query);
                    break;
                case 'doctor':
                    query.push(requestBody.doctor);
                    for (let i = 1; i < Object.keys(requestBody).length - 1; i++)
                        query.push(requestBody.player);
                    query.push(requestBody.club);
                    await create.doctor(query);
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

    update : async(requestBody) => {
        try {
            let query = [];
            switch (requestBody.field) {
                case 'club':
                    if (Object.keys(requestBody)[1] == 'player') {
                        query.push(requestBody.player);
                        query.push(requestBody.newClub);
                        await update.playersClubField(query);
                    } else if (Object.keys(requestBody)[1] == 'doctor') {
                        query.push(requestBody.player);
                        query.push(requestBody.newClub);
                        await update.doctorsClubField(query);
                    }
                    break;
                case 'player':
                    query.push(requestBody.doctor);
                    if (requestBody.action == 'add') {
                        query.push(requestBody.player);
                        await update.addPlayerToDoctor(query);
                    } else if (requestBody.action == 'delete') {
                        query.push(requestBody.player);
                        await update.deletePlayerFromDoctor(query);
                    }
                    break;
                case 'doctor':
                    query.push(requestBody.player);
                    if (requestBody.action == 'add') {
                        query.push(requestBody.doctor);
                        await update.addDoctorToPlayer(query);
                    } else if (requestBody.action == 'delete') {
                        query.push(requestBody.doctor);
                        await update.deleteDoctorFromPlayer(query);
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

    delete : async(requestBody) => {
        try {
            switch (Object.keys(requestBody)[0]) {
                case 'club':
                    await del.club(requestBody.club);
                    break;
                case 'player':
                    await del.player(requestBody.player);
                    break;
                case 'doctor':
                    await del.doctor(requestBody.doctor);
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
