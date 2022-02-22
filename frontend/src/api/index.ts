import axios, { AxiosInstance } from 'axios';
import { selector } from 'recoil';
import { LoginType, RegisterType } from '../store/type';

const token = localStorage.getItem('token');

//기본 api
const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { 'Content-Type': `application/json` },
});

// const api: AxiosInstance = instance.create({
//   headers: {
//     Authorization: `Token ${token}`,
//   },
// });

//로그인 요청
export const login = async (data: LoginType): Promise<boolean> => {
  try {
    const response = await instance.post('api/auth/login/', data);
    const token = response.data['token'];
    localStorage.setItem('token', token);
    window.location.replace('/');
    return true;
  } catch (error) {
    alert('아이디와 비밀번호를 확인해주세요.');
    return false;
  }
};

// 회원가입 요청
export const registerAccount = async (data: RegisterType): Promise<boolean> => {
  try {
    await instance.post('api/auth/register/', data);
    alert('회원가입에 성공하였습니다.');
    window.location.replace('/account');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//로그인을 확인하는 API
export const validLogin = selector({
  key: 'validLogin',
  get: async () => {
    try {
      const response = await instance.get('api/auth/user/');
      return response;
    } catch (e) {
      return false;
    }
  },
});
