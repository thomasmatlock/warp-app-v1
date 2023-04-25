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
  // 'https://warpdownload.com/api/v1/user?machine_id=3dfc971d0f8ef3d47b3423b16db75e1b1d493e2cb8e0e28a8c56de48bbba5e9c&email=alice@prisma.io&moduleType=all&moduleEdition=personal&action=upgrade'
  const apiURL = `${baseURL}?machine_id=${machineID}&email=${email}&moduleType=${moduleType}&moduleEdition=${moduleEdition}&action=${action}`;
  // const apiURL = `${baseURL}?machine_id=${machineID}&quantity=${quantity}`;
  try {
    // return await got(apiURL).json();
    return await got.put(apiURL).json();
  } catch (error) {
    console.log('error', error);
  }
  return null;
}
