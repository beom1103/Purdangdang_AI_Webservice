import axios from 'axios';
import { selector } from 'recoil';

//기본 api
export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { 'Content-Type': `application/json` },
});

//로그인을 확인하는 API
export const validLogin = selector({
  key: 'validLogin',
  get: async () => {
    try {
      const response = await api.get('');
      return response;
    } catch (e) {
      return false;
    }
  },
});
