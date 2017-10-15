export const setUserLocalStorage = (user) => {
  const userJSON = JSON.stringify(user);
  localStorage.setItem('currentUser', userJSON);
}

export const removeUserLocalStorage = () => {
  delete localStorage['currentUser'];
}
