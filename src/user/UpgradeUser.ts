/* eslint-disable no-console */
import got from 'got';
import { machineId } from 'node-machine-id';

export default async function GetUserDownloads(
  email: string,
  moduleType: string,
  moduleEdition: string,
  action: string
) {
  const baseURL = 'https://warpdownload.com/api/v1/user';

  const machineID = await machineId();
  // 'https://warpdownload.com/api/v1/user?machine_id=426e55fe-bfaf-4f5e-9181-edb84acef538&email=alice@prisma.io&moduleType=all&moduleEdition=personal&action=upgrade'
  const apiURL = `${baseURL}?machine_id=${machineID}&url=${url}&downloadType=${downloadType}&action=${action}`;
  // const apiURL = `${baseURL}?machine_id=${machineID}&quantity=${quantity}`;
  try {
    return await got(apiURL).json();
  } catch (error) {
    console.log('error', error);
  }
  return null;
}
