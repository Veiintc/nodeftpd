var command = require('../lib/command');
var fs      = require('../lib/fs');

command.add('RMD', 'RMD <sp> pathname', function (rmdir, output, session) {
  if (rmdir.trim() === '') {
    output.write(501, 'Invalid number of arguments');
  } else {
    if (!rmdir.match(/^\//)) {
      if (session.cwd === '/') {
          rmdir = session.cwd + rmdir;
      } else {
          rmdir = session.cwd + '/' + rmdir;
      }
    }

    // Don't allow them to delete the root directory
    if (rmdir === '/') {
      output.write(550, 'Permission denied: You cannot delete the root directory');
      return false;
    }

    fs.rmdir(rmdir, function (err) {
      if (err) {
        if (err.code === 'ENOENT') {
          output.write(550, '%s: File or directory does not exist', rmdir);
        } else if (err.code === 'ENOTEMPTY') {
          output.write(550, '%s: Directory not empty, cannot remove', rmdir);
        } else if (err.code === 'EACCES') {
          output.write(550, '%s: Permission denied', rmdir);
        } else {
          console.log(err);
          output.write(550, '%s: Unknown error', rmdir);
        }
      } else {
        output.write(250, 'RMD command successful');
      }
    });
  }
});
