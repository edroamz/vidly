export function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    let varA = undefined;
    let varB = undefined;

    if (key.includes('.')) {
      // Path
      const pathArr = key.split('.');
      varA = getNestedObject(a, pathArr);
      varB = getNestedObject(b, pathArr);
    } else {
      // key
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
      varA = a[key];
      varB = b[key];
    }

    const valueA = typeof varA === 'string' ? varA.toUpperCase() : varA;
    const valueB = typeof varB === 'string' ? varB.toUpperCase() : varB;

    let comparison = 0;
    if (valueA > valueB) {
      comparison = 1;
    } else if (valueA < valueB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };
}

const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
    nestedObj
  );
};
