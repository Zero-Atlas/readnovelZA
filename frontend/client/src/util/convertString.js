export function urlToName(str) {
  const regex=/[a-z]/
  return str.split("-").map((val) => {
    if (regex.test(val[0])) {
      return val[0].toUpperCase() + val.slice(1, val.length);
    } else return val;
  }).join(' ');
}
