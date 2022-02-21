import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationForm } from '../../store/validationForm';
import InputField from './InputField';
import { LoginType } from '../../store/type';
import { login } from '../../api';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    mode: 'onChange',
    resolver: yupResolver(loginValidationForm),
  });

  const signIn = handleSubmit(async ({ email, password }) => {
    const data = {
      email,
      password,
    };

    await login(data);
  });

  return (
    <div>
      <div>
        <Link to="/">
          <img className="w-auto h-13" src="/img/logo.png" alt="logo" />
        </Link>
        <h2>로그인</h2>
        <p className="mt-2 text-gray-600">
          Or
          <Link to="register">
            <span className="account-link">회원가입</span>
          </Link>
        </p>
      </div>
      <div className="mt-8">
        <div className="mt-6">
          <form className="space-y-6" onSubmit={signIn}>
            <InputField
              name="email"
              type="email"
              label="이메일"
              placeholder="purdangdang@dang.com"
              register={register}
              error={errors.email?.message}
            />

            <InputField
              name="password"
              type="password"
              label="비밀번호"
              placeholder="********"
              register={register}
              error={errors.password?.message}
            />

            <div>
              <button type="submit" className="account-btn">
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
