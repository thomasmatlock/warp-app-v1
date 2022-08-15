const Sort = {
  byAZ: (arr, propertyToSortBy) => {
    arr.sort((a, b) => {
      let fa = a[propertyToSortBy].toLowerCase(),
        fb = b[propertyToSortBy].toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    // .reverse();
    // console.log(arr);
    return arr;
  },
  byZA: (arr, propertyToSortBy) => {
    arr
      .sort((a, b) => {
        let fa = a[propertyToSortBy].toLowerCase(),
          fb = b[propertyToSortBy].toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      })
      .reverse();
    // console.log(arr);
    return arr;
  },
  byDateOldToNew: (arr, propertyToSortBy) => {
    arr.sort((a, b) => {
      let fa = new Date(a[propertyToSortBy]),
        fb = new Date(b[propertyToSortBy]);

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    // .reverse();
    // console.log(arr);
    return arr;
  },
  byDateNewToOld: (arr, propertyToSortBy) => {
    arr
      .sort((a, b) => {
        let fa = new Date(a[propertyToSortBy]),
          fb = new Date(b[propertyToSortBy]);

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      })
      .reverse();
    // console.log(arr);
    return arr;
  },
};

export default Sort;
