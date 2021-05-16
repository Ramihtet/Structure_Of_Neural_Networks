const path = require('path')
const {spawn} = require('child_process')
/**
   * Run python myscript, pass in `-u` to not buffer console output
   * @return {ChildProcess}
*/
function runScript(){
   return spawn('python', [
      "-u",
      path.join(__dirname, 'paint.py'),
     "--foo", "some value for foo",
   ]);
}
const subprocess = runScript()
