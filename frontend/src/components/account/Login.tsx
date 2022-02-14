import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateForm } from '../../store/validateForm';
import InputField from './InputField';

type LoginType = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    mode: 'onChange',
    resolver: yupResolver(validateForm),
  });

  const onSubmit = handleSubmit(({ email, password }) => {
    console.log(email, password);
  });

  return (
    <div>
      <div>
        <Link to="/">
          <img className="w-auto h-13" src="/img/logo.png" alt="logo" />
        </Link>
        <h2 className="mt-6 text-3xl font-extrabold">로그인</h2>
        <p className="mt-2 text-sm text-gray-600">
          Or
          <Link to="register">
            <span className="account-link">회원가입</span>
          </Link>
        </p>
      </div>
      <div className="mt-8">
        <div className="mt-6">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="space-y-1">
              <InputField
                name="email"
                type="email"
                label="이메일"
                placeholder="purdangdang@dang.com"
                register={register}
                error={errors.email?.message}
              />
            </div>

            <div className="space-y-1">
              <InputField
                name="password"
                type="password"
                label="비밀번호"
                placeholder="********"
                register={register}
                error={errors.password?.message}
              />
            </div>

            <div>
              <button type="submit" className="account-btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
