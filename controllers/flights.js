const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
    create
}

function index(req, res) {
    Flight.find({}, (err, flights) => {
        res.render('flights', { flights });
    });
}

function newFlight(req, res) {
    res.render('flights/new');
}

function create(req, res) {
    if (!req.body.departs) req.body.departs = undefined;
    const flight = new Flight(req.body);
    flight.save(err => {
        if (err) {
            Flight.collection.drop();
            return res.render('flights/new');
        }
        console.log(flight);
        res.redirect('/flights');
    });
}