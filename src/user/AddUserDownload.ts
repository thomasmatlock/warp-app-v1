/* eslint-disable no-console */
import got from 'got';
import { machineId } from 'node-machine-id';

export default async function GetUserDownloads(
  url: string,
  downloadType: string,
  action: string
) {
  const baseURL = 'https://warpdownload.com/api/v1/user';
  // console.log(url, downloadType, action);

  const machineID = await machineId();
  // console.log(machineID);

  // const url = 'https://www.youtube.com/watch?v=7t885JG9qNE';
  // const downloadType = 'audio'; // audio, video, instagram
  // const action = 'add'; // add, remove

  // 'https://warpdownload.com/api/v1/user?machine_id=3dfc971d0f8ef3d47b3423b16db75e1b1d493e2cb8e0e28a8c56de48bbba5e9c&url=https://www.youtube.com/watch?v=7t885JG9qNE&downloadType=video&action=add'
  const apiURL = `${baseURL}?machine_id=${machineID}&url=${url}&downloadType=${downloadType}&action=${action}`;
  // const apiURL = `https://warpdownload.com/api/v1/user?machine_id=3dfc971d0f8ef3d47b3423b16db75e1b1d493e2cb8e0e28a8c56de48bbba5e9c&url=https://www.youtube.com/watch?v=7t885JG9qNE&downloadType=video&action=add`;
  try {
    // PUT REQUEST
    return await got.put(apiURL).json();
    // return await got(apiURL).json();
  } catch (error) {
    console.log('error', error);
  }
  return null;
}
