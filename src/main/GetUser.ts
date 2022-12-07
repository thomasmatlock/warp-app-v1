/* eslint-disable no-console */
import got from 'got';
import os from 'os';
import { machineId } from 'node-machine-id';

export default async function getUser() {
  const userFromDB = {};
  const baseURL = 'https://warp-api.vercel.app/api/v1/user';
  const machineID = await machineId();
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
  return userFromDB;
}
