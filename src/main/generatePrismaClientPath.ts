// /* eslint-disable no-plusplus */
// import path from 'path';
// import { app } from 'electron';
// // import { PrismaClient } from '@prisma/client'; // default

// const appRootDir = require('app-root-dir').get();

// function getWindowsPackagedPath(targetPath: string) {
//   const packagedPathSplit = targetPath.split('\\');
//   let joined = '';
//   for (let i = 0; i < packagedPathSplit.length; i++) {
//     if (packagedPathSplit[i] !== 'resources') {
//       joined = `${joined + packagedPathSplit[i]}\\`;
//     } else if (packagedPathSplit[i] === 'resources') {
//       break;
//     }
//   }
//   return joined;
// }
// export default function generatePrismaClientPath() {
//   if (!app.isPackaged) {
//     import { PrismaClient } from '../@prisma/client'; // trying to use the prisma client here with new path
//     return PrismaClient;
//     // return '@prisma/client';
//   }
//   if (app.isPackaged) {
//     return null;
//   }
//   // let ffmpegPath;
//   // if (process.platform === 'win32') {
//   //   if (!app.isPackaged) {
//   //     ffmpegPath = path.join(
//   //       appRootDir,
//   //       'node_modules',
//   //       '@ffmpeg-installer',
//   //       'win32-x64',
//   //       'ffmpeg.exe'
//   //     );
//   //   } else if (app.isPackaged) {
//   //     ffmpegPath = path.join(
//   //       getWindowsPackagedPath(appRootDir),
//   //       'resources',
//   //       'node_modules',
//   //       '@ffmpeg-installer',
//   //       'win32-x64',
//   //       'ffmpeg.exe'
//   //     );
//   //     // ffmpegPath = path.join(
//   //     //   getWindowsPackagedPath(appRootDir),
//   //     //   'resources',
//   //     //   'ffmpeg',
//   //     //   'ffmpeg.exe'
//   //     // );
//   //   }
//   //   return ffmpegPath;
//   // }
//   // if (process.platform === 'darwin') {
//   //   if (!app.isPackaged) {
//   //     console.log(appRootDir);
//   //     // /Users/nikkirincon/Documents/GitHub/warp-app

//   //     ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

//   //     // console.log('packagedPath', getWindowsPackagedPath(appRootDir));
//   //     // console.log('ffmpegPath', ffmpegPath);
//   //   } else if (app.isPackaged) {
//   //     // /Users/nikkirincon/Documents/GitHub/warp-app/node_modules/@ffmpeg-installer/darwin-arm64 MAC
//   //     // /Users/nikkirincon/Documents/GitHub/warp-app/node_modules/@ffmpeg-installer/darwin-arm64
//   //     // appRootDir =Applications/Warp.app/Contents/Resources/app.asar.dist
//   //     ffmpegPath = appRootDir.replace('/app.asar/dist', '');
//   //     ffmpegPath = path.join(
//   //       ffmpegPath,
//   //       'node_modules',
//   //       '@ffmpeg-installer',
//   //       'darwin-arm64',
//   //       'ffmpeg'
//   //     );
//   //   }
//   //   return ffmpegPath;
//   // }
// }
