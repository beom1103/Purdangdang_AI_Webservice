import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { selector } from 'recoil';
import { LoginType, RegisterType } from '../store/type';

//기본 api
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { 'Content-Type': `application/json` },
});

//로그인 요청
export const login = async (data: LoginType): Promise<boolean> => {
  try {
    const response = await api.post('account/login', data);
    const token = response.data['foo'];
    localStorage.setItem('token', token);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// 회원가입 요청
export const registerAccount = async (data: RegisterType) => {
  try {
    await api.post('/account/accounts', data);
    alert('회원가입에 성공하였습니다.');
    // window.location.replace('/');
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
      const response = await api.get('여기에 토큰 검사 url들어가야 함 ');
      return response;
    } catch (e) {
      return false;
    }
  },
});
