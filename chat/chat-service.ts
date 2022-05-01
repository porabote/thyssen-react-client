import Api from "@services";

export const getUsers = () => {
  return Api.get('/api/api-users/get/')
    .then((resp) => {
      return resp.data;
    });
}

export const setDialog = (selfId, userId) => {
  Api.post('/api/dialogs/method/createDialog/', {
    body: { selfId, userId }
  })
    .then((resp) => {
      // this.setState({
      //   users: resp.data,
      // })
    });
}

export const getDialogs = () => {
  Api.post('/api/dialogs/method/get/', {
    body: { selfId, userId }
  })
    .then((resp) => {
      return resp.data;
    });
}