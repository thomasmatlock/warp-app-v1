////////////////////////////////////////////////////////////////////////////////////
// https://stackoverflow.com/questions/48327559/save-async-await-response-on-a-variable

///////////////////////////////////////////
// 1) Return something from your asyncExample function

// const asyncExample = async () => {
//   const result = await axios(users)

//   return result
// }
///////////////////////////////////////////
// 2) Call that function and handle its returned Promise:

// ;(async () => {
//   const users = await asyncExample()
//   console.log(users)
// })()

//   let whatever;
//   (async () => {
//       whatever = await asyncFunction();
//       console.log(whatever);
// })();

// const asyncFunction = async () => {
//     const result = await storage.load();
//     return result;
// };