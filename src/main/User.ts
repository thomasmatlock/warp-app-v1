/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/order */
/* eslint-disable import/first */
// import { PrismaClient } from '../extra/client';

// import { PrismaClient } from '@prisma/client'; // default
// let prismaClientPath = '../@prisma/client';
import { app } from 'electron';
import path from 'path';

// if (!app.isPackaged) {
// import { PrismaClient } from '../@prisma/client'; // trying to use the prisma client here with new path
//  import { PrismaClient }
let PrismaClient;
const appRootDir = require('app-root-dir').get();
// const unPackagedMacClient = './dir/someModule.js';
// const packagedWindowsClient = './dir/someModule.js';
// const packagedMacClient = './dir/someModule.js';
// import { PrismaClient } from '@prisma/client';
function getWindowsPackagedPath(targetPath: string) {
  const packagedPathSplit = targetPath.split('\\');
  let joined = '';
  for (let i = 0; i < packagedPathSplit.length; i++) {
    if (packagedPathSplit[i] !== 'resources') {
      joined = `${joined + packagedPathSplit[i]}\\`;
    } else if (packagedPathSplit[i] === 'resources') {
      break;
    }
  }
  return joined;
}
if (!app.isPackaged) {
  if (process.platform === 'win32') {
    const unPackagedClient = '@prisma/client';
    // console.log('unPackagedClient', unPackagedClient);

    PrismaClient =
      require(`${`${appRootDir}\\node_modules\\@prisma\\client`}`).PrismaClient; // windows installation path

    // PrismaClient = require(unPackagedClient).PrismaClient; // default node_modules path
  } else if (process.platform === 'darwin') {
    console.log('appRootDir', appRootDir);
  }
  // import(unPackagedWindowsClient).then((unPackagedWindowsClient) => {
  //   PrismaClient = { ...unPackagedWindowsClient };
  //   console.log('unPackagedWindowsClient', unPackagedWindowsClient);
  // });
} else if (app.isPackaged) {
  if (process.platform === 'win32') {
    // C:\Program Files\Warp\resources\node_modules\@prisma\client
    PrismaClient =
      // require(`${`${appRootDir}\\node_modules\\@prisma\\client`}`).PrismaClient;
      require(`${`${getWindowsPackagedPath(
        appRootDir
      )}resources\\node_modules\\@prisma\\client`}`).PrismaClient;
    // console.log(
    //   `${appRootDir + '\\node_modules\\@prisma\\client'}`,
    //   PrismaClient
    // );

    // const packagedWindowsClient = path.join(
    //   getWindowsPackagedPath(appRootDir),
    //   'resources',
    //   'node_modules',
    //   '@prisma',
    //   'client'
    // );
    // console.log('packagedWindowsClient', packagedWindowsClient);
    // PrismaClient = require(packagedWindowsClient).PrismaClient;
  } else if (process.platform === 'darwin') {
    console.log('appRootDir', appRootDir);
  }
}
// unPackagedWindowsClient
// import { PrismaClient } from '@prisma/client';
//     .then((unPackagedWindowsClient) => {
//       console.log('unPackagedWindowsClient', unPackagedWindowsClient);

//       //  console.log(something.something);
//     });
// }
// app.isPackaged ? import { PrismaClient } from '../@prisma/client' : import { PrismaClient } from '@prisma/client';
// }
// import { PrismaClient } from prismaClientPath; // trying to use the prisma client here with new path
// import generatePrismaClientPath from './generatePrismaClientPath';
// let prismaClientPath = generatePrismaClientPath();
// import { PrismaClient } from generatePrismaClientPath(); // trying to use the prisma client here with new path

const Store = require('electron-store');
// import express from 'express';
import os from 'os';

const settings = new Store();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('user');
const prisma = new PrismaClient();
// const prisma = new PrismaClient({
//   __internal: {
//     engine: {
//       binaryPath: '/path/to/binary',
//     },
//   },
// });
// import UserOffline from './UserOffline';
import generateCode from './UserAuthCodes';

