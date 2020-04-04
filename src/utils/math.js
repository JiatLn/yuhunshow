function cartesian(arr) {
  if (arr.length < 2) return arr[0] || [];
  return [].reduce.call(arr, function(col, set) {
    let res = [];
    col.forEach(c => {
      set.forEach(s => {
        let t = [].concat(Array.isArray(c) ? c : [c]);
        t.push(s);
        res.push(t);
      });
    });
    return res;
  });
}

export default cartesian;
