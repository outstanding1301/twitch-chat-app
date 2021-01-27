const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

const scopes = [
    'bits:read',
    // 'channel:edit:commercial',
    // 'channel:manage:broadcast',
    // 'channel:manage:redemptions',
    // 'channel:read:editors',
    // 'channel:read:hype_train',
    // 'channel:read:redemptions',
    // 'channel:read:stream_key',
    // 'channel:read:subscriptions',
    // 'clips:edit',
    'moderation:read',
    'user:edit',
    'user:edit:follows',
    'user:read:blocked_users',
    'user:manage:blocked_users',
    'user:read:broadcast',
    'user:read:email',
    'channel:moderate',
    'chat:edit',
    'chat:read',
    'whispers:read',
    'whispers:edit',
]
const client_key = "8bb37iku98tks3rc0nq9cqt7bc3t7c";
const oauth_url = `https://id.twitch.tv/oauth2/authorize?client_id=${client_key}&redirect_uri=http://localhost/token&response_type=token&scope=${scopes.join('%20')}`;

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        autoHideMenuBar: true,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: true,
            preload: path.resolve(__dirname, "./preload.js")
        }
    });

    const startUrl = process.env.ELECTRON_START_URL
    || url.format({
        pathname: path.join(__dirname, "/../build/index.html"),
        protocol: 'file:',
        slashes: true
    })

    win.loadURL(startUrl);
}

app.on('ready', createWindow);

ipcMain.on('request-auth', event => {
    const authWindow = new BrowserWindow({
        width: 640,
        height: 800,
        alwaysOnTop: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false
        }
    });

    authWindow.loadURL(oauth_url);
    authWindow.show();

    authWindow.webContents.on('will-navigate', (e, nurl) => {
        if (!nurl.includes('#access_token')) {
            console.log("인증 취소함");
            authWindow.close();
            return;
        }
    })

    authWindow.webContents.on('will-redirect', (e, nurl) => {
        if (!nurl.includes('#access_token')) {
            console.log("인증 취소함");
            authWindow.close();
            return;
        }
        const token = nurl.split("#access_token=")[1].split("&")[0];
        console.log(token);
        event.sender.send('oauth-token', token);
        authWindow.close();
    })
});