import { app, powerMonitor } from 'electron';
export default function PowerMonitor() {
  powerMonitor
    .on('resume', () => {
      console.log('resume');
    })
    .on('suspend', () => {
      console.log('suspend');
    })
    .on('on-ac', () => {
      console.log('on-ac');
    })
    .on('on-battery', () => {
      console.log('on-battery');
    })
    .on('lock-screen', () => {
      console.log('lock-screen');
    })
    .on('unlock-screen', () => {
      console.log('unlock-screen');
    })
    .on('shutdown', (e) => {
      console.log('shutdown');
      e.preventDefault();
      app.quit();
    })
    .on('user-did-become-active', () => {
      console.log('user-did-become-active');
    })
    .on('user-did-resign-active', () => {
      console.log('user-did-resign-active');
    });
}
