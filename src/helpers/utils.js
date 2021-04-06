export function formatDate(dateStr = "") {
  return dateStr.slice(0, 10);
}

export function textCutter(str, letterCount) {
  return str.length < letterCount ? str : str.slice(0, letterCount) + "...";
}

