const Store = require('electron-store');
const settings = new Store();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('user');
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import UserOffline from './UserOffline';
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
  // console.log(moduleType, moduleEdition);
  // let decryptedUser = getUser();
  let user = await getUser();
  let updatedUser = { ...user };
  for (const key in updatedUser) {
    // console.log('key', key);

    if (moduleType.includes(key)) {
      // console.log('updatedUser[key]', updatedUser[key]);
      console.log(moduleType, moduleEdition);

      updatedUser[key] = moduleEdition;
      console.log('updatedUser[key]', updatedUser[key]);

      // user = updatedUser;
      // console.log('updatedUser[key]', updatedUser[key]);
      console.log(updatedUser);
      const updateUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          audio: moduleEdition,
        },
      });
      console.log(updateUser);
    }
  }
  // console.log(updatedUser);

  // setUser(updatedUser);
  // // console.log(updatedUser);
  // return updatedUser;
}
export async function createUser() {
  const user = await prisma.user.create({
    data: {
      machine_1_id: await getMachineId(),
    },
  });
  return user;
}
export async function getUser() {
  let userFromDB;
  try {
    userFromDB = await prisma.user.findFirst({
      where: {
        machine_1_id: await getMachineId(),
      },
    });
    if (userFromDB === null) {
      userFromDB = await createUser();
      return userFromDB;
    } else if (userFromDB) {
      return userFromDB;
    }
  } catch (error) {}
  userFromDB = await createUser();
  return userFromDB;
}

module.exports = {
  getUser: getUser,
  upgradeUserModule: upgradeUserModule,
};
