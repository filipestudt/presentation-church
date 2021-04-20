const { app, BrowserWindow } = require('electron');

require('./src/cfg');
require('./src/app');

var mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.setMenuBarVisibility(false);

    mainWindow.loadFile('res/pages/index/index.html');

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})