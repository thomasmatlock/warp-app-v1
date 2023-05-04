/* eslint-disable no-console */
import got from 'got';
import chalk from 'chalk';
import os from 'os';
import { machineId } from 'node-machine-id';
import APIVariables from './API Variables';

// import Logo from 'renderer/components/Logo/Logo';

export default async function getUser() {
  const userFromDB: object = {
    id: '',
    audio: 'free',
    video: 'free',
    warpstagram: 'free',
    audioAuthCode: '',
    videoAuthCode: '',
    warpstagramAuthCode: '',
    email: null,
    createdAt: '',
    updatedAt: '',
  };
  const machineID = await machineId();
  const hostname = os.hostname();
  const platform = os.platform();
  const type = os.type();
  const release = os.release();
  const apiURL = `${APIVariables.userEndpoint}?machine_id=${machineID}&hostname=${hostname}&platform=${platform}&type=${type}&release=${release}`;

  try {
    return (await got(apiURL).json()) as object;
  } catch (error) {
    console.log(chalk.bgRedBright('cannot retrieve USER from server'));
    return userFromDB as object;
  }
}
