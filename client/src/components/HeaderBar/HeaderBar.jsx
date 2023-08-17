import React, { useEffect } from "react";
import logo from "../../assets/images/baycho.jpg";
import { Image } from "primereact/image";
import { Avatar } from "primereact/avatar";
import mixue from "../../assets/images/logo.png";
import { useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import useScroll from "../../hooks/useScroll";
import { Sidebar } from "primereact/sidebar";
import { TabView, TabPanel } from "primereact/tabview";
import { SelectButton } from "primereact/selectbutton";
import { ScrollTop } from "primereact/scrolltop";
import NotificationCard from "./NotificationCard";
import { InputText } from "primereact/inputtext";
import MessageCard from "./MessageCard";
import authApi from "../../api/authApi";
import { userStateContext } from "../../contexts/StateProvider";
// import { userStateContext } from "../contexts/StateProvider";

const SidebarSelections = ["Notification", "Message", "Profile"];

function HeaderBar({ onMenuClick, isMenuClicked }) {

  const { currentUser, setCurrentUser } = userStateContext();
  const options = ["All", "Unread"];
  const [value, setValue] = useState(options[0]);
  const [user, setUser] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const isBigScreen = useMediaQuery("(min-width: 1280px)");
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isScrolled = useScroll();
  const iconMenuClassName =
    "pi text-red-500 text-3xl font-bold xl:hidden cursor-pointer" +
    (isMenuClicked ? " pi-times" : " pi-align-justify");

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [sidebarSelection, setSidebarSelection] = useState(0);


  useEffect(() => {
    console.log(currentUser);
    const fetchProfile = async () => {
      try {
        const response = await authApi.getUserByToken();
        if (response.data.status === "success") {
          setUser(response.data.data);
        }
      } catch (err) {
        console.log(err.message);
        // console.log(err);
        setUser([]);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div
      className={`flex flex-row fixed top-0 left-0 z-10 bg-white w-full ${
        isScrolled ? "shadow-xl" : ""
      }`}
      style={{
        transition: "all 0.25s ease-in-out",
      }}
    >
      <div className="xl:w-1/6 bg-red-400 flex flex-row justify-center items-center">
        <img
          src={mixue}
          className="xl:h-32 xl:w-32 sm:h-24 sm:w-24 h-0 w-0"
          style={{
            transition: "all 0.25s ease-in-out",
          }}
        />
      </div>
      <div
        className={`xl:w-5/6 w-full flex md:justify-between justify-between p-4 items-center flex-nowrap xl:h-32 h-24
        
        `}
      >
        <div className="flex flex-row items-center p-4">
          <i
            className={iconMenuClassName}
            onClick={() => onMenuClick(!isMenuClicked)}
          ></i>

          <div className="xl:text-4xl text-3xl font-bold text-red-500 md:block hidden pl-4">
            MIXUEHUST
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
          {/* avatar , name  */}
          <div className="flex justify-between space-x-2 items-center">
            <div className="flex flex-col items-end">
              <div className="xl:text-base sm:text-xs font-light text-red-500 sm:block hidden">
                {user && user.username}
              </div>
              <div className="xl:text-2xl sm:text-xs sm:block hidden ">
                {user && user.name}
              </div>
            </div>
            <div
              className="bg-transparent xl:w-16 xl:h-16 w-12 h-12 bg-cover"
              onClick={() => {
                setIsSidebarVisible(true);
                setSidebarSelection(2);
              }}
            >
              <img
                // src={user && user.profileImage}
                // src = {user && `http://localhost:4001/uploads/${user.profileImage}`}
                src= {user && user.avatarPath}
                className="h-full w-full rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <Sidebar
        pt={{
          root: { className: "w-35rem" },
          header: { className: "bg-red-400" },
        }}
        visible={isSidebarVisible}
        position="right"
        onHide={() => setIsSidebarVisible(false)}
        style={{
          width: isBigScreen ? "30%" : isSmallScreen ? "100%" : "30rem",
          transition: "all 0.25s ease-in-out",
        }}
      >
        <TabView activeIndex={sidebarSelection}>
          <TabPanel
            header={SidebarSelections[0]}
            headerStyle={{ fontSize: "1.2rem" }}
          >
            <div className="flex flex-col overflow-y-scroll">
              <SelectButton
                value={value}
                onChange={(e) => setValue(e.value)}
                options={options}
                className="self-end"
              />
              {/* New */}
              <div className="mt-4 flex flex-col">
                <div
                  className="
                text-2xl font-semibold
                "
                >
                  New
                </div>

                {Array(4)
                  .fill(0)
                  .map((item, index) => (
                    <NotificationCard key={index} />
                  ))}
              </div>

              {/* Earlier */}
              <div className="mt-4 flex flex-col">
                <div
                  className="
                text-2xl font-semibold
                "
                >
                  Earlier
                </div>

                {Array(12)
                  .fill(0)
                  .map((item, index) => (
                    <NotificationCard key={index}/>
                  ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel
            header={SidebarSelections[1]}
            headerStyle={{ fontSize: "1.2rem" }}
          >
            <div className="flex flex-col overflow-y-scroll">
              <div className="w-full flex flex-row">
                {searchValue.length != 0 && (
                  <i className="pi pi-arrow-left mr-4 flex-shrink-0 self-center"></i>
                )}
                <span
                  className={`p-input-icon-${
                    searchValue.length != 0 ? "right" : "left"
                  } w-full`}
                >
                  {searchValue.length == 0 && <i className="pi pi-search" />}
                  <InputText
                    // value={searchValue}
                    placeholder="Search"
                    className="w-full"
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </span>
              </div>

              <div className="mt-4 flex flex-col">
                {Array(12)
                  .fill(0)
                  .map((item, index) => (
                    <MessageCard key={index}/>
                  ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel
            header={SidebarSelections[2]}
            headerStyle={{ fontSize: "1.2rem" }}
          >
            <div className="flex flex-col items-center">
              <Avatar
                // image={ user && `http://localhost:4001/uploads/${user.profileImage}`}
                image={ user && user.avatarPath}
                size="xlarge"
                shape="circle"
                className="bg-cover"
              />
              <div className="text-2xl font-semibold">{user.name}</div>
            </div>
          </TabPanel>
        </TabView>
        <ScrollTop
          target="parent"
          threshold={200}
          className="w-2rem h-2rem border-round bg-primary text-white"
          icon="pi pi-arrow-up text-base"
          style={{
            boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)",
            backgroundColor: "rgb(248 113 113)",
          }}
        />
      </Sidebar>
    </div>
  );
}

export default HeaderBar;
