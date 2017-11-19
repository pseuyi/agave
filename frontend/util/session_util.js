
export const setUserLocalStorage = (data) => {
  const user = data.entities.users[data.result.users[0]];
  const userJSON = JSON.stringify(user);
  localStorage.setItem('currentUser', userJSON);
}

export const removeUserLocalStorage = () => {
  delete localStorage['currentUser'];
}

export const getPreloadedState = () => {
  if (localStorage['currentUser']) {
    const data = JSON.parse(localStorage['currentUser']);

    return {
      session: {
        currentUser: parseInt(data.id)
      },
      users: {
        usersByIds: {
          [data.id]: data
        },
        ids: [data.id]
      }
    };

  } else {
    return {};
  }
}
