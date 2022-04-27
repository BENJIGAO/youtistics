export const nFormatter = (
  numString: string | undefined,
  digits: number
): string => {
  if (numString === undefined) {
    return "ERROR";
  }

  const num = parseFloat(numString);
  const lookup = [
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" },
    { value: 1, symbol: "" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().find((item) => {
    return num >= item.value;
  });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

export const isObjEmpty = (obj: Object): boolean => {
  return Object.keys(obj).length === 0;
};
