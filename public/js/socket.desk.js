// establish socket connection
var socket = io();

var samll = $('small');

// Connected to server
socket.on('connect', function(){
    console.log('Connected to server');
});
// Server Disconnection
socket.on('disconnect', function(){
    console.log('The connection to the server was lost');
});

var searchParams = new URLSearchParams(window.location.search);
if(!searchParams.has('desk')) {
    window.location = 'index.html';
    throw new Error('The desk is necessary')
}

var desk = searchParams.get('desk');
console.log(desk);
$('h1').text('Desk: ' + desk);

$('button').on('click', function() {
    console.log('click');
    socket.emit('attendTicket', {desk: desk}, function(res) {
        console.log(res);

        if(res === 'No more tickets waiting'){
            alert(res);
            samll.text(res);
            return;
        }

        samll.text('Ticket ' + res.number);
    });
});