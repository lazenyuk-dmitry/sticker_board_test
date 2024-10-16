export function setItem(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function removeItem(key) {
  localStorage.removeItem(key);
}