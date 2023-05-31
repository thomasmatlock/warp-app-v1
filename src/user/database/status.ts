import got from 'got';
import chalk from 'chalk';

import APIVariables from './API Variables';

export default async function getStatus() {
  const status = {
    complete: [''],
    inProgress: ['Development status on server currently unreachable'],
    pending: [''],
  };
  const apiURL = `${APIVariables.statusEndpoint}`;

  try {
    return (await got(apiURL).json()) as object;
  } catch (error) {
    console.log(chalk.bgRedBright('cannot retrieve STATUS from server'));
    return status as object;
  }
}
