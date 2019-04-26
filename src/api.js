const APIURL = '/api/tasks/';

export async function getTasks() {
  return fetch(APIURL)
    .then(res => {
      handleError(res);
      return res.json();
    });
}

export async function createTask(name, description, deadline) {
  return fetch(APIURL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({name: name, description: description, deadline: deadline})
  })
  .then(res => {
    handleError(res);
    return res.json();
  });
}

export async function removeTask(id) {
  const DELETEURL = APIURL + id;
  return fetch(DELETEURL, {
    method: 'delete'
  })
  .then(res => {
    handleError(res);
    return res.json();
  });
}

export async function updateStatus(id, newStatus) {
  const UPDATEURL = APIURL + id;
  return fetch(UPDATEURL, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({status: newStatus})
  })
  .then(res => {
    handleError(res);
    return res.json();
  });
}

export async function updateTask(id, newStatus, newName, newDescription) {
  const UPDATEURL = APIURL + id;
  return fetch(UPDATEURL, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({status: newStatus, name: newName, description: newDescription})
  })
  .then(res => {
    handleError(res);
    return res.json();
  });
}

function handleError(res) {
  if(!res.ok) {
    if(res.status >=400 && res.status < 500) {
      return res.json().then(data => {
        let err = {errorMessage: data.message};
        throw err;
      });
    } else {
      let err = {errorMessage: 'Please try again, server problems.'};
      throw err;
    }
  }
}