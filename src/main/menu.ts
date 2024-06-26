import {
  app,
  dialog,
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions,
} from 'electron';
import App from 'renderer/App';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
  mWin: BrowserWindow;

  constructor(mWin: BrowserWindow) {
    this.mWin = mWin;
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mWin.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mWin.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mWin });
    });
  }

  buildDarwinTemplate(): MenuItemConstructorOptions[] {
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      label: 'Warp',
      submenu: [
        // {
        //   label: 'About ElectronReact',
        //   selector: 'orderFrontStandardAboutPanel:',
        // },
        // { type: 'separator' },
        // { label: 'Services', submenu: [] },
        // { type: 'separator' },
        // {
        //   label: 'Hide ElectronReact',
        //   accelerator: 'Command+H',
        //   selector: 'hide:',
        // },
        // {
        //   label: 'Hide Others',
        //   accelerator: 'Command+Shift+H',
        //   selector: 'hideOtherApplications:',
        // },
        // { label: 'Show All', selector: 'unhideAllApplications:' },
        // {
        //   label: 'Quit',
        //   accelerator: 'Command+Q',
        //   click: () => {
        //     app.quit();
        //   },
        // },
        // { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    };
    const subMenuEdit: DarwinMenuItemConstructorOptions = {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:',
        },
      ],
    };
    const subMenuViewDev: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: () => {
            this.mWin.webContents.reload();
          },
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mWin.setFullScreen(!this.mWin.isFullScreen());
          },
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mWin.webContents.toggleDevTools();
          },
        },
      ],
    };
    const subMenuViewProd: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mWin.setFullScreen(!this.mWin.isFullScreen());
          },
        },
      ],
    };
    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: 'Bring All to Front', selector: 'arrangeInFront:' },
      ],
    };
    const subMenuHelp: MenuItemConstructorOptions = {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://warpdownload.com');
          },
        },
      ],
    };
    const subMenuAudio: MenuItemConstructorOptions = {
      label: 'Audio',
      submenu: [
        {
          label: 'Pause All',
          enabled: false,
          enabled: false,
          click: () => {
            appWin.send('Audio: Downloads: Pause All');
          },
        },
        {
          label: 'Resume All',
          enabled: false,
          enabled: false,
          click: () => {
            appWin.send('Audio: Downloads: Resume All');
          },
        },
        {
          label: 'separator',
          type: 'separator',
        },
        {
          label: 'Remove All',
          enabled: false,
          click: () => {
            appWin.send('Audio: Downloads: Remove All');
          },
        },
        {
          label: 'separator',
          type: 'separator',
        },
        {
          label: 'Import Download Links',
          enabled: true,
          // accelerator: 'CmdOrCtrl+Shift+O',
          click: () => {
            dialog
              .showOpenDialog({
                properties: ['openFile', 'multiSelections'],
                defaultPath: app.getPath('desktop'),
              })
              .then((result) => {
                console.log(result);
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
        {
          label: 'Export Download Links',
          enabled: false,
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => {
            appWin.send('Audio: File: Export Download Links');
          },
        },
      ],
    };
    const subMenuVideo: MenuItemConstructorOptions = {
      label: 'Video',
      submenu: [
        // {
        //   label: 'Paste',
        //   enabled: false,
        //   accelerator: 'CmdOrCtrl+V',
        //   click: () => {
        //     appWin.send('Video: Downloads: Paste');
        //   },
        // },
        // {
        //   label: 'separator',
        //   type: 'separator',
        // },
        {
          label: 'Pause All',
          enabled: false,
          click: () => {
            appWin.send('Video: Downloads: Pause All');
          },
        },
        {
          label: 'Resume All',
          enabled: false,
          click: () => {
            appWin.send('Video: Downloads: Resume All');
          },
        },
        {
          label: 'separator',
          type: 'separator',
        },
        {
          label: 'Remove All',
          enabled: false,
          click: () => {
            appWin.send('Video: Downloads: Remove All');
          },
        },
        {
          label: 'separator',
          type: 'separator',
        },
        {
          label: 'Import Download Links',
          enabled: true,
          // accelerator: 'CmdOrCtrl+O',
          click: () => {
            dialog
              .showOpenDialog({
                properties: ['openFile', 'multiSelections'],
                defaultPath: app.getPath('desktop'),
              })
              .then((result) => {
                console.log(result);
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
        {
          label: 'Export Download Links',
          enabled: false,
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            appWin.send('Video: File: Export Download Links');
          },
        },
        {
          label: 'separator',
          type: 'separator',
        },
        {
          label: 'Import Subscriptions',
          enabled: false,
          click: () => {
            appWin.send('Video: File: Import Subscriptions');
          },
        },
        {
          label: 'Export Subscriptions',
          enabled: false,
          click: () => {
            appWin.send('Video: File: Export Subscriptions');
          },
        },
        {
          label: 'separator',
          type: 'separator',
        },
        {
          label: 'Subscriptions...',
          enabled: false,
          click: () => {
            appWin.send('Video: Tools: Subscriptions');
          },
        },
        {
          label: 'separator',
          type: 'separator',
        },
      ],
    };
    const subMenuWarpstagram: MenuItemConstructorOptions = {
      label: 'Warpstagram',
      submenu: [
        // {
        //   label: 'Paste',
        //   enabled: false,
        //   accelerator: 'CmdOrCtrl+V',
        //   click: () => {
        //     appWin.send('Audio: Downloads: Paste');
        //   },
        // },
        // {
        //   label: 'separator',
        //   type: 'separator',
        // },
        {
          label: 'Pause All',
          enabled: false,
          enabled: false,
          click: () => {
            appWin.send('Audio: Downloads: Pause All');
          },
        },
        {
          label: 'Resume All',
          enabled: false,
          enabled: false,
          click: () => {
            appWin.send('Audio: Downloads: Resume All');
          },
        },
        {
          label: 'separator',
          type: 'separator',
        },
        {
          label: 'Remove All',
          enabled: false,
          click: () => {
            appWin.send('Audio: Downloads: Remove All');
          },
        },
        {
          label: 'separator',
          type: 'separator',
        },
        {
          label: 'Import Download Links',
          enabled: true,
          // accelerator: 'CmdOrCtrl+Shift+O',
          click: () => {
            dialog
              .showOpenDialog({
                properties: ['openFile', 'multiSelections'],
                defaultPath: app.getPath('desktop'),
              })
              .then((result) => {
                console.log(result);
              })
              .catch((err) => {
                console.log(err);
              });
            // appWin.send('Audio: File: Import Download Links');
          },
        },
        {
          label: 'Export Download Links',
          enabled: false,
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => {
            appWin.send('Audio: File: Export Download Links');
          },
        },
      ],
    };
    const subMenuTools: MenuItemConstructorOptions = {
      label: 'Tools',
      submenu: [
        // {
        //   label: 'Check for updates...',
        //   enabled: false,
        //   click: () => {
        //     // appWin.send('Check for update');
        //   },
        // },
        // {
        //   label: 'separator',
        //   type: 'separator',
        // },
        {
          label: 'Preferences',
          enabled: true,
          accelerator: 'CmdOrCtrl+P',
          click: () => {
            this.mWin.webContents.send('modal: preferences');
          },
        },
        {
          label: 'separator',
          type: 'separator',
        },
        // {
        //   label: 'Manage logins',
        //   enabled: true,
        //   accelerator: 'CmdOrCtrl+Alt+L',
        //   click: () => {
        //     this.mWin.webContents.send('modal: preferences: auths');
        //   },
        // },
        {
          label: 'separator',
          type: 'separator',
        },
        {
          label: 'Manage license',
          enabled: true,
          accelerator: 'CmdOrCtrl+L',
          click: () => {
            this.mWin.webContents.send('modal: preferences: license');
          },
        },
        {
          label: 'separator',
          type: 'separator',
        },
      ],
    };
    const subMenuShortcuts: MenuItemConstructorOptions = {
      label: 'Tools',
      submenu: [
        {
          label: 'Audio Mode',
          enabled: true,
          accelerator: 'CmdOrCtrl+1',
          click: () => {
            this.mWin.webContents.send('nav: mode: audio');
          },
        },
        {
          label: 'Video Mode',
          enabled: true,
          accelerator: 'CmdOrCtrl+2',
          click: () => {
            this.mWin.webContents.send('nav: mode: video');
          },
        },
        {
          label: 'Warpstagram Mode',
          enabled: true,
          accelerator: 'CmdOrCtrl+3',
          click: () => {
            this.mWin.webContents.send('nav: mode: warpstagram');
          },
        },
        {
          label: 'separator',
          type: 'separator',
        },
        {
          label: 'Change Theme',
          enabled: false,
          accelerator: 'CmdOrCtrl+T',
          click: () => {
            // app.relaunch();
            // this.mWin.webContents.send('Menu: Shortcuts: Restart');
          },
        },
        {
          label: 'Soft Restart Warp',
          enabled: true,
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            app.relaunch();
            // this.mWin.webContents.send('Menu: Shortcuts: Restart');
          },
        },
        // {
        //   label: 'Hard Restart Warp',
        //   enabled: true,
        //   accelerator: 'CmdOrCtrl+Shift+R',
        //   click: () => {
        //     app.relaunch();
        //     app.exit(0);
        //     // this.mWin.webContents.send('Menu: Shortcuts: Restart');
        //   },
        // },
      ],
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
        ? subMenuViewDev
        : subMenuViewProd;

    return [
      subMenuAbout,
      subMenuAudio,
      subMenuVideo,
      subMenuWarpstagram,
      subMenuTools,
      subMenuShortcuts,
      // subMenuEdit,
      subMenuHelp,
      subMenuView,
      // subMenuWindow,
    ];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Quit',
            accelerator: 'CmdOrCtrl+Q',
            click: () => {
              // this.mWin.close();
              app.quit();
            },
          },
        ],
      },
      {
        label: '&Audio',
        submenu: [
          // {
          //   label: 'Paste',
          //   enabled: false,
          //   accelerator: 'CmdOrCtrl+V',
          //   click: () => {
          //     appWin.send('Audio: Downloads: Paste');
          //   },
          // },
          // {
          //   label: 'separator',
          //   type: 'separator',
          // },
          {
            label: 'Pause All',
            enabled: false,
            // enabled: false,
            click: () => {
              appWin.send('Audio: Downloads: Pause All');
            },
          },
          {
            label: 'Resume All',
            enabled: false,
            // enabled: false,
            click: () => {
              appWin.send('Audio: Downloads: Resume All');
            },
          },
          {
            label: 'separator',
            type: 'separator',
          },
          {
            label: 'Remove All',
            enabled: false,
            click: () => {
              appWin.send('Audio: Downloads: Remove All');
            },
          },
          {
            label: 'separator',
            type: 'separator',
          },
          {
            label: 'Import Download Links',
            enabled: true,
            // accelerator: 'CmdOrCtrl+Shift+O',
            click: () => {
              // console.log('import');
              dialog
                .showOpenDialog({
                  properties: ['openFile', 'multiSelections'],
                  defaultPath: app.getPath('desktop'),
                })
                .then((result) => {
                  console.log(result);
                })
                .catch((err) => {
                  console.log(err);
                });
            },
          },
          {
            label: 'Export Download Links',
            enabled: false,
            // accelerator: 'CmdOrCtrl+Shift+S',
            click: () => {
              //  dialog
              //    .showOpenDialog({
              //      properties: ['openFile', 'multiSelections'],
              //      defaultPath: app.getPath('desktop'),
              //    })
              //    .then((result) => {
              //      console.log(result);
              //    })
              //    .catch((err) => {
              //      console.log(err);
              //    });
            },
          },
        ],
      },
      {
        label: '&Video',
        submenu: [
          // {
          //   label: 'Paste',
          //   enabled: false,
          //   accelerator: 'CmdOrCtrl+V',
          //   click: () => {
          //     appWin.send('Video: Downloads: Paste');
          //   },
          // },
          // {
          //   label: 'separator',
          //   type: 'separator',
          // },
          {
            label: 'Pause All',
            enabled: false,
            click: () => {
              appWin.send('Video: Downloads: Pause All');
            },
          },
          {
            label: 'Resume All',
            enabled: false,
            click: () => {
              appWin.send('Video: Downloads: Resume All');
            },
          },
          {
            label: 'separator',
            type: 'separator',
          },
          {
            label: 'Remove All',
            enabled: false,
            click: () => {
              appWin.send('Video: Downloads: Remove All');
            },
          },
          {
            label: 'separator',
            type: 'separator',
          },
          {
            label: 'Import Download Links',
            enabled: true,
            // accelerator: 'CmdOrCtrl+O',
            click: () => {
              dialog
                .showOpenDialog({
                  properties: ['openFile', 'multiSelections'],
                  defaultPath: app.getPath('desktop'),
                })
                .then((result) => {
                  console.log(result);
                })
                .catch((err) => {
                  console.log(err);
                });
            },
          },
          {
            label: 'Export Download Links',
            enabled: false,
            accelerator: 'CmdOrCtrl+S',
            click: () => {
              appWin.send('Video: File: Export Download Links');
            },
          },
          {
            label: 'separator',
            type: 'separator',
          },
          {
            label: 'Import Subscriptions',
            enabled: false,
            click: () => {
              appWin.send('Video: File: Import Subscriptions');
            },
          },
          {
            label: 'Export Subscriptions',
            enabled: false,
            click: () => {
              appWin.send('Video: File: Export Subscriptions');
            },
          },
          {
            label: 'separator',
            type: 'separator',
          },
          {
            label: 'Subscriptions...',
            enabled: false,
            click: () => {
              appWin.send('Video: Tools: Subscriptions');
            },
          },
          {
            label: 'separator',
            type: 'separator',
          },
        ],
      },
      {
        label: '&Warpstagram',
        submenu: [
          {
            label: 'Import Subscriptions',
            enabled: false,
            accelerator: 'CmdOrCtrl+O',
            click: () => {
              appWin.send('Warpstagram: File: Import Subscriptions');
            },
          },
          {
            label: 'Export Subscriptions',
            enabled: false,
            accelerator: 'CmdOrCtrl+S',
            click: () => {
              appWin.send('Warpstagram: File: Export Subscriptions');
            },
          },

          {
            label: 'separator',
            type: 'separator',
          },
          {
            label: 'Subscribe to ',
            enabled: false,
            submenu: [
              { label: 'My Account' },
              {
                label: 'My Saved Posts',
                enabled: false,
                click: () => {
                  appWin.send('Warpstagram: Edit: Subscribe to My Saved Posts');
                },
              },
              {
                label: `Accounts I'm Following`,
                enabled: false,
                click: () => {
                  appWin.send('Warpstagram: Edit: Sub to Accts I Follow');
                },
              },
              {
                label: `Stories Of Accounts I'm Following`,
                enabled: false,
                click: () => {
                  appWin.send(
                    'Warpstagram: Edit: Sub to Stories Of Accts I Follow'
                  );
                },
              },
            ],
          },

          {
            label: 'separator',
            type: 'separator',
          },
          {
            label: 'Update pinned subscriptions',
            enabled: false,
            click: () => {
              appWin.send('Warpstagram: Edit: Update pinned subscriptions');
            },
          },
          {
            label: 'Update all subscriptions',
            enabled: false,
            click: () => {
              appWin.send('Warpstagram: Edit: Update all subscriptions');
            },
          },
          {
            label: 'Pause all subscriptions',
            enabled: false,
            click: () => {
              appWin.send('Warpstagram: Edit: Pause all subscriptions');
            },
          },
          {
            label: 'Remove all subscriptions',
            enabled: false,
            click: () => {
              appWin.send('Warpstagram: Edit: Remove all subscriptions');
            },
          },
          {
            label: 'separator',
            enabled: false,
            type: 'separator',
          },
          {
            label: 'Export Posts...',
            enabled: false,
            click: () => {
              // appWin.send('Warpstagram: File: Export Posts');
            },
          },
        ],
      },

      {
        label: 'Tools',
        submenu: [
          {
            label: 'Preferences',
            enabled: true,
            accelerator: 'CmdOrCtrl+P',
            click: () => {
              this.mWin.webContents.send('modal: preferences');
            },
          },
          {
            label: 'separator',
            type: 'separator',
          },
          {
            label: 'Manage logins',
            enabled: true,
            accelerator: 'CmdOrCtrl+Alt+L',
            click: () => {
              this.mWin.webContents.send('modal: preferences: auths');
            },
          },
          {
            label: 'separator',
            type: 'separator',
          },
          {
            label: 'Manage license',
            enabled: true,
            accelerator: 'CmdOrCtrl+L',
            click: () => {
              this.mWin.webContents.send('modal: preferences: license');
            },
          },
          {
            label: 'separator',
            type: 'separator',
          },
        ],
      },
      {
        label: 'Shortcuts',
        submenu: [
          {
            label: 'Audio Mode',
            enabled: true,
            accelerator: 'Shift+1',
            click: () => {
              this.mWin.webContents.send('nav: mode: audio');
            },
          },
          {
            label: 'Video Mode',
            enabled: true,
            accelerator: 'Shift+2',
            click: () => {
              this.mWin.webContents.send('nav: mode: video');
            },
          },
          {
            label: 'Warpstagram Mode',
            enabled: true,
            accelerator: 'Shift+3',
            click: () => {
              this.mWin.webContents.send('nav: mode: warpstagram');
            },
          },
          {
            label: 'separator',
            type: 'separator',
          },
          {
            label: 'Change Theme',
            enabled: false,
            accelerator: 'CmdOrCtrl+T',
            click: () => {
              // app.relaunch();
              // this.mWin.webContents.send('Menu: Shortcuts: Restart');
            },
          },
          {
            label: 'Soft Restart Warp',
            enabled: true,
            accelerator: 'CmdOrCtrl+R',
            click: () => {
              app.relaunch();
              // this.mWin.webContents.send('Menu: Shortcuts: Restart');
            },
          },
          // {
          //   label: 'Hard Restart Warp',
          //   enabled: true,
          //   accelerator: 'CmdOrCtrl+Shift+R',
          //   click: () => {
          //     app.relaunch();
          //     app.exit(0);
          //     // this.mWin.webContents.send('Menu: Shortcuts: Restart');
          //   },
          // },
        ],
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Learn More',
            click() {
              shell.openExternal('https://warpdownload.com');
            },
          },
        ],
      },
      {
        label: '&View',
        submenu:
          process.env.NODE_ENV === 'development' ||
          process.env.DEBUG_PROD === 'true'
            ? [
                {
                  label: '&Reload',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mWin.webContents.reload();
                  },
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mWin.setFullScreen(!this.mWin.isFullScreen());
                  },
                },
                {
                  label: 'Toggle &Developer Tools',
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mWin.webContents.toggleDevTools();
                  },
                },
              ]
            : [
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mWin.setFullScreen(!this.mWin.isFullScreen());
                  },
                },
              ],
      },
    ];

    return templateDefault;
  }
}
