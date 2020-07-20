import axios from 'axios'

// const baseUrl = 'http://localhost:3001/api/lists'
const baseUrl = 'https://shopping-assistant-json-server.herokuapp.com/lists/'
// const baseUrl = '/api/lists'


const getAll = (listId) => {
    const request = axios.get(baseUrl + listId)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  
  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}

