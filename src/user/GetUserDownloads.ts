/* eslint-disable no-console */
import got from 'got';
import { machineId } from 'node-machine-id';
import APIVariables from './API Variables';

export default async function GetUserDownloads() {
  const userDownloads: object = {};
  const machineID = await machineId();
  const apiURL = `${APIVariables.downloadsEndpoint}?machine_id=${machineID}`;
  try {
    console.log(await got(apiURL).json());

    return (await got(apiURL).json()) as object;
  } catch (error) {
    console.log('error', error);
  }
  return userDownloads as object;
}
