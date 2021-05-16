"use strict";

var path = require('path');

var _require = require('child_process'),
    spawn = _require.spawn;
/**
   * Run python myscript, pass in `-u` to not buffer console output
   * @return {ChildProcess}
*/


function runScript() {
  return spawn('python', ["-u", path.join(__dirname, 'paint.py'), "--foo", "some value for foo"]);
}

var subprocess = runScript();