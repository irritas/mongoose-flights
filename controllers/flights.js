const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show
}

function index(req, res) {
    Flight.find({}, (err, flights) => {
        res.render('flights/index', { flights });
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
            // Flight.deleteMany({});
            return res.redirect('/flights/new');
        }
        res.redirect('/flights');
    });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            res.render('flights/show', { flight, tickets });
        });
    });
}