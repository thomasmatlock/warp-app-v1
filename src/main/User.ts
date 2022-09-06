const Store = require('electron-store');
import os from 'os';
const settings = new Store();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('user');
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import UserOffline from './UserOffline';
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
  }
  if (moduleEdition != 'free') {
  }
  // console.log(moduleEdition);
  try {
    for (const key in updatedUser) {
      if (moduleType.includes(key)) {
        updatedUser[key] = moduleEdition;
        const updateUser = await prisma.user.update({
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
            audioAuthCode:
              moduleType === 'audio' &&
              moduleEdition !== 'free' &&
              user.audioAuthCode === ''
                ? generateCode('audio', moduleEdition)
                : generateCode('audio', 'free'),
            videoAuthCode:
              moduleType === 'video' && moduleEdition !== 'free'
                ? // user.videoAuthCode === null
                  generateCode('video', moduleEdition)
                : generateCode('video', 'free'),
            warpstagramAuthCode:
              moduleType === 'warpstagram' && moduleEdition !== 'free'
                ? // user.warpstagramAuthCode === null
                  generateCode('warpstagram', moduleEdition)
                : generateCode('warpstagram', 'free'),
          },
        });
        console.log(updateUser);
      }
    }
    return user;
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
  // let user = await getUser();
  // let updatedUser = { ...user };
  // console.log(moduleEdition);
  try {
    // const updateUser = await prisma.user.update({
    //   where: {
    //     id: user.id,
    //   },
    //   data: {
    //     audio: moduleEdition,
    //     video: moduleEdition,
    //     warpstagram: moduleEdition,
    //   },
    // });
    let updateUser = await upgradeUserModule('audio', moduleEdition);
    updateUser = await upgradeUserModule('video', moduleEdition);
    updateUser = await upgradeUserModule('warpstagram', moduleEdition);
    console.log(updateUser);
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
  getUser: getUser,
  upgradeUserModule: upgradeUserModule,
  upgradeAllUserModules: upgradeAllUserModules,
  resetUser: resetUser,
};
