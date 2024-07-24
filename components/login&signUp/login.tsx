"use client"
import React, { useState } from "react";
import { LoginForm } from "../ui/formComponents/loginForm";
import { CreateUserForm } from "../ui/formComponents/createUserForm";
import Image from "next/image";

const UserLoginSignIn = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-[#FAFAFA]">
   
      <div className="w-[476px] h-[567px] space-y-[56px]">
        <div className="image text-center flex justify-center">
          <Image
            src={"/images/logo.svg"}
            alt="Logo"
            width={100}
            height={200}
            style={{ width: "182px", height: "40px" }}
            className=""
          />
        </div>

        {isLogin ? (
          <LoginForm onSwitch={() => setIsLogin(false)} />
        ) : (
          <CreateUserForm onSwitch={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default UserLoginSignIn;
