import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

type LoginType = {
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ mode: 'onChange' });

  const onSubmit = handleSubmit(({ email, password }) => {
    console.log(email, password);
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
            <div>
              <div className="flex justify-between">
                <label htmlFor="email" className="account-label">
                  아이디
                </label>
                <span className="text-red-600">
                  {errors.email ? '비밀번호를 확인해주세요.' : ''}
                </span>
              </div>
              <div className="account-input-box">
                <input
                  {...register('email', {
                    required: true,
                    minLength: 6,
                    maxLength: 30,
                  })}
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="off"
                  placeholder="purdangdang@dang.com"
                  className={errors.email ? 'account-error' : 'account-input'}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <label htmlFor="password" className="account-label">
                  비밀번호
                </label>
                <span className="text-red-600">
                  {errors.email ? '비밀번호를 확인해주세요.' : ''}
                </span>
              </div>
              <div className="account-input-box">
                <input
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    maxLength: 13,
                  })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  placeholder="********"
                  className={
                    errors.password ? 'account-error' : 'account-input'
                  }
                />
              </div>
            </div>

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
