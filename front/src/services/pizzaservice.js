//Axios moduuli tietokanta kommunikaatiota varten
import axios from 'axios'
const baseUrl = 'http://localhost:3010/api'

//Alkulistauksen haku, eli haetaan kaikki menussa olevat pitsat
const getAll = () => {
    return axios.get(`${baseUrl}/menu`)
  }
//Uuden tilauksen luonti
const create = newObject => {
   return axios.post(`${baseUrl}/orders`, newObject)
}
//Haetaan kaikki tilaukset
const getOrders = () =>{
  return axios.get(`${baseUrl}/orders`)
}
//Poistetaan tilaus IDn perusteella
const del = (id) => {
  return axios.delete(`${baseUrl}/orders/${id}`)
}
  export default {getAll, create, getOrders, del}