/* eslint-disable no-console */
import got from 'got';
import { machineId } from 'node-machine-id';

export default async function GetUserDownloads(
  url: string,
  downloadType: string,
  action: string
) {
  const baseURL = 'https://warpdownload.com/api/v1/user';

  const machineID = await machineId();
  // const url = 'https://www.youtube.com/watch?v=7t885JG9qNE';
  // const downloadType = 'audio'; // audio, video, instagram
  // const action = 'add'; // add, remove

  // 'https://warpdownload.com/api/v1/user?machine_id=426e55fe-bfaf-4f5e-9030-edb84acdf231&url=https://www.youtube.com/watch?v=7t885JG9qNE&downloadType=audio&action=add'
  const apiURL = `${baseURL}?machine_id=${machineID}&url=${url}&downloadType=${downloadType}&action=${action}`;
  // const apiURL = `${baseURL}?machine_id=${machineID}&quantity=${quantity}`;
  try {
    return await got(apiURL).json();
  } catch (error) {
    console.log('error', error);
  }
  return null;
}
