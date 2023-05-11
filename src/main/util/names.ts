const names = [
  'Tommy Shelby',
  'Tyrion Lannister',
  'John Wick',
  // 'Bilbo Baggins',
];
export const generateRandomName = () => {
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
};
