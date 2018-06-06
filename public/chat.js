// Make Connection
var socket = io.connect('http://192.168.0.27:4000')

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('submit'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

// Listen for events
socket.on('chat', function(data){
    console.log(data);
    output.innerHTML += `<p><strong>${data.handle}</strong>: ${data.message}</p>`;
    feedback.innerHTML = '';
});

socket.on('typing', function(data){
    feedback.innerHTML = `<em>${data} is typing...</em>`;
    setTimeout(function(){
        feedback.innerHTML = '';
    }, 1000);
});