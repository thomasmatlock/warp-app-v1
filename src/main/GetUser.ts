/* eslint-disable no-console */

// import os from 'os';
import got from 'got';
import os from 'os';

import { machineId } from 'node-machine-id';

let machineID: string;
async function getMachineId() {
  machineID = await machineId();
  return machineID;
}
// id: await getMachineId(),
const hostname = os.hostname();
const platform = os.platform();
const type = os.type();
const release = os.release();

export default async function getUser() {
  let userFromDB: any;
  try {
    machineID = await getMachineId();
  } catch (error) {
    console.log('error', error);
  }
  // console.log('getting user');
  // const apiURL = 'https://warp-api.vercel.app/api/v1/user';
  // const apiURL = `https://warpdownload.com/api/v1/user?id=Alice`;
  const baseURL = 'https://warp-api.vercel.app/api/v1/user';
  const apiURL = `${baseURL}?id=${machineID}&hostname=${hostname}&platform=${platform}&type=${type}&release=${release}`;
  const placeholder =
    'https://warp-api.vercel.app/api/v1/user?hostname=dummy_hostname&platform=dummy_platform&type=dummy_type&release=dummy_release&machine_id=426e55fe-bfaf-4f5e-9030-edb84acd331';
  // const apiURL = `https://warp-api.vercel.app/api/v1/user?id=${machineID}`;
  try {
    console.log('requesting user data from', apiURL);

    userFromDB = await got(apiURL).json();
    console.log(userFromDB);
  } catch (error) {
    console.log('error', error);
  }

  return userFromDB;
}
