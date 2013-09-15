var command = require('../lib/command');
var os      = require('os');

command.add('SYST', function (parameters, output, session) {
  output.write(215, os.type() + ' Type: ' + session.type);
});
