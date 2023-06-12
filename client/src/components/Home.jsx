import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import route from "../constants/route";
import SigninDialog from "../components/SigninDialog";

export default function Home() {
  const navigate = useNavigate();
  const [visibleSignin, setVisibleSignin] = useState(false);

  const handleLogin = () => {
    setVisibleSignin(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-700 via-red-400 to-red-300">
      <div className="text-center">
        <img
          className="w-96 mx-auto mb-8"
          src={logo}
          alt="logo"
        />
        <h1 className="text-4xl font-semibold text-white">
          WELCOME TO THE MANAGEMENT PAGE OF MIXUE HUST
        </h1>
        <p className="mt-4 text-sm text-white underline">
          POWERED BY GROUP 19
        </p>
        <div className="mt-8">
          <button
            className="px-8 py-4 text-lg font-semibold text-red-500 bg-white rounded-full hover:bg-red-100"
            onClick={handleLogin}
          >
            Sign in
          </button>
        </div>
      </div>
      {visibleSignin && (
        <SigninDialog 
        visible={visibleSignin}
        setVisible ={setVisibleSignin} />
      )}

    </div>
  );
}
