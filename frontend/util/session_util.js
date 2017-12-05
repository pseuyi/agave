import { Map, List } from 'immutable';

export const setUserLocalStorage = (data) => {
  const user = data.entities.users[data.result.users[0]];
  const userJSON = JSON.stringify(user);
  localStorage.setItem('currentUser', userJSON);
};

export const removeUserLocalStorage = () => {
  delete localStorage.currentUser;
};

export const getPreloadedState = () => {
  if (localStorage.currentUser) {
    const data = JSON.parse(localStorage['currentUser']);

    return {
      session: {
        currentUser: parseInt(data.id, 10),
      },
      users: {
        usersByIds: Map({ [data.id]: data }),
        ids: List([data.id]),
      },
    };

  } else {
    return {};
  }
};
