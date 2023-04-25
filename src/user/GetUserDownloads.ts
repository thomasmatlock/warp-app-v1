/* eslint-disable no-console */
import got from 'got';
import { machineId } from 'node-machine-id';

export default async function GetUserDownloads() {
  const userDownloads: object = {};
  const baseURL = 'https://warpdownload.com/api/v1/user';
  const machineID = await machineId();
  const quantity = 'all';
  const apiURL = `${baseURL}?machine_id=${machineID}&quantity=${quantity}`;
  try {
    return await got(apiURL).json();
  } catch (error) {
    console.log('error', error);
  }
  return userDownloads;
}
