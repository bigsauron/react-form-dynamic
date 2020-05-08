export default (classes) => {
  const ret = [];
  if (Array.isArray(classes)) {
    for (let i = 0; i < classes.length; i++) {
      if (classes[i]) {
        ret.push(classes[i]);
      }
    }
  }
  return ret.join(' ');
};
