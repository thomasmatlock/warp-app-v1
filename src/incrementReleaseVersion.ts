// get package.json version and increment the release version
// and write it back to package.json
// Usage: node incrementReleaseVersion.js
import * as fs from 'fs';

exports.default = async function incrementReleaseVersion() {
  console.log('Incrementing release version');

  const packageJson = JSON.parse(
    fs.readFileSync('release/app/package.json', 'utf8')
  );
  const { version } = packageJson.version;
  console.log(`Current version is ${version}`);

  // const versionParts = version.split('.');
  // versionParts[2] = (parseInt(versionParts[2]) + 1).toString();
  // const newVersion = versionParts.join('.');
  // packageJson.version = newVersion;
  // fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  // console.log(`Incremented version from ${version} to ${newVersion}`);
};
