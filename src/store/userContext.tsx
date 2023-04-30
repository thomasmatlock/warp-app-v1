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

  const [audioDownloadsCount, setAudioDownloadsCount] = useState(
    downloadsCtx.downloadsAudio.length
  );
  const [videoDownloadsCount, setVideoDownloadsCount] = useState(
    downloadsCtx.downloadsVideo.length
  );
  useEffect(() => {
    // console.log('UserContextProvider time to rerender');
    // console.log(downloadsCtx.downloadsAudio);
    // console.log(downloadsCtx.downloadsVideo);

    setAudioDownloadsCount(downloadsCtx.downloadsAudio.length);
    setVideoDownloadsCount(downloadsCtx.downloadsVideo.length);
  }, [downloadsCtx]);
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
      title: `${15 - audioDownloadsCount} daily audio downloads remaining`,
      subtitle: `${randomVerb} a few ${randomDollarSyn} on yourself for a lifetime License to get unlimited audio downloads, multiple formats, multiple simultaneous downloads, multiple simultaneous format conversion, and more `,
      ctaImage: iconLicenses,
      ctaText: randomAudioCta,
    },
  ];
  const videoDownloadsActivationArr = [
    {
      id: 'activateVideo',
      title: `${15 - videoDownloadsCount} daily video downloads remaining`,
      // subtitle: 'subtitle for more',
      subtitle: `${randomVerb} a few ${randomDollarSyn} for a lifetime License for unlimited video downloads, UHD resolutions, simultaneous downloads, multiple simultaneous format conversion, and more`,
      ctaImage: iconLicenses,
      ctaText: randomVideoCta,
    },
  ];
  return (
    <UserContext.Provider
      value={{
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
