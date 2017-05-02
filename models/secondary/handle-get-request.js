const read = require('../crud/read');
const show = require('./show');

module.exports = {
    get : async(req) => {
        let urlParts = req.url.split('/');
        urlParts.shift();
        if (urlParts.length == 1) {
           switch (urlParts[0]) {
               case 'clubs':
                   return await show.clubs();
               case 'players':
                   return await show.players();
               case 'doctors':
                   return await show.doctors();
               default:
                   return 404;
           };
       } else if (urlParts.length == 2) {
           let id = urlParts[1];
           switch (urlParts[0]) {
               case 'clubs':
                   return await read.club(id);
               case 'players':
                   return await read.player(id);
               case 'doctors':
                   return await read.doctor(id);
               default:
                   return 404;
           };
       }
    }
}
