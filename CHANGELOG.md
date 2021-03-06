Changelog
=========

0.6.2
-----

* Fix broken passive/active mode transfers [`0800a8f95d`](https://github.com/brandonwamboldt/nodeftpd/commit/0800a8f95d3adb362c06c333fceb6b350b5352b0)

0.6.1
-----

* Fix an error when installed globally [`49816ef682`](https://github.com/brandonwamboldt/nodeftpd/commit/49816ef6823c9a4ca282f0935228fb2e98d614e1)

0.6.0
-----

* Reimplemented process management without Forever
* Improved error handling and logging facilities
* Implementing umask
* JSHint fixes
* Properly clean up processes, sockets and servers
* Code cleanup
* Implemented `ABOR`
* FIX - `MLSx` functions return the UID, GID, username and group name now
* FIX - Fix UNIX.mode for `MLSx` functions
* FIX - Fix perm fact for `MLSx` functions

0.5.0
-----

* Config files are now YAML
* Implement `MFMT`
* FIX - Show the correct port when listening for TLS
* FIX - Don't start logging messages until we have the IP (TLS)

0.4.3
-----

* FTP over implicit TLS support added
* `PROT` implemented
* `PBSZ` implemented

0.4.2
-----

* Use the [EPLF](http://cr.yp.to/ftp/list/eplf.html) format for the `LIST` command
* Better error handling for the `LIST` command
* Implement `APPE`
* Implement `STOU`
* FIX - Add `size` fact to `MLSx` commands

0.4.1
-----

* Implement `MLSD`

0.4.0
-----

* General refactoring
* Implement `STRU`
* Implement `XCUP`
* Implement `XCWD`
* Implement `XPWD`
* Implement `XMKD`
* Basic PASV connection highjacking prevention by checking the client IP

0.3.4
-----

* Implement `REST`
* Reimplement `RETR` using Readable Streams and proper encoding handling
* Refactored the `TYPE` command

0.3.3
-----

* Implemented active mode transfers.

0.3.2
-----

* FIX - Fix the root user check

0.3.1
-----

* ENHANCEMENT - Make sure we are being run as root
* FIX - Defer log directory creation to the main process to avoid errors during installation. Fixes issue #3.

0.3.0
-----

* Reworked passive mode transfers to request a port number from the supervisor process in order to properly maintain state (which ports are in use). This fixes a bug with multiple concurrent downloads.
* Passive ports are generated randomly instead of sequentially to fix possible exploits.

0.2.4
-----

* ENHANCEMENT - Added a `-D`/`--no-daemon` option to make dev/debugging easier
* FIX - Fix command line arguments

0.2.3
-----

* ENHANCEMENT - Nicer logging for commands & responses
* FIX - Fix a bug in the logger only replacing the first set of color tags

0.2.2
-----

* FIX - Run `start` if `nodeftpd` is called with no arguments
* FIX - Don't restart supervisor.js if it crashes, it should only crash for a good reason
* FIX - Don't crash on `nodeftpd status` if no forever processes are found

0.2.1
-----

* Fix install error caused by making the log directory

0.2.0
-----

* Run as a daemon using Forever now
* Log to files
* UID/GID support - The process now uses `setuid()`/`setgid()`
* Refuse to install on `win32`
* Use writable streams for `STOR`
* `STAT` is implemented
* `MLST` is implemented (But not `MLSD`)
* `MODE` is implemented (fake implementation)
* FIX - Show file errors before the upload starts for `STOR`
* FIX - Catch errors in data channels to avoid cluttering error logs
* FIX - Better errors for `RMD`
* FIX - Don't log passwords

0.1.0
-----

* Initial stable version, most common functionality implemented
* Basic PAM authentication
* Chroot jail support
