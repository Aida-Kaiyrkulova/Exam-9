import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://financeapp-9a8fe-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;