// establish socket connection
var socket = io();

var lblTicketOne = $('#lblTicket1');
var lblTicketTwo = $('#lblTicket2');
var lblTicketThree = $('#lblTicket3');
var lblTicketFour = $('#lblTicket4');

var lblDeskOne = $('#lblDesk1');
var lblDeskTwo = $('#lblDesk2');
var lblDeskThree = $('#lblDesk3');
var lblDeskFour = $('#lblDesk4');

var lblTickets = [lblTicketOne, lblTicketTwo, lblTicketThree, lblTicketFour];
var lblDesks =[lblDeskOne, lblDeskTwo, lblDeskThree, lblDeskFour];


// Connected to server
socket.on('connect', function(){
    console.log('Connected to server');
});
// Server Disconnection
socket.on('disconnect', function(){
    console.log('The connection to the server was lost');
});

socket.on('actualState', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    refreshPage(data.lastFourTickets);
    console.log(data);
});

function refreshPage(lastFourTickets) {
    for(var i=0; i <= lastFourTickets.length -1; i++) {
        lblTickets[i].text('Ticket ' + lastFourTickets[i].number);
        lblDesks[i].text('Desk ' + lastFourTickets[i].desk);
    }
}
