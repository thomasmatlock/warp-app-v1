import React, { useState, useEffect, useContext } from 'react';
// import iconLicenses from '../../../assets/Modals/settings/shuttle.svg';
import iconLicenses from '../../assets/Modals/settings/shuttle.svg';
import DownloadsContext from './downloadsContext';

let dollarsSynArray = ['bucks', 'rupees'];
let randomDollarSyn =
  dollarsSynArray[Math.floor(Math.random() * dollarsSynArray.length)];
let verbsArray = ['Spend', 'Invest'];
let randomVerb = verbsArray[Math.floor(Math.random() * verbsArray.length)];
let directObjectArr = ['yourself', 'your workflow'];
let randomDirectObject =
  directObjectArr[Math.floor(Math.random() * directObjectArr.length)];
// CTA TEXT
let audioCtaArr = ['Activate', 'I need unlimited audio downloads'];
let randomAudioCta =
  audioCtaArr[Math.floor(Math.random() * audioCtaArr.length)];
let videoCtaArr = ['Activate', 'I need unlimited video downloads'];
let randomVideoCta =
  videoCtaArr[Math.floor(Math.random() * videoCtaArr.length)];

const UserContext = React.createContext({
  audioDownloadsActivationArr: [],
  videoDownloadsActivationArr: [],
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
    console.log('UserContextProvider time to rerender');
    console.log(downloadsCtx.downloadsAudio);
    console.log(downloadsCtx.downloadsVideo);

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
  let audioDownloadsActivationArr = [
    {
      id: '1',
      title: 15 - audioDownloadsCount + ' daily audio downloads remaining',
      subtitle: `${randomVerb} a few ${randomDollarSyn} on yourself for a Personal or Professional License for unlimited audio downloads and more `,
      ctaImage: iconLicenses,
      ctaText: randomAudioCta,
    },
  ];
  let videoDownloadsActivationArr = [
    {
      id: '1',
      title: 15 - videoDownloadsCount + ' daily video downloads remaining',
      // subtitle: 'subtitle for more',
      subtitle: `${randomVerb} a few ${randomDollarSyn} for a Personal or Professional License for unlimited video downloads, UHD resolutions, and more`,
      ctaImage: iconLicenses,
      ctaText: randomVideoCta,
    },
  ];
  return (
    <UserContext.Provider
      value={{
        audioDownloadsActivationArr: audioDownloadsActivationArr,
        videoDownloadsActivationArr: videoDownloadsActivationArr,
        // getID: getID,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
