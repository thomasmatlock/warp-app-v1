const Downloader = require('nodejs-file-downloader');

const windowsBinaryURL =
  'https://github.com/thomasmatlock/ffmpeg-binaries/raw/main/win32-x64/ffmpeg.exe'; // windows binary URL
const macM1BinaryURL =
  'https://github.com/thomasmatlock/ffmpeg-binaries/raw/main/darwin-arm64/ffmpeg'; // mac arm64 binary URL
const macIntelBinaryURL =
  'https://github.com/thomasmatlock/ffmpeg-binaries/raw/main/darwin-x64/ffmpeg'; // mac x64 binary URL

export default async function downloadFFMPEGbinary(binaryPath: string) {
  const downloader = new Downloader({
    url: windowsBinaryURL,
    directory: binaryPath,
  });
  try {
    const { filePath, downloadStatus } = await downloader.download();
  } catch (error) {
    console.log('Download failed', error);
  }
}
