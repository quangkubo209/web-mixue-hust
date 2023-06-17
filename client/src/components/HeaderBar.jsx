import React from "react";
import logo from "../assets/images/baycho.jpg";
import { Image } from "primereact/image";
import { Avatar } from "primereact/avatar";
import mixue from "../assets/images/logo.png";
import { useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import useScroll from "../hooks/useScroll";
import { Sidebar } from "primereact/sidebar";
import { TabView, TabPanel } from "primereact/tabview";

const SidebarSelections = ["Notification", "Message", "Profile"];

function HeaderBar({ onMenuClick, isMenuClicked }) {
  const isBigScreen = useMediaQuery("(min-width: 1280px)");
  const isScrolled = useScroll();
  const iconMenuClassName =
    "pi text-red-500 text-3xl font-bold xl:hidden cursor-pointer" +
    (isMenuClicked ? " pi-times" : " pi-align-justify");

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [sidebarSelection, setSidebarSelection] = useState(0);

  return (
    <div className="flex flex-row fixed top-0 left-0 z-10 bg-white w-full">
      <div className="xl:w-1/6 bg-red-400 flex flex-row justify-center items-center">
        <img
          src={mixue}
          className="xl:h-32 xl:w-32 h-24 w-24"
          style={{
            transition: "all 0.25s ease-in-out",
          }}
        />
      </div>
      <div
        className={`xl:w-5/6 w-full flex md:justify-between justify-between p-4 items-center flex-nowrap h-30
         ${isScrolled ? "shadow-xl" : ""}
        `}
        style={{
          transition: "all 0.25s ease-in-out",
        }}
      >
        <div className="flex flex-row items-center p-4">
          <i
            className={iconMenuClassName}
            onClick={() => onMenuClick(!isMenuClicked)}
          ></i>

          <div className="xl:text-4xl text-3xl font-semibold text-red-500 md:block hidden pl-4">
            Dashboard
          </div>
        </div>

        <div className="flex h-full justify-between space-x-8 items-center xl:mr-2">
          <div className="flex justify-between space-x-10 xl:text-2xl items-center">
            <div
              className=" relative text-inherit xl:p-4 p-3 rounded-full flex justify-center items-center cursor-pointer"
              style={{
                backgroundColor: "#f7f6f6",
              }}
              onClick={() => {
                setIsSidebarVisible(true);
                setSidebarSelection(0);
              }}
            >
              <div className="absolute bottom-0 -right-2 xl:h-8 xl:w-8 h-6 w-6 xl:text-sm text-xs rounded-full bg-red-400 flex justify-center items-center text-white">
                {12 > 100 ? "99+" : "12"}
              </div>
              <i
                className="pi pi-bell"
                style={
                  isBigScreen
                    ? { fontSize: "1.875rem" }
                    : { fontSize: "1.5rem" }
                }
              ></i>
            </div>
            <div
              className=" relative text-inherit xl:p-4 p-3 rounded-full flex justify-center items-center cursor-pointer"
              style={{
                backgroundColor: "#f7f6f6",
              }}
              onClick={() => {
                setIsSidebarVisible(true);
                setSidebarSelection(1);
              }}
            >
              <div className="absolute bottom-0 -right-2 xl:h-8 xl:w-8 h-6 w-6  xl:text-sm text-xs rounded-full bg-red-400 flex justify-center items-center text-white">
                {101 > 100 ? "99+" : "101"}
              </div>
              <i
                className="pi pi-send"
                style={
                  isBigScreen
                    ? { fontSize: "1.875rem" }
                    : { fontSize: "1.5rem" }
                }
              ></i>
            </div>
          </div>
          <div className="w-px h-full bg-black opacity-10"></div>
          <div className="flex justify-between space-x-2 items-center">
            <div className="flex flex-col items-end">
              <div className="xl:text-base text-xs font-light text-red-500">
                Good morning
              </div>
              <div className="xl:text-2xl">Kim nal do</div>
            </div>
            <div
              className="bg-transparent xl:w-16 xl:h-16 w-12 h-12 bg-cover"
              onClick={() => {
                setIsSidebarVisible(true);
                setSidebarSelection(2);
              }}
            >
              <img
                src={logo}
                className="h-full w-full rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <Sidebar
        visible={isSidebarVisible}
        position="right"
        onHide={() => setIsSidebarVisible(false)}
        style={{
          width: "30%",
        }}
      >
        <TabView activeIndex={sidebarSelection}>
          <TabPanel header={SidebarSelections[0]}>
            <div className="flex flex-col items-center">
              <Avatar
                image={logo}
                size="xlarge"
                shape="circle"
                className="bg-cover"
              />
              <div className="text-2xl font-semibold">
                {SidebarSelections[0]}
              </div>
            </div>
          </TabPanel>
          <TabPanel header={SidebarSelections[1]}>
            <div className="flex flex-col items-center">
              <Avatar
                image={logo}
                size="xlarge"
                shape="circle"
                className="bg-cover"
              />
              <div className="text-2xl font-semibold">
                {SidebarSelections[1]}
              </div>
            </div>
          </TabPanel>
          <TabPanel header={SidebarSelections[2]}>
            <div className="flex flex-col items-center">
              <Avatar
                image={logo}
                size="xlarge"
                shape="circle"
                className="bg-cover"
              />
              <div className="text-2xl font-semibold">Kim nal do</div>
            </div>
          </TabPanel>
        </TabView>
      </Sidebar>
    </div>
  );
}

export default HeaderBar;
