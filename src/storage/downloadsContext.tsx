import React, { useState, useEffect } from 'react';
const downloadsAudio = [
  {
    format: 'mp3',
    id: '1',
    length: '00:07:32',
    size: '7.8 MB',
    source: 'youtube',
    thumbnail: 'https://i3.ytimg.com/vi/06RlyZxUnVM/maxresdefault.jpg',
    title: 'The Beatles - Abbey Road',
    type: 'audio',
    url: 'https://www.youtube.com/watch?v=uq-_-RJt-E8',
  },
  {
    format: 'wav',
    id: '2',
    length: '00:54:32',
    size: '3.2 MB',
    source: 'vimeo',
    thumbnail: 'https://i3.ytimg.com/vi/OulXMB4W5B0/maxresdefault.jpg',
    title: 'The Wonder Years',
    type: 'audio',
    url: 'https://www.youtube.com/watch?v=uq-_-RJt-E8',
  },
  {
    format: 'ogg',
    id: '3',
    length: '00:01:32',
    size: '10.6 MB',
    source: 'youtube',
    thumbnail: 'https://i3.ytimg.com/vi/zZy0knYMxhQ/maxresdefault.jpg',
    title: 'The Lion, the Witch and the Wardrobe',
    type: 'audio',
    url: 'https://www.youtube.com/watch?v=uq-_-RJt-E8',
  },
  {
    format: 'm4a',
    id: '4',
    length: '00:01:32',
    size: '20.5 MB',
    source: 'soundcloud',
    thumbnail: 'https://i3.ytimg.com/vi/F02Y3C16Uwg/maxresdefault.jpg',
    title: 'The Lion, the Witch and the Wardrobe',
    type: 'audio',
    url: 'https://www.youtube.com/watch?v=uq-_-RJt-E8',
  },
];
const downloadsVideo = [
  {
    format: 'mp4',
    fps: 23.976,
    id: '1',
    length: '00:07:32',
    resolution: '720p',
    size: '33.2 MB',
    source: 'youtube',
    thumbnail: 'https://i3.ytimg.com/vi/zZy0knYMxhQ/maxresdefault.jpg',
    title: 'Peaky Blinders Season 7: The Movie',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=uq-_-RJt-E8',
  },
  {
    format: 'mov',
    fps: 59.976,
    id: '2',
    length: '00:54:32',
    resolution: '1080p',
    size: '9.9 MB',
    source: 'vimeo',
    thumbnail: 'https://i3.ytimg.com/vi/2nsT9uQPIrk/maxresdefault.jpg',
    title: 'The Wonder Years',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=2nsT9uQPIrk',
  },
  {
    format: 'mkv',
    fps: 60,
    id: '3',
    length: '00:01:32',
    resolution: '3840p',
    size: '1.2 MB',
    source: 'vimeo',
    thumbnail: 'https://i3.ytimg.com/vi/F02Y3C16Uwg/maxresdefault.jpg',
    title: 'The Lion, the Witch and the Wardrobe',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=uq-_-RJt-E8',
  },
];
const downloadsWarpstagram = {
  subscribed: [
    {
      // format: 'mkv',
      // fps: 60,
      id: '3',
      // length: '00:01:32',
      // resolution: '3840p',
      // size: '1.2 MB',
      // source: 'vimeo',
      // thumbnail: 'https://i3.ytimg.com/vi/F02Y3C16Uwg/maxresdefault.jpg',
      title: 'thedreamsetup',
      type: 'warpstagram',
      url: 'https://www.youtube.com/watch?v=uq-_-RJt-E8',
    },
    {
      // format: 'mkv',
      // fps: 60,
      id: '4',
      // length: '00:01:32',
      // resolution: '3840p',
      // size: '1.2 MB',
      // source: 'vimeo',
      // thumbnail: 'https://i3.ytimg.com/vi/F02Y3C16Uwg/maxresdefault.jpg',
      title: 'peakyblindersofficial',
      type: 'warpstagram',
      url: 'https://www.youtube.com/watch?v=uq-_-RJt-E8',
    },
  ],
  pinned: [],
};
const DownloadsContext = React.createContext({
  downloadsAudio: [],
  downloadsVideo: [],
  downloadsWarpstagram: {},
  getDownloadID: () => {},
});
const getDownloadID = (id) => {
  console.log(id);
};
export const DownloadsContextProvider = (props) => {
  return (
    <DownloadsContext.Provider
      value={{
        downloadsAudio: downloadsAudio,
        downloadsVideo: downloadsVideo,
        downloadsWarpstagram: downloadsWarpstagram,
        getDownloadID: getDownloadID,
      }}
    >
      {props.children}
    </DownloadsContext.Provider>
  );
};

export default DownloadsContext;
