/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/order */
/* eslint-disable import/first */
const appRootDir = require('app-root-dir').get();

import { app } from 'electron';
// import downloadHelper from 'nodejs-file-downloader';
import path from 'path';
// const { DownloaderHelper } = require('node-downloader-helper');
const Downloader = require('nodejs-file-downloader');
const windowsBinaryURL =
  'https://github.com/thomasmatlock/ffmpeg-binaries/raw/main/win32-x64/ffmpeg.exe'; // windows binary URL

// https://github.com/thomasmatlock/ffmpeg-binaries/raw/main/darwin-arm64/ffmpeg, mac arm64 binary URL
// https://github.com/thomasmatlock/ffmpeg-binaries/raw/main/darwin-x64/ffmpeg, mac x64 binary URL
// const { DownloaderHelper } = require('node-downloader-helper');
(async () => {
  //Wrapping the code with an async function, just for the sake of example.

  const downloader = new Downloader({
    url: windowsBinaryURL, //If the file name already exists, a new file with the name 200MB1.zip is created.
    // directory: './downloads', //This folder will be created, if it doesn't exist.
    directory: path.join(appRootDir, 'resources'), //This folder will be created, if it doesn't exist.
  });
  try {
    const { filePath, downloadStatus } = await downloader.download(); //Downloader.download() resolves with some useful properties.
    console.log(filePath);
    console.log(downloadStatus);

    console.log('All done');
  } catch (error) {
    //IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
    //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
    console.log('Download failed', error);
  }
})();

import os from 'os';
import { PrismaClient } from '../@prisma/client';

// const Cryptr = require('cryptr');

const prisma = new PrismaClient();

import generateCode from './UserAuthCodes';

import { machineId } from 'node-machine-id';
import { path } from '@ffmpeg-installer/ffmpeg';

let machineID;
async function getMachineId() {
  machineID = await machineId();
  return machineID;
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
  // return null;
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
