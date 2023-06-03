import React from "react";
import { userStateContext } from "../contexts/StateProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import logo from "../assets/images/logo.png";
import vietnam from "../assets/images/vietnam.png";
import uk from "../assets/images/uk.png";

export default function MenuBar() {
  const navigate = useNavigate();

  return (
    // <div className="bg-red-500 w-full fixed top-0 h-36   border-t-4 border-solid border-gray-700 box-border ">
      <div className="bg-red-500 w-full fixed top-0  h-36 flex  flex-row justify-between px-16 p-0  shadow-sm">
        <img
          alt="logo"
          src={logo}
          className="max-w-full h-full p-2 mr-2 hover:cursor-pointer  rounded-full overflow-hidden "
        ></img>
        <div className="w-[calc(100%-200px)] h-full p-2 flex flex-col m-0 ">
          <div className="flex flex-row justify-end items-center">
            <span className="p-input-icon-left p-input-icon-right w-1/4">
              <i className="pi pi-search" />
              <InputText
                placeholder="Từ khóa"
                type="text"
                className="my-2 w-full rounded-lg"
              />
              <i className="pi pi-spin pi-spinner" />
            </span>
            <div className="ml-8">
              <ul className="flex items-center">
                <li>
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

          {/* <div> */}
          {/* items-center justify-center */}
          {/* <div className="flex items-center justify-center h-full"> */}
          <ul className="flex  justify-center h-full mb-2">
            <li className="text-white font-bold px-6 py-4  rounded hover:bg-gray-400 font-medium">
              <Link to="/">QUÁN TRÀ SỮA</Link>
            </li>
            <li className="text-white font-bold px-6 py-4 rounded hover:bg-gray-400  font-medium">
              <Link to="/menu">THỰC ĐƠN</Link>
            </li>
            <li className="text-white font-bold px-6 py-4  rounded hover:bg-gray-400  font-medium">
              <Link to="/about">CỘNG ĐỒNG</Link>
            </li>
            <li className="text-white font-bold px-6 py-4 rounded hover:bg-gray-400  font-medium">
              <Link>VỀ CHÚNG TÔI</Link>
            </li>
            <li className="text-white font-bold px-6 py-4 rounded hover:bg-gray-400  font-medium">
              <Link>NGHỀ NGHIỆP</Link>
            </li>
            <li className="text-white font-bold px-6 py-4 rounded hover:bg-gray-400  font-medium">
              <Link>TIN TỨC</Link>
            </li>
            <button class="ml-16 my-2 bg-gray-700 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 focus:outline-none hover:text-gray-700">
              Order now
            </button>
          </ul>
        </div>
        {/* </div> */}
      </div>
    // {/* </div> */}
    // </div>
  );
}
