import React, { useState, useEffect, useContext } from 'react';
// import iconLicenses from '../../../assets/Modals/settings/shuttle.svg';
import iconLicenses from '../renderer/Global/rocket.svg';
import DownloadsContext from './downloadsContext';

const dollarsSynArray = ['bucks', 'rupees'];
const randomDollarSyn =
  dollarsSynArray[Math.floor(Math.random() * dollarsSynArray.length)];
const verbsArray = ['Spend', 'Invest'];
const randomVerb = verbsArray[Math.floor(Math.random() * verbsArray.length)];
const directObjectArr = ['yourself', 'your workflow'];
const randomDirectObject =
  directObjectArr[Math.floor(Math.random() * directObjectArr.length)];
// CTA TEXT

const audioCtaArr = [
  // 'Activate',
  'I need unlimited audio downloads',
  'I need simultaneous audio downloads',
  'I need simultaneous audio conversion',
];
const randomAudioCta =
  audioCtaArr[Math.floor(Math.random() * audioCtaArr.length)];
const videoCtaArr = [
  // 'Activate',
  'I need unlimited video downloads',
  'I need simultaneous video downloads',
  'I need simultaneous video conversion',
];
const randomVideoCta =
  videoCtaArr[Math.floor(Math.random() * videoCtaArr.length)];

const UserContext = React.createContext({
  user: {
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
  },
  audioDownloadsLocked: false,
  videoDownloadsLocked: false,

  audioDownloadsActivationArr: [
    {
      id: 'activateAudio',
      title: '15 daily audio downloads remaining',
      subtitle: `${randomVerb} a few ${randomDollarSyn} on yourself for a lifetime License to get unlimited audio downloads, multiple formats, multiple simultaneous downloads, multiple simultaneous format conversion, and more `,
      ctaImage: iconLicenses,
      ctaText: randomAudioCta,
    },
  ],
  videoDownloadsActivationArr: [
    {
      id: 'activateVideo',
      title: '15 daily video downloads remaining',
      subtitle: `${randomVerb} a few ${randomDollarSyn} for a lifetime License for unlimited video downloads, UHD resolutions, simultaneous downloads, multiple simultaneous format conversion, and more`,
      ctaImage: iconLicenses,
      ctaText: randomVideoCta,
    },
  ],
  // getID: () => {},
});

export const UserContextProvider = (props) => {
  const downloadsCtx = useContext(DownloadsContext);

  // console.log(downloadsCtx);
  const [user, setUser] = useState({
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
  });
  const [audioFreeDownloadsMax, setAudioFreeDownloadsMax] = useState(15);
  const [videoFreeDownloadsMax, setVideoFreeDownloadsMax] = useState(15);
  const [audioDownloadsCount, setAudioDownloadsCount] = useState(
    downloadsCtx.downloadsVideo.length
  );
  const [videoDownloadsCount, setVideoDownloadsCount] = useState(
    downloadsCtx.downloadsVideo.length
  );
  const [serverDownloads, setServerDownloads] = useState({
    audio: [],
    video: [],
  });
  const [audioDownloadsLocked, setAudioDownloadsLocked] = useState(false);
  const [videoDownloadsLocked, setVideoDownloadsLocked] = useState(false);
  useEffect(() => {
    setAudioDownloadsCount(serverDownloads.audio.length);
    setVideoDownloadsCount(serverDownloads.video.length);
    setServerDownloads(serverDownloads);
  }, [downloadsCtx, serverDownloads]);
  function lockAudioDownloads() {
    if (serverDownloads.audio.length >= audioFreeDownloadsMax) {
      setAudioDownloadsLocked(true);
    }
  }
  function lockVideoDownloads() {
    if (serverDownloads.video.length >= videoFreeDownloadsMax) {
      setVideoDownloadsLocked(true);
    }
  }
  window.electron.ipcRenderer.on('global', (arg) => {
    console.log(arg);

    //  serverDownloads = arg.serverDownloads;
    setServerDownloads(arg.serverDownloads);
    setUser(arg.user);

    // console.log(serverDownloads);
  });
  // let dollarsSynArray = ['bucks', 'rupees'];
  // let randomDollarSyn =
  //   dollarsSynArray[Math.floor(Math.random() * dollarsSynArray.length)];
  // let verbsArray = ['Spend', 'Invest'];
  // let randomVerb = verbsArray[Math.floor(Math.random() * verbsArray.length)];
  // let directObjectArr = ['yourself', 'your workflow'];
  // let randomDirectObject =
  //   directObjectArr[Math.floor(Math.random() * directObjectArr.length)];
  const audioDownloadsActivationArr = [
    {
      id: 'activateAudio',
      title: `${
        audioFreeDownloadsMax - serverDownloads.audio.length
      } daily audio downloads remaining`,
      subtitle: `${randomVerb} a few ${randomDollarSyn} on yourself for a lifetime License to get unlimited audio downloads, multiple formats, multiple simultaneous downloads, multiple simultaneous format conversion, and more `,
      ctaImage: iconLicenses,
      ctaText: randomAudioCta,
    },
  ];
  const videoDownloadsActivationArr = [
    {
      id: 'activateVideo',
      title: `${
        videoFreeDownloadsMax - serverDownloads.video.length
      } daily video downloads remaining`,
      // subtitle: 'subtitle for more',
      subtitle: `${randomVerb} a few ${randomDollarSyn} for a lifetime License for unlimited video downloads, UHD resolutions, simultaneous downloads, multiple simultaneous format conversion, and more`,
      ctaImage: iconLicenses,
      ctaText: randomVideoCta,
    },
  ];
  return (
    <UserContext.Provider
      value={{
        user,
        audioDownloadsLocked,
        videoDownloadsLocked,
        audioDownloadsActivationArr,
        videoDownloadsActivationArr,
        // getID: getID,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
