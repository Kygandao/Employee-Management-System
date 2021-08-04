const { startApp } = require('./utils/startApp');

//to envoke function in other file, 
async function init () {
    await startApp();
}

init();