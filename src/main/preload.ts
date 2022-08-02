import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
ipcRenderer.on('SET_SOURCE', async (event, sourceId) => {
  // console.log(sourceId);
  // try {
  //   const stream = await navigator.mediaDevices.getUserMedia({
  //     audio: false,
  //     video: {
  //       mandatory: {
  //         chromeMediaSource: 'desktop',
  //         chromeMediaSourceId: sourceId,
  //         minWidth: 1280,
  //         maxWidth: 1280,
  //         minHeight: 720,
  //         maxHeight: 720,
  //       },
  //     },
  //   });
  //   handleStream(stream);
  // } catch (e) {
  //   handleError(e);
  // }
});

function handleStream(stream) {
  const video = document.querySelector('video');
  video.srcObject = stream;
  video.onloadedmetadata = (e) => video.play();
}

function handleError(e) {
  console.log(e);
}
