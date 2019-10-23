// establish socket connection
var socket = io();

var label = $('#lblNuevoTicket');
// Connected to server
socket.on('connect', function(){
    console.log('Connected to server');
});
// Server Disconnection
socket.on('disconnect', function(){
    console.log('The connection to the server was lost');
});

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);
    });
});

// Get the current ticket status
socket.on('actualState', (data) => {
    label.text(data.currentTicket);
});

