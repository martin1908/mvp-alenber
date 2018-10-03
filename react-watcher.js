const fs = require('fs');
const { spawn } = require('child_process');

fs.watch('./components', (ev, file) => {
  console.log(ev, file)
  if(ev == 'change') {
    const runBuildReact = spawn('npm', ['run', 'build-react']);
    runBuildReact.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    
    runBuildReact.on('error', (err) => {
      runBuildReact.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });
    })

    runBuildReact.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }
})