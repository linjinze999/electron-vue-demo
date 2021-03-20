'use strict'

const electron = require('electron');
const { app, BrowserWindow, screen, nativeTheme, session } = electron;

const isDev = process.env.NODE_ENV === 'development'
isDev && require('electron-debug')();

let mainWindow;
const winURL = isDev
  ? `http://${process.env.HOST}:${process.env.PORT}`
  : `file://${__dirname}/index.html`;

function createWindow () {
  if (mainWindow) {
    return;
  }
  nativeTheme.themeSource = 'dark';
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.bounds;
  const windowWidth = Math.min(1100, width);
  const windowHeight = Math.min(750, height);
  mainWindow = new BrowserWindow({
    title: '全民K歌视频模板发布器',
    width: windowWidth,
    height: windowHeight,
    webPreferences: {
      devTools: isDev,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true
    }
  });
  mainWindow.loadURL(winURL);
  isDev && session.defaultSession.loadExtension(require('path').resolve(__dirname, '../node_modules/vue-devtools/vender')).catch(() => {})

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

if (process.platform === 'darwin') {
  app.setAboutPanelOptions({
    applicationName: app.getName(),
    applicationVersion: app.getVersion(),
    copyright: 'Copyright 2021',
    credits: 'jinzelin'
  });
}

/**
 * Auto Updater
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
