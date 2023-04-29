/* eslint-disable no-console */
import got from 'got';
import { machineId } from 'node-machine-id';
import APIVariables from '../API Variables';

export default async function AddUserDownload(
  url: string,
  downloadType: string,
  action: string
) {
  const machineID = await machineId();
  const apiURL = `${APIVariables.downloadsEndpoint}?machine_id=${machineID}&url=${url}&downloadType=${downloadType}&action=${action}`;
  try {
    // PUT REQUEST
    return await got.put(apiURL).json();
    // return await got(apiURL).json();
  } catch (error) {
    console.log('error', error);
  }
  return null;
}
