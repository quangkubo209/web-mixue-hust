import React from "react";
import { useState } from "react";
import { Avatar } from "primereact/avatar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/baycho.jpg";
import route from "../constants/route";
import { userStateContext } from "../contexts/StateProvider";


const VerticalMenuBar = ({ isMenuClicked }) => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = userStateContext();

  const handleLogout = () => {
    setCurrentUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    navigate(route.HOME);
  }

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "pi pi-home",
      url: route.DASHBOARD,
    },
    { id: "orders", label: "Orders", icon: "pi pi-shopping-cart", url: null },
    {
      id: "manage",
      label: "Management",
      icon: "pi pi-database",
      url: route.PRODUCTMANAGEMENT,
    },
    {
      id: "alanalytics",
      label: "Analytics",
      icon: "pi pi-chart-bar",
      url: route.ANALYTICS,
    },
    { id: "setting", label: "Setting", icon: "pi pi-cog", url: null },
    { id: "help", label: "Help", icon: "pi pi-question", url: null },
  ];

  const handleMenuClick = (id) => {
    setSelectedMenu(id);
  };

  return (
    <div
      className={`flex text-white xl:w-1/6 w-60 fixed xl:top-32 top-24 xl:left-0 z-20
      ${!isMenuClicked ? "-left-full" : "left-0"}`}
      style={{
        transition: "all 0.25s ease-in-out",
        height: "100vh",
      }}
    >
      <div className=" bg-gradient-to-b from-red-400 via-red-400 to-red-300 w-full flex flex-col">
        <div className="p-4">
          <nav>
            {/* Menu */}
            <ul className="space-y-1 ">
              {menuItems.map((menuItem) => (
                <li
                  key={menuItem.id}
                  className={`p-2 cursor-pointer hover:bg-gray-300 hover:rounded-xl focus:outline-none ${
                    selectedMenu === menuItem.id ? "bg-gray-300 rounded-xl" : ""
                  }`}
                  onClick={() => handleMenuClick(menuItem.id)}
                >
                  <Link
                    className="flex items-center space-x-2"
                    to={menuItem.url}
                  >
                    <i className={menuItem.icon}></i>
                    <span className="text-xl font-bold">{menuItem.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <button className="mt-4 flex flex-row items-center py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700">
              <i className="pi pi-sign-out mr-2"></i>
              <span className="font-bold text-lg">Log Out</span>
            </button>
          </nav>
        </div>
        <div className="px-16 py-8 mb-4 border rounded-lg border-gray-400 mx-4 bg-gray-200">
  {/* Phần log out */}
  <button  
  className="flex flex-row items-center p-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700"
  onClick={handleLogout}
  >

    <i className='pi pi-sign-out mr-2'></i>
    <span className='font-bold text-lg'>Log Out</span>
  </button>
  </div>

        <div className="mt-10 py-4 border rounded-lg border-gray-400 bg-gray-200 w-3/4 flex flex-col items-center self-center">
          {/* Phần log out */}

          {/* Biểu tượng */}
          <div flex flex-col items-center>
            <div className="flex items-center justify-center mt-4">
              <a href="https://www.facebook.com">
                <i className="pi pi-facebook mx-2 text-blue-500 text-2xl hover:text-blue-700"></i>
              </a>
              <a href="https://www.instagram.com">
                <i className="pi pi-instagram mx-2 text-pink-500 text-2xl hover:text-pink-700"></i>
              </a>
              <a href="https://www.twitter.com">
                <i className="pi pi-twitter mx-2 text-black text-2xl hover:text-gray-500"></i>
              </a>
            </div>
            <span className="text-gray-500 text-sm">© 2023 MixueHust</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalMenuBar;
