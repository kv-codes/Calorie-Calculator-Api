const host = "isilo.db.elephantsql.com",
    user = "qptdbpem",
    database = "qptdbpem",
    password = "IeFwT2PD0Y_pYBp25T3iZVwyeILmBXvu";
const pgp = require('pg-promise')({
    query: function (e) {
        console.log('QUERY: ', e.query)
    }
});
const options = {
    host: host,
    database: database,
    user: user,
    password: password
}
const db = pgp(options)
module.exports = db;