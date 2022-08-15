const Sort = {
  // arr.sort((a, b) => {
  //   let fa = a.title.toLowerCase(),
  //     fb = b.title.toLowerCase();

  //   if (fa < fb) {
  //     return -1;
  //   }
  //   if (fa > fb) {
  //     return 1;
  //   }
  //   return 0;
  // })
  // .reverse()

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
};

export default Sort;
