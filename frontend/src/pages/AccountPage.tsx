import React from "react";
import { Link, Outlet } from "react-router-dom";

const AccountPage = () => {
  return (
    <div style={{ outline: "none" }} tabIndex={-1}>
      <div className="flex min-h-screen bg-white">
        <div className="account-wrap">
          <div className="w-full max-w-sm mx-auto lg:w-96">
            <Link to="" aria-current="page" />
            <Link to="register" />
            <Outlet />
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
  );
};

export default AccountPage;