import { machineId, machineIdSync } from 'node-machine-id';
let machine_id;
async function getMachineId() {
  machine_id = await machineId();
  return machine_id;
}
export async function upgradeUserModule(
  moduleType: string,
  moduleEdition: string
) {
  let user = await getUser();
  let updatedUser = { ...user };
  let audioAuthCode;
  let videoAuthCode;
  let warpstagramAuthCode;
  if (moduleEdition === 'free') {
    if (moduleType === 'audio') audioAuthCode = '';
    if (moduleType === 'video') videoAuthCode = '';
    if (moduleType === 'warpstagram') warpstagramAuthCode = '';
  } else if (moduleEdition != 'free') {
    if (moduleType === 'audio') {
      if (user.audioAuthCode === '') {
        audioAuthCode = generateCode(moduleType, moduleEdition);
      } else if (user.audioAuthCode != '') {
        if (user.audio != moduleEdition) {
          audioAuthCode = generateCode(moduleType, moduleEdition);
        } else if (user.audio === moduleEdition) {
          audioAuthCode = user.audioAuthCode;
        }
      }
    }
    if (moduleType === 'video') {
      if (user.videoAuthCode === '') {
        videoAuthCode = generateCode(moduleType, moduleEdition);
      } else if (user.videoAuthCode != '') {
        if (user.video != moduleEdition) {
          videoAuthCode = generateCode(moduleType, moduleEdition);
        } else if (user.video === moduleEdition) {
          videoAuthCode = user.videoAuthCode;
        }
      }
    }
    if (moduleType === 'warpstagram') {
      if (user.warpstagramAuthCode === '') {
        warpstagramAuthCode = generateCode(moduleType, moduleEdition);
      } else if (user.warpstagramAuthCode != '') {
        if (user.warpstagram != moduleEdition) {
          warpstagramAuthCode = generateCode(moduleType, moduleEdition);
        } else if (user.warpstagram === moduleEdition) {
          warpstagramAuthCode = user.warpstagramAuthCode;
        }
      }
    }
  }
  try {
    for (const key in updatedUser) {
      if (moduleType.includes(key)) {
        updatedUser[key] = moduleEdition;
        updatedUser = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            //  UPGRADE MODULE EDITION
            audio: moduleType === 'audio' ? moduleEdition : user.audio,
            video: moduleType === 'video' ? moduleEdition : user.video,
            warpstagram:
              moduleType === 'warpstagram' ? moduleEdition : user.warpstagram,
            //  ADD MODULE AUTH CODE IF NOT PRESENT
            audioAuthCode,
            videoAuthCode,
            warpstagramAuthCode,
          },
        });
      }
    }
    // console.log(updatedUser);
    return updatedUser;
    // return user;
  } catch (error) {
    console.log(error);
  }
}
export async function resetUser() {
  try {
    let updateUser = await upgradeUserModule('audio', 'free');
    updateUser = await upgradeUserModule('video', 'free');
    updateUser = await upgradeUserModule('warpstagram', 'free');
    return updateUser;
  } catch (error) {
    console.log(error);
  }
}
export async function upgradeAllUserModules(moduleEdition: string) {
  let user = await getUser();
  try {
    user = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        //  UPGRADE MODULE EDITION
        audio: moduleEdition,
        video: moduleEdition,
        warpstagram: moduleEdition,
        //  ADD MODULE AUTH CODE IF NOT PRESENT
        audioAuthCode: generateCode('audio', moduleEdition),
        videoAuthCode: generateCode('video', moduleEdition),
        warpstagramAuthCode: generateCode('warpstagram', moduleEdition),
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}
export async function createUser() {
  console.log('creating user');

  const user = await prisma.user.create({
    data: {
      machines: {
        create: {
          id: await getMachineId(),
          hostname: os.hostname(),
          platform: os.platform(),
          type: os.type(),
          release: os.release(),
        },
      },
    },
  });
  return user;
}
export async function getUser() {
  // console.log(os.hostname(), os.platform(), os.type(), os.release());

  let userFromDB;
  try {
    userFromDB = await prisma.user.findFirst({
      where: {
        machines: {
          some: {
            // id: 'e0b9b0b0-1b1a-11ec-8d3d-0242ac130003',
            id: await getMachineId(),
          },
        },
      },
    });
    if (userFromDB === null) {
      console.log('user with current machine not found');

      // userFromDB = await createUser();
      // return userFromDB;
    } else if (userFromDB) {
      // console.log('user with current machine found');

      return userFromDB;
    }
  } catch (error) {}
  userFromDB = await createUser();
  return userFromDB;
}

module.exports = {
  getUser,
  upgradeUserModule,
  upgradeAllUserModules,
  resetUser,
};
