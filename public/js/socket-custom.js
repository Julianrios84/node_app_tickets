var socket = io();

// Conectado al servidor
socket.on('connect', function(){
    console.log('Conectado al servidor');
});

// Se callo el servidor
socket.on('disconnect', function(){
    console.log('Perdimos conexion con el servidor');
});

// Enviar informacion
socket.emit('sendMessage', {
    user: 'Julian',
    message: 'Hello word'
}, function(message){
    console.log('Server:' ,message);
});

// Escuchar informacion
socket.on('sendMessage', function(message) {
    console.log(message);
});