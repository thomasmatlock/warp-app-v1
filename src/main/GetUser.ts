/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/order */
/* eslint-disable import/first */

// import os from 'os';
import got from 'got';

// console.log(got);

// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import generateCode from './UserAuthCodes';

import { machineId } from 'node-machine-id';

let machineID;
async function getMachineId() {
  machineID = await machineId();
  return machineID;
}

export default async function getUser() {
  let id;
  try {
    id = await getMachineId();
    // console.log('id', id);
  } catch (error) {
    console.log('error', error);
  }
  // console.log('getting user');
  const websiteURL = 'https://warpdownload.com/api/v1/users';
  // const apiURL = 'https://warp-api.vercel.app/api/user';
  // const apiURL = `https://warpdownload.com/api/v1/user?id=Alice`;
  const apiURL = `https://warpdownload.com/api/v1/user?id=${id}`;
  // const apiURL = 'https://warp-api.vercel.app/api/user?id=Alice';
  try {
    console.log('requesting user data from', apiURL);

    const res = await got(apiURL).json();
    console.log(res);
  } catch (error) {}

  let userFromDB;
  // try {
  //   userFromDB = await prisma.user.findFirst({
  //     where: {
  //       machines: {
  //         some: {
  //           // id: 'e0b9b0b0-1b1a-11ec-8d3d-0242ac130003',
  //           id: await getMachineId(),
  //         },
  //       },
  //     },
  //   });
  //   if (userFromDB === null) {
  //     console.log('user with current machine not found');
  //   } else if (userFromDB) {
  //     return userFromDB;
  //   }
  // } catch (error) {}
  // userFromDB = await createUser();
  return userFromDB;
}
