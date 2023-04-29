/* eslint-disable no-console */
import got from 'got';
import { machineId } from 'node-machine-id';
import APIVariables from './API Variables';

export default async function GetUserDownloads(
  email: string,
  moduleType: string,
  moduleEdition: string,
  action: string
) {
  const machineID = await machineId();
  const apiURL = `${APIVariables.userEndpoint}?machine_id=${machineID}&email=${email}&moduleType=${moduleType}&moduleEdition=${moduleEdition}&action=${action}`;
  try {
    // return await got(apiURL).json();
    return await got.put(apiURL).json();
  } catch (error) {
    console.log('error', error);
  }
  return null;
}
