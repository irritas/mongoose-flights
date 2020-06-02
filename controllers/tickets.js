const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create
}

function newTicket(req, res) {
    res.render('tickets/new', { id: req.params.id });
}

function create(req, res) {
    Flight.findById(req.params.id, (err, flight) => {
        req.body.flight = flight;
        const ticket = new Ticket(req.body);
        console.log(ticket);
        ticket.save(err => {
            if (err) return res.redirect(`/flights/${flight._id}/tickets/new`);
            res.redirect(`/flights/${req.params.id}`);
        });
    });
}