/* eslint-disable no-console */
import got from 'got';
import os from 'os';
import { machineId } from 'node-machine-id';

export default async function getUser() {
  // console.log('getUser');

  const userFromDB: object = {};
  // const baseURL = 'https://warp-api.vercel.app/api/v1/user'; // warp-api
  const baseURL = 'https://warpdownload.com/api/v1/user';
  const machineID = await machineId();
  const arch = os.arch();

  const hostname = os.hostname();
  const platform = os.platform();
  const type = os.type();
  const release = os.release();
  const apiURL = `${baseURL}?machine_id=${machineID}&hostname=${hostname}&platform=${platform}&type=${type}&release=${release}`;
  try {
    return await got(apiURL).json();
  } catch (error) {
    console.log('error', error);
  }
  console.log('userFromDB', userFromDB);

  return userFromDB;
}
