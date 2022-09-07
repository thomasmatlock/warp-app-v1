import { v4 as uuidv4 } from 'uuid';
function generateTypePrefix(moduleType: string) {
  let typePrefix: string;
  if (moduleType === 'audio') typePrefix = 'a';
  if (moduleType === 'video') typePrefix = 'v';
  if (moduleType === 'warpstagram') typePrefix = 'w';
  return typePrefix;
}
function generateEditionPrefix(moduleEdition: string) {
  let editionPrefix: string;
  if (moduleEdition === 'free') editionPrefix = '0';
  if (moduleEdition === 'personal') editionPrefix = '1';
  if (moduleEdition === 'professional') editionPrefix = '2';
  if (moduleEdition.toLowerCase().includes('dev')) editionPrefix = '3';
  return editionPrefix;
}
export default function generateAuthCode(
  moduleType: string,
  moduleEdition: string
) {
  const typePrefix = generateTypePrefix(moduleType);
  const editionPrefix = generateEditionPrefix(moduleEdition);

  const segment1 = uuidv4().slice(0, 4);
  const segment2 = uuidv4().slice(0, 5);
  const segment3 = uuidv4().slice(0, 5);
  let authCode =
    typePrefix + editionPrefix + segment1 + '-' + segment2 + '-' + segment3;
  // console.log(authCode);
  if (moduleEdition === 'free') {
    return '';
  } else {
    return authCode;
  }
}
