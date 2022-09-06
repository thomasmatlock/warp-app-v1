import { v4 as uuidv4 } from 'uuid';
export default function generateAuthCode(
  moduleType: string,
  moduleEdition: string
) {
  console.log('generating auth code', moduleType);
  let typePrefix: string;
  if (moduleType === 'audio') typePrefix = 'a';
  if (moduleType === 'video') typePrefix = 'v';
  if (moduleType === 'warpstagram') typePrefix = 'w';
  let editionPrefix: string;
  if (moduleEdition === 'free') editionPrefix = '0';
  if (moduleEdition === 'personal') editionPrefix = '1';
  if (moduleEdition === 'professional') editionPrefix = '2';

  const segment1 = uuidv4().slice(0, 4);
  const segment2 = uuidv4().slice(0, 5);
  const segment3 = uuidv4().slice(0, 5);
  const authCode =
    typePrefix + editionPrefix + segment1 + '-' + segment2 + '-' + segment3;
  return authCode;
}
