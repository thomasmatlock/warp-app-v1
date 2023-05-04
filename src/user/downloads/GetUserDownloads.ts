/* eslint-disable no-console */
import got from 'got';
import chalk from 'chalk';
import { machineId } from 'node-machine-id';
import APIVariables from '../API Variables';

export default async function GetUserDownloads() {
  const userDownloads: object = {
    audio: [],
    video: [],
  };
  const machineID = await machineId();
  const apiURL = `${APIVariables.downloadsEndpoint}?machine_id=${machineID}`;
  try {
    return (await got(apiURL).json()) as object;
  } catch (error) {
    console.log(chalk.bgRedBright('cannot retrieve DOWNLOADS from server'));
    return userDownloads as object;
  }
}
