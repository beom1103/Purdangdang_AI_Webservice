import axios, { AxiosInstance } from 'axios';
import { LoginType, RegisterType, User } from '../store/type';

const token = localStorage.getItem('token');

//기본 api
export const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { 'Content-Type': `application/json` },
});

const athentication: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { Authorization: `Token ${token}` },
});

// api.interceptors.request.use((config: any) => {
//   const token = localStorage.get('token');
//   if (token != null) {
//     config.headers.Authorization = `Token ${token}`;
//   }
// });

//로그인 요청
export const login = async (login: LoginType): Promise<boolean> => {
  try {
    const { data } = await api.post('api/auth/login/', login);
    console.log(data);
    const token = data['token'];
    localStorage.setItem('token', token);
    window.location.replace('/');
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
    await api.post('api/auth/register/', register);
    alert('회원가입에 성공하였습니다.');
    window.location.replace('/account');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//로그인을 확인하는 API
export const validLogin = async (): Promise<User | any> => {
  try {
    const { data } = await athentication.get('api/auth/user/');
    console.log(data);
    return data;
  } catch (error) {
    return false;
  }
};

//로그아웃
export const logout = async (): Promise<boolean> => {
  try {
    await athentication.post('api/authlogout/');
    localStorage.clear();
    window.location.replace('/');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
