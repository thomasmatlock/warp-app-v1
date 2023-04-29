/* eslint-disable no-console */
import got from 'got';
import os from 'os';
import { machineId } from 'node-machine-id';
import APIVariables from './API Variables';

export default async function getUser() {
  const userFromDB: object = {};
  const machineID = await machineId();
  // console.log('machineID', machineID);

  const hostname = os.hostname();
  const platform = os.platform();
  const type = os.type();
  const release = os.release();
  const apiURL = `${APIVariables.userEndpoint}?machine_id=${machineID}&hostname=${hostname}&platform=${platform}&type=${type}&release=${release}`;

  try {
    return (await got(apiURL).json()) as object;
  } catch (error) {
    console.log('error', error);
  }
  return userFromDB as object;
}
