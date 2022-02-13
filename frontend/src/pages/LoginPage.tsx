import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

type LoginType = {
  email: string;
  password: string;
};

const LoginPage = () => {
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
      <div style={{ outline: 'none' }} tabIndex={-1}>
        <div className="flex min-h-screen bg-white">
          <div className="login-wrap">
            <div className="w-full max-w-sm mx-auto lg:w-96">
              <div>
                <Link to="/">
                  <img className="w-auto h-13" src="/img/logo.png" alt="logo" />
                </Link>
                <h2 className="mt-6 text-3xl font-extrabold">Login</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Or
                  <Link to="/register">
                    <span className="pl-1 font-medium text-green-600 cursor-pointer hover:text-green-900">
                      Register
                    </span>
                  </Link>
                </p>
              </div>
              <div className="mt-8">
                <div className="mt-6">
                  <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                      <div className="flex justify-between">
                        <label htmlFor="email" className="login-label">
                          아이디
                        </label>
                      </div>
                      <div className="login-input-box">
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
                          className={
                            errors.email ? 'login-error' : 'login-input'
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <label htmlFor="password" className="login-label">
                          비밀번호
                        </label>
                      </div>
                      <div className="login-input-box">
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
                            errors.password ? 'login-error' : 'login-input'
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <button type="submit" className="login-btn">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex-1 hidden w-0 lg:block">
            <img
              width="100%"
              height="100%"
              className="absolute inset-0 object-cover w-full h-full"
              alt="Login Image"
              src="/img/login.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
