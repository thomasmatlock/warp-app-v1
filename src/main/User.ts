const Store = require('electron-store');
const settings = new Store();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('user');

const userDefaults = {
  audio: 'free',
  video: 'free',
  warpstagram: 'free',
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
const setUser = (user: any) => {
  let encryptedUser = encryptUser(user);
  settings.set('user', encryptedUser);
};
const resetUser = () => {
  // settings.delete('user');
};

export function getUser() {
  resetUser(); // REMOVE, FOR TESTING ONLY
  let encryptedUser = settings.get('user');
  if (encryptedUser === undefined) {
    setUser(userDefaults);
    return userDefaults;
  } else {
    encryptedUser = settings.get('user');
    console.log(encryptedUser);
    let decryptedUser = decryptUser(encryptedUser);
    return decryptedUser;
  }
}

module.exports = {
  getUser: getUser,
  setUser: setUser,
};
