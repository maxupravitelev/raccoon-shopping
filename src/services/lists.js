import axios from 'axios'


// testing with local backend
// const baseUrl = 'http://localhost:3001/api/lists/'

// testing with remote backend
const baseUrl = 'https://shopping-assistant-json-server.herokuapp.com/api/lists/'

// production version 
// const baseUrl = '/api/lists/'


const getAll = (listId) => {
    const request = axios.get(baseUrl + listId)
    return request.then(response => response.data)
  }
  

  const newItemUrl = 'https://shopping-assistant-json-server.herokuapp.com/api/new-item'
  // const newItemUrl = 'http://localhost:3001/api/new-item'


  const create = newObject => {
    const request = axios.post(newItemUrl, newObject)
    // console.log(newObject)
    return request.then(response => response.data)
  }
  
  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

  const itemUrl = 'https://shopping-assistant-json-server.herokuapp.com/api/items'

  const remove = (id) => {
    const request = axios.delete(`${itemUrl}/${id}`)
    return request.then(response => response.data)
  }


export default { 
  getAll: getAll, 
  create: create,
  update: update,
  remove: remove 
}

