const conn = require('../handlers/database.handler');
const ApiError = require('../error.model')

module.exports = {
    getTpv(req, res, next) {
        conn.query('SELECT * FROM tpv', 
        function(error, results, fields) {
            if (error) next(new ApiError("Something went wrong while trying to get the third party vendors", 500))
            else if (results.length == 0) next(new ApiError("No third party vendor could be found", 404))
            else res.status(200).json(results).end();
        })
    },

    getOneTpv(req, res, next) {
        conn.query('SELECT * FROM tpv WHERE _id = ? LIMIT 1;', 
        [req.params.id], function(error, results, fields) {
            if (error) next(new ApiError("Something went wrong while trying to get the third party vendor", 500))
            else if (results.length == 0) next(new ApiError("Third party vendor with the given ID could not be found", 404))
            else res.status(200).json(results[0]).end();
        })
    }
}