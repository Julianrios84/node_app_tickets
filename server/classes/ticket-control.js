const fs = require('fs');

class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}

class TicketControl {

    constructor() {
        this.latest = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFourTickets = [];

        let data = require('../data/data.json');
        if(data.today === this.today){
            this.latest = data.latest;
            this.tickets = data.tickets;
            this.lastFourTickets = data.lastFourTickets;
        }else{
            this.resetCount();
        }
    }

    saveFile(){
        let jsonData = {
            latest: this.latest,
            today: this.today,
            tickets: this.tickets,
            lastFourTickets: this.lastFourTickets
        };
        let  jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

    resetCount() {
        this.latest = 0;
        this.tickets = [];
        this.lastFourTickets = [];
        console.log('The system has started');
        this.saveFile();
    }

    nextTicket() {
        this.latest += 1;
        let ticket = new Ticket(this.latest, null);
        this.tickets.push(ticket);

        this.saveFile();
        return `Ticket ${this.latest}`;
    }
    
    getLastTicket() {
        return `Ticket ${this.latest}`;
    }

    getLastFourTickets() {
        return this.lastFourTickets;
    }

    attendTicket(desk) {
        if(this.tickets.length === 0) {
            return 'No more tickets waiting';
        }

        let numberTicket = this.tickets[0].number;
        this.tickets.shift();

        let attendTicket = new Ticket(numberTicket, desk);
        this.lastFourTickets.unshift(attendTicket);

        if(this.lastFourTickets.length > 4) {
            // Delete the last ticket
            this.lastFourTickets.splice(-1,1);
        }

        console.log('lastFourTickets');
        console.log(this.lastFourTickets);

        this.saveFile();
        return attendTicket;

    }

    


}

module.exports = {TicketControl}