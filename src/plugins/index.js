import axios from 'axios'

const axiosConfig = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5'
})

export default axiosConfig