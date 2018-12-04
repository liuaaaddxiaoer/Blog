import axios from 'axios'

let baseURL = 'http://localhost:8000/api/blog'

if (process.env.NODE_ENV == 'production') {
  baseURL = 'http://39.107.237.236/api/blog'
}

axios.defaults.baseURL = baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default axios
