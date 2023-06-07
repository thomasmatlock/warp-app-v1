export function f1() {
  console.log('f1');
}
export function f2() {
  console.log('f2');
}
// export async function submitSearchQuery(currentURL: string, query: string) {
//   // let joinedQuery: string;
//   const joinedQuery = await BrowserQuery(currentURL, query);
//   // console.log(joinedQuery);
//   if (view) view.webContents.loadURL(joinedQuery);
// }
module.exports = {
  f1,
  f2,
};
