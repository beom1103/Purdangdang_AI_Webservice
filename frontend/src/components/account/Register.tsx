import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateForm } from '../../store/validateForm';
import InputField from './InputField';

type RegisterType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    mode: 'onChange',
    resolver: yupResolver(validateForm),
  });

  const onSubmit = handleSubmit(({ username, email, password }) => {
    console.log(username, email, password);
  });

  return (
    <div>
      <div>
        <Link to="/">
          <img className="w-auto h-13" src="/img/logo.png" alt="logo" />
        </Link>
        <h2 className="mt-6 text-3xl font-extrabold">회원가입</h2>
        <p className="mt-2 text-sm text-gray-600">
          Or
          <Link to="../">
            <span className="account-link">로그인</span>
          </Link>
        </p>
      </div>
      <div className="mt-8">
        <div className="mt-6">
          <form className="space-y-6" onSubmit={onSubmit}>
            <InputField
              name="username"
              type="text"
              label="이름"
              placeholder="푸르댕"
              register={register}
              error={errors.username?.message}
            />
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
            <InputField
              name="confirmPassword"
              type="password"
              label="비밀번호 확인"
              placeholder="********"
              register={register}
              error={errors.confirmPassword?.message}
            />

            <div>
              <button type="submit" className="account-btn">
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
