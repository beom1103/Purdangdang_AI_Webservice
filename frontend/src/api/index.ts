import axios, { AxiosInstance } from 'axios';
import { selector } from 'recoil';
import { LoginType, RegisterType, User } from '../store/type';

const token = localStorage.getItem('token');

//기본 api
export const api: AxiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL:
    'http://elice-kdt-ai-3rd-team12.koreacentral.cloudapp.azure.com:5000/',
  headers: { 'Content-Type': `application/json` },
});

//헤더에 토큰 있는 api
export const athentication: AxiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL:
    'http://elice-kdt-ai-3rd-team12.koreacentral.cloudapp.azure.com:5000/',
  headers: { Authorization: `Token ${token}` },
});

//로그인 요청
export const login = async (login: LoginType): Promise<boolean> => {
  try {
    const { data } = await api.post('api/auth/login', login);
    console.log(data);
    const token = data['token'];
    setToken(token);
    redirect('/');
    return true;
  } catch (error) {
    alert('아이디와 비밀번호를 확인해주세요.');
    return false;
  }
};

// 회원가입 요청
export const registerAccount = async (
  register: RegisterType,
): Promise<boolean> => {
  try {
    await api.post('api/auth/register', register);
    alert('회원가입에 성공하였습니다.');
    redirect('/account');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//로그아웃
export const logout = async (): Promise<boolean> => {
  try {
    await athentication.post('api/auth/logout');
    clearToken();
    redirect('/');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//토큰검사
export const validLogin = selector({
  key: 'validLogin',
  get: async (): Promise<User | any> => {
    try {
      const { data } = await athentication.get('api/auth/user');
      return data;
    } catch (error) {
      return false;
    }
  },
});

const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

const clearToken = (): void => {
  localStorage.clear();
};

const redirect = (url: string): void => {
  window.location.replace(url);
};
