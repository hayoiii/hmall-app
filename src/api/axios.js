import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://7330783a-6855-47f8-9738-8a13ede3907d.mock.pstmn.io',
});

export default instance;
// http 통신 - 4 메소드
// GET, POST, PUT, DELETE, FETCH
