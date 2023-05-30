import React from "react";
import { userStateContext } from "../contexts/StateProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import route from "../constants/route";
import { InputText } from "primereact/inputtext";
import logo from "../assets/images/logo.png";
import vietnam from "../assets/images/vietnam.png";
import uk from "../assets/images/uk.png";


export default function MenuBar() {
  const navigate = useNavigate();

  // if (!localStorage.getItem("TOKEN")) return <Navigate to={route.HOME} />;

  const start = (
    <Link className="mr-2 h-16" to={route.HOME}>
      <img
        alt="logo"
        src={logo}
        className="mr-2 h-16 hover:cursor-pointer p-2"
      ></img>
    </Link>
  );
  const search = (
    <span className="p-input-icon-left p-input-icon-right w-1/3">
      <i className="pi pi-search" />
      <InputText
        placeholder="Search"
        type="text"
        className="my-2 w-full rounded-full"
      />
      <i className="pi pi-spin pi-spinner" />
    </span>
  );

  return (
    <div className="bg-red-500 h-32   border-t-4 border-solid border-gray-700">
      <div className="flex h-full flex-row justify-between mx-16 p-0 items-center">
        <img
          alt="logo"
          src={logo}
          className="h-full p-2 mr-2 hover:cursor-pointer  rounded-full overflow-hidden "
        ></img>
        <div className="w-[calc(100%-200px)] flex flex-col m-0 ">
          <div className="flex flex-row justify-end items-center">
            <span className="p-input-icon-left p-input-icon-right w-1/3">
              <i className="pi pi-search" />
              <InputText
                placeholder="Search"
                type="text"
                className="my-2 w-full rounded-full"
              />
              <i className="pi pi-spin pi-spinner" />
            </span>
            <div className="ml-8">
              <ul className="flex items-center">
                <li >
                  <img
                    alt="logo"
                    src={vietnam}
                    className="h-16 w-20 hover:cursor-pointer p-2"
                  ></img>
                </li>
                <li>
                  <img
                    alt="logo"
                    src={uk}
                    className="mr-8 h-16 w-20 hover:cursor-pointer p-2"
                  ></img>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center">
              <ul className="flex space-x-4">
                <li>
                  <Link
                    to="/"
                    className="text-white hover:bg-gray-600 font-medium"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/menu"
                    className="text-white hover:bg-gray-600 font-medium"
                  >
                    Menu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-white hover:bg-gray-600 font-medium"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-white hover:bg-gray-600 font-medium"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
              <button className="ml-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
