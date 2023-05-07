/* eslint-disable radix */
/* eslint-disable prefer-destructuring */
import fs from 'fs';
import chalk from 'chalk';

(async () => {
  const packageJson = await JSON.parse(
    fs.readFileSync('release/app/package.json', 'utf8')
  );
  const version = packageJson.version; // gets the version from package.json
  const versionParts = version.split('.'); // splits the version into an array of parts e.g. 1.2.3 => [1, 2, 3]
  versionParts[2] = (parseInt(versionParts[2]) + 1).toString();
  const newVersion = versionParts.join('.'); // joins the version parts back into a string e.g. [1, 2, 3] => 1.2.3
  packageJson.version = newVersion; // sets the new version
  fs.writeFileSync(
    'release/app/package.json',
    JSON.stringify(packageJson, null, 2)
  );
  console.log(
    `Incremented version from ${chalk.bgYellow(version)} to ${chalk.bgGreen(
      newVersion
    )}`
  );
})();
