import React, { useEffect, useState } from "react";
import MenuBar from "./MenuBar";
import { Navigate, Outlet } from "react-router-dom";
import HeaderBar from "./HeaderBar/HeaderBar";
import { useNavigate } from "react-router-dom";

export default function DefaultLayout() {
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const handleMenuClick = (value) => {
    setIsMenuClicked(value);
  };

  const navigate = useNavigate();
  useEffect(() => {
    navigate("/admin/dashboard");
  }, []);
  return (
    <div className="card relative bg-white">
      <HeaderBar onMenuClick={handleMenuClick} isMenuClicked={isMenuClicked} />
      <MenuBar isMenuClicked={isMenuClicked} />
      <div className="flex flex-row xl:mt-32 mt-24 justify-end h-full">
        <div className=" xl:w-10/12 w-full shadow-xl bg-white rounded-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
