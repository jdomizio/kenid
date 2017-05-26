const electron = require('electron');
// const { download } = require('electron-dl');
// const isDev = require('electron-is-dev');
//
function create(win, options = {}) {
    const webContents = (win.webContents || win.getWebContents());
    webContents.on('context-menu', (e, props) => {
        const menuTemplate = [{
            label: 'Inspect Element',
            click(item, win) {
                win.webContents.inspectElement(props.x, props.y);

                if (win.webContents.isDevToolsOpened()) {
                    win.webContents.devToolsWebContents.focus();
                }
            },
        }, {
            label: 'Open Devtools',
            click(item, win) {
                win.webContents.openDevTools();
            },
        }, {
            label: 'Refresh',
            click(item, win) {
                win.webContents.refresh();
            },
        }].concat(options.menuItems);

        const menu = (electron.Menu || electron.remote.Menu).buildFromTemplate(menuTemplate);

        menu.popup(electron.remote ? electron.remote.getCurrentWindow() : win);
    });
}

module.exports = (options = {}) => {
    (electron.BrowserWindow || electron.remote.BrowserWindow)
        .getAllWindows()
        .forEach(win => create(win, options));

    (electron.app || electron.remote.app)
        .on('browser-window-created', (e, win) => create(win, options));
};

