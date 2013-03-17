// Module Dependencies
var sessionManager = require('./session-manager')
  , commandChannel = require('./command-channel')
  , config         = require('./config')
  , logger         = require('./logger')
  , net            = require('net')
  , fs             = require('fs')
  , eventQueue     = []

// Set the logging level
logger.setLogLevel(config.get('logLevel'))

// New child process awaiting connections
logger.log('info', '<cyan>[Process Manager]</cyan> Child process with PID %d listening', process.pid)

// Load command modules right away so their ready when a new connection is
// established
fs.readdir(__dirname + '/../commands', function (err, files) {
    for (var i = 0; i < files.length; i++) {
        require(__dirname + '/../commands/' + files[i])
    }
})

// Allow code to hook into the socket.on event before a socket exists using a
// queue based proxy
exports.on = function () {
    eventQueue.push(arguments)

    if (exports.socket) {
        exports.socket.on.apply(exports.socket, Array.prototype.slice.call(arguments))
    }
}

// Listen for the parent process to send the socket when a new connection is
// created
process.on('message', function (m, socket) {
    var session        = sessionManager.startSession()
      , command        = commandChannel.createChannel(socket)
      , remoteAddr     = socket.remoteAddress
      , remotePort     = socket.remotePort

    // If the message sent by the parent wasn't a socket, ignore it
    if (m !== 'socket') {
        return
    }

    // Expose the socket
    exports.socket = socket

    // Proxy any event listeners onto the socket
    for (i in eventQueue) {
        socket.on.apply(socket, Array.prototype.slice.call(eventQueue[i]))
    }

    logger.log('info', '[%s:%d] Client Connected, Hello', remoteAddr, remotePort)

    // Send a hello message
    command.write(220, config.get('motd'))

    // Expose socket events to make for nicer code
    socket.on('data', function (data) {
        logger.log('info', '[%s:%d] Command received: %s', remoteAddr, remotePort, data.toString().trim())

        // Emit a low level event
        socket.emit('client:data', data, socket, command, session)

        // Emit a higher level event
        socket.emit('ftp:commandReceived', data.toString(), command, session)
    })

    socket.on('end', function () {
        logger.log('info', '[%s:%d] Client Disconnected', remoteAddr, remotePort)
        socket.emit('client:end')
    })

    socket.on('close', function () {
        logger.log('info', '[%s:%d] Connection Closed, Goodbye', remoteAddr, remotePort)
        socket.emit('client:close')

        // Exit the child process once the socket has been closed
        process.exit()
    })
})

process.on('exit', function () {
    logger.log('info', '<cyan>[Process Manager]</cyan> Exiting child process with PID %d', process.pid)
})