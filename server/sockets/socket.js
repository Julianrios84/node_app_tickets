const {io} = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    
    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.nextTicket();
        callback(next);
        console.log(next);
    });

    // Issue event of the current state of the last ticket
    client.emit('actualState',{
        currentTicket: ticketControl.getLastTicket(),
        lastFourTickets: ticketControl.getLastFourTickets()
    });

    client.on('attendTicket', (data, callback) => {
        if(!data.desk) {
            return callback({
                err: true,
                message: 'The desk is necessary'
            });
        }

        let attendTicket = ticketControl.attendTicket(data.desk);

        client.broadcast.emit('actualState',{
            currentTicket: ticketControl.getLastTicket(),
            lastFourTickets: ticketControl.getLastFourTickets()
        });

        callback(attendTicket);

    });

});