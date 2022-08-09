// import { Fragment } from 'react';
// import './RenameThis.scss';
const Sort = {
  byAZ: (arr, propertyToSortBy) => {
    arr.sort((a, b) => {
      if (a[propertyToSortBy] < b[propertyToSortBy]) {
        return -1;
      }
      if (a[propertyToSortBy] > b[propertyToSortBy]) {
        return 1;
      }
      return 0;
    }),
      console.log(arr);
  },
  byZA: (arr, propertyToSortBy) => {
    arr.sort((a, b) => {
      if (a[propertyToSortBy] > b[propertyToSortBy]) {
        return -1;
      }
      if (a[propertyToSortBy] < b[propertyToSortBy]) {
        return 1;
      }
      return 0;
    }),
      console.log(arr);
  },
};

export default Sort;
