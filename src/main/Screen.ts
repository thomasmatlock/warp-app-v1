import { screen } from 'electron';
export default function Screen() {
  // console.log('screen: ');
  let display = screen.getAllDisplays()[0].workArea;
  console.log(display);
}
