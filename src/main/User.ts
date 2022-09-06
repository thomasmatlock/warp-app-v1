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
export async function createUser() {
  console.log('creating user');

  const user = await prisma.user.create({
    data: {
      machine_1_id: await getMachineId(),
    },
  });
  console.log('user created');
  console.log(user);
  return user;
}
export async function getUser() {
  console.log('getting user');

  let userFromDB;
  try {
    userFromDB = await prisma.user.findFirst({
      where: {
        machine_1_id: await getMachineId(),
      },
    });
    if (userFromDB === null) {
      console.log('user not found, creating user');
      userFromDB = await createUser();
      return userFromDB;
    } else if (userFromDB) {
      console.log('found user!');
      return userFromDB;
    }
  } catch (error) {}
  userFromDB = await createUser();
  return userFromDB;
}

module.exports = {
  getUser: getUser,
};
