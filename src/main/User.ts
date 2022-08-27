const Store = require('electron-store');
const settings = new Store();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('user');

const userDefaults = {
  isEULAaccepted: false,
  audio: 'free',
  video: 'free',
  warpstagram: 'free',
  audioAuthCode: '',
  videoAuthCode: '',
  warpstagramAuthCode: '',
};

function encryptUser(obj) {
  let newObj = { ...obj };
  for (const key in obj) {
    newObj[key] = cryptr.encrypt(obj[key]);
  }
  return newObj;
}
function decryptUser(obj) {
  let newObj = { ...obj };
  for (const key in obj) {
    newObj[key] = cryptr.decrypt(obj[key]);
  }
  return newObj;
}
function setUser(user: any) {
  let encryptedUser = encryptUser(user);
  settings.set('user', encryptedUser);
}
function resetUser() {
  settings.delete('user');
}
function upgradeUserModule(moduleType: string, moduleEdition: string) {
  // console.log(moduleType, moduleEdition);
  let decryptedUser = getUser();
  let updatedUser = { ...decryptedUser };
  for (const key in updatedUser) {
    if (moduleType.includes(key)) {
      updatedUser[key] = moduleEdition;
    }
  }
  setUser(updatedUser);
  // console.log(updatedUser);
  return updatedUser;
}
export function getUser() {
  // resetUser(); // REMOVE, FOR TESTING ONLY
  let encryptedUser = settings.get('user');
  if (encryptedUser === undefined) {
    setUser(userDefaults);
    return userDefaults;
  } else {
    encryptedUser = settings.get('user');
    // console.log(encryptedUser);
    let decryptedUser = decryptUser(encryptedUser);
    return decryptedUser;
  }
}

module.exports = {
  getUser: getUser,
  setUser: setUser,
  upgradeUserModule: upgradeUserModule,
  resetUser: resetUser,
};
