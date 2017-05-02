const create = require('../crud/create');
const update = require('../crud/update');
const del = require('../crud/delete');

module.exports = {
    create : async(requestBody) => {
        let query = [];
        switch (Object.keys(requestBody)[0]) {
            case 'club': {
                await create.club(requestBody.club);
                break;
            }
            case 'player': {
                query.push(requestBody.player);
                for (let i = 0; i < Object.keys(requestBody).length - 2; i++)
                    query.push(requestBody.doctor);
                query.push(requestBody.club);
                await create.player(query);
                break;
            }
            case 'doctor': {
                query.push(requestBody.doctor);
                for (let i = 1; i < Object.keys(requestBody).length - 1; i++)
                    query.push(requestBody.player);
                query.push(requestBody.club);
                await create.doctor(query);
                break;
            }
            default:
                return 404;
        };
        return 200;
    },

    update : async(requestBody) => {
        let query = [];
        switch (requestBody.field) {
            case 'club': {
                if (Object.keys(requestBody)[1] == 'player') {
                    query.push(requestBody.player);
                    query.push(requestBody.newClub);
                    let responseCode = await update.playersClubField(query);
                    if (responseCode == 200) {
                        return 200;
                    } else {
                        return 404;
                    };
                } else if (Object.keys(requestBody)[1] == 'doctor') {
                    query.push(requestBody.player);
                    query.push(requestBody.newClub);
                    let responseCode = await update.doctorsClubField(query);
                    if (responseCode == 200) {
                        return 200;
                    } else {
                        return 404;
                    };
                };
            }
            case 'player': {
                query.push(requestBody.doctor);
                if (requestBody.action == 'add') {
                    query.push(requestBody.player);
                    let responseCode = await update.addPlayerToDoctor(query);
                    if (responseCode == 200) {
                        return 200;
                    } else {
                        return 404;
                    };
                } else if (requestBody.action == 'delete') {
                    query.push(requestBody.player);
                    let responseCode = await update.deletePlayerFromDoctor(query);
                    if (responseCode == 200) {
                        return 200;
                    } else {
                        return 404;
                    };
                };
            }
            case 'doctor': {
                query.push(requestBody.player);
                if (requestBody.action == 'add') {
                    query.push(requestBody.doctor);
                    let responseCode = await update.addDoctorToPlayer(query);
                    if (responseCode == 200) {
                        return 200;
                    } else {
                        return 404;
                    };
                } else if (requestBody.action == 'delete') {
                    query.push(requestBody.doctor);
                    let responseCode = await update.deleteDoctorFromPlayer(query);
                    if (responseCode == 200) {
                        return 200;
                    } else {
                        return 404;
                    };
                };
            }
            default:
                return 404;
        };
    },

    delete : async(requestBody) => {
        switch (Object.keys(requestBody)[0]) {
            case 'club': {
                let responseCode = await del.club(requestBody.club);
                if (responseCode == 200) {
                    return 200;
                } else {
                    return 404;
                };
            }
            case 'player': {
                let responseCode = await del.player(requestBody.player);
                if (responseCode == 200) {
                    return 200;
                } else {
                    return 404;
                };
            }
            case 'doctor': {
                let responseCode = await del.doctor(requestBody.doctor);
                if (responseCode == 200) {
                    return 200;
                } else {
                    return 404;
                };
            }
            default:
                return 409;
        };
    }
}
