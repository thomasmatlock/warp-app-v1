import APIVariables from './API Variables';

export default function getStatus() {
  return fetch(APIVariables.statusEndpoint)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}
