import axios from 'axios'

let baseURL = 'http://localhost:8000/api/blog'

if (process.env.NODE_ENV == 'production') {
  baseURL = 'https://liuxiaoer.club/api/blog'
}

axios.defaults.baseURL = baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default axios
