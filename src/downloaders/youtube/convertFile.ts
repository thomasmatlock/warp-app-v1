// export default function  convertFile (file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const arrayBuffer = reader.result;
//       const blob = new Blob([arrayBuffer], { type: file.type });
//       const url = URL.createObjectURL(blob);
//       resolve(url);
//     };
//     reader.readAsArrayBuffer(file);
//   }).catch(reject);
// }
